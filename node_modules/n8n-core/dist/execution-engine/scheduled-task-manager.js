"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledTaskManager = void 0;
const backend_common_1 = require("@n8n/backend-common");
const config_1 = require("@n8n/config");
const constants_1 = require("@n8n/constants");
const di_1 = require("@n8n/di");
const cron_1 = require("cron");
const errors_1 = require("../errors");
const instance_settings_1 = require("../instance-settings");
let ScheduledTaskManager = class ScheduledTaskManager {
    get loggableCrons() {
        const loggableCrons = {};
        for (const [workflowId, crons] of this.cronsByWorkflow) {
            loggableCrons[`workflowId-${workflowId}`] = Array.from(crons.values()).map(({ summary }) => summary);
        }
        return loggableCrons;
    }
    constructor(instanceSettings, logger, { activeInterval }, errorReporter) {
        this.instanceSettings = instanceSettings;
        this.logger = logger;
        this.errorReporter = errorReporter;
        this.cronsByWorkflow = new Map();
        this.logger = this.logger.scoped('cron');
        if (activeInterval === 0)
            return;
        this.logInterval = setInterval(() => {
            if (Object.keys(this.loggableCrons).length === 0)
                return;
            this.logger.debug('Currently active crons', { active: this.loggableCrons });
        }, activeInterval * constants_1.Time.minutes.toMilliseconds);
    }
    registerCron(ctx, onTick) {
        const { workflowId, timezone, nodeId, expression, recurrence } = ctx;
        const summary = recurrence?.activated
            ? `${expression} (every ${recurrence.intervalSize} ${recurrence.typeInterval})`
            : expression;
        const workflowCrons = this.cronsByWorkflow.get(workflowId);
        const key = this.toCronKey({ workflowId, nodeId, expression, timezone, recurrence });
        if (workflowCrons?.has(key)) {
            this.errorReporter.error('Skipped registration for already registered cron', {
                tags: { cron: 'duplicate' },
                extra: {
                    workflowId,
                    timezone,
                    nodeId,
                    expression,
                    recurrence,
                    instanceRole: this.instanceSettings.instanceRole,
                },
            });
            return;
        }
        const job = new cron_1.CronJob(expression, () => {
            if (!this.instanceSettings.isLeader)
                return;
            this.logger.debug('Executing cron for workflow', {
                workflowId,
                nodeId,
                cron: summary,
                instanceRole: this.instanceSettings.instanceRole,
            });
            onTick();
        }, undefined, true, timezone);
        const cron = { job, summary, ctx };
        if (!workflowCrons) {
            this.cronsByWorkflow.set(workflowId, new Map([[key, cron]]));
        }
        else {
            workflowCrons.set(key, cron);
        }
        this.logger.debug('Registered cron for workflow', {
            workflowId,
            cron: summary,
            instanceRole: this.instanceSettings.instanceRole,
        });
    }
    deregisterCrons(workflowId) {
        const workflowCrons = this.cronsByWorkflow.get(workflowId);
        if (!workflowCrons || workflowCrons.size === 0)
            return;
        const summaries = [];
        for (const cron of workflowCrons.values()) {
            summaries.push(cron.summary);
            cron.job.stop();
        }
        this.cronsByWorkflow.delete(workflowId);
        this.logger.info('Deregistered all crons for workflow', {
            workflowId,
            crons: summaries,
            instanceRole: this.instanceSettings.instanceRole,
        });
    }
    deregisterAllCrons() {
        for (const workflowId of this.cronsByWorkflow.keys()) {
            this.deregisterCrons(workflowId);
        }
        clearInterval(this.logInterval);
        this.logInterval = undefined;
    }
    toCronKey(ctx) {
        const { recurrence, ...rest } = ctx;
        const flattened = !recurrence
            ? rest
            : {
                ...rest,
                recurrenceActivated: recurrence.activated,
                ...(recurrence.activated && {
                    recurrenceIndex: recurrence.index,
                    recurrenceIntervalSize: recurrence.intervalSize,
                    recurrenceTypeInterval: recurrence.typeInterval,
                }),
            };
        const sorted = Object.keys(flattened)
            .sort()
            .reduce((result, key) => {
            result[key] = flattened[key];
            return result;
        }, {});
        return JSON.stringify(sorted);
    }
};
exports.ScheduledTaskManager = ScheduledTaskManager;
exports.ScheduledTaskManager = ScheduledTaskManager = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [instance_settings_1.InstanceSettings,
        backend_common_1.Logger,
        config_1.CronLoggingConfig,
        errors_1.ErrorReporter])
], ScheduledTaskManager);
//# sourceMappingURL=scheduled-task-manager.js.map