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
exports.ActiveWorkflows = void 0;
const backend_common_1 = require("@n8n/backend-common");
const di_1 = require("@n8n/di");
const n8n_workflow_1 = require("n8n-workflow");
const error_reporter_1 = require("../errors/error-reporter");
const scheduled_task_manager_1 = require("./scheduled-task-manager");
const triggers_and_pollers_1 = require("./triggers-and-pollers");
let ActiveWorkflows = class ActiveWorkflows {
    constructor(logger, scheduledTaskManager, triggersAndPollers, errorReporter) {
        this.logger = logger;
        this.scheduledTaskManager = scheduledTaskManager;
        this.triggersAndPollers = triggersAndPollers;
        this.errorReporter = errorReporter;
        this.activeWorkflows = {};
    }
    isActive(workflowId) {
        return this.activeWorkflows.hasOwnProperty(workflowId);
    }
    allActiveWorkflows() {
        return Object.keys(this.activeWorkflows);
    }
    get(workflowId) {
        return this.activeWorkflows[workflowId];
    }
    async add(workflowId, workflow, additionalData, mode, activation, getTriggerFunctions, getPollFunctions) {
        const triggerNodes = workflow.getTriggerNodes();
        const triggerResponses = [];
        for (const triggerNode of triggerNodes) {
            try {
                const triggerResponse = await this.triggersAndPollers.runTrigger(workflow, triggerNode, getTriggerFunctions, additionalData, mode, activation);
                if (triggerResponse !== undefined) {
                    triggerResponses.push(triggerResponse);
                }
            }
            catch (e) {
                const error = e instanceof Error ? e : new Error(`${e}`);
                throw new n8n_workflow_1.WorkflowActivationError(`There was a problem activating the workflow: "${error.message}"`, { cause: error, node: triggerNode });
            }
        }
        this.activeWorkflows[workflowId] = { triggerResponses };
        const pollingNodes = workflow.getPollNodes();
        if (pollingNodes.length === 0)
            return;
        for (const pollNode of pollingNodes) {
            try {
                await this.activatePolling(pollNode, workflow, additionalData, getPollFunctions, mode, activation);
            }
            catch (e) {
                if (triggerResponses.length === 0) {
                    delete this.activeWorkflows[workflowId];
                }
                const error = e instanceof Error ? e : new Error(`${e}`);
                throw new n8n_workflow_1.WorkflowActivationError(`There was a problem activating the workflow: "${error.message}"`, { cause: error, node: pollNode });
            }
        }
    }
    async activatePolling(node, workflow, additionalData, getPollFunctions, mode, activation) {
        const pollFunctions = getPollFunctions(workflow, node, additionalData, mode, activation);
        const pollTimes = pollFunctions.getNodeParameter('pollTimes');
        const cronExpressions = (pollTimes.item || []).map(n8n_workflow_1.toCronExpression);
        const executeTrigger = async (testingTrigger = false) => {
            this.logger.debug(`Polling trigger initiated for workflow "${workflow.name}"`, {
                workflowName: workflow.name,
                workflowId: workflow.id,
            });
            try {
                const pollResponse = await this.triggersAndPollers.runPoll(workflow, node, pollFunctions);
                if (pollResponse !== null) {
                    pollFunctions.__emit(pollResponse);
                }
            }
            catch (error) {
                if (testingTrigger) {
                    throw error;
                }
                pollFunctions.__emitError(error);
            }
        };
        await executeTrigger(true);
        for (const expression of cronExpressions) {
            if (expression.split(' ').at(0)?.includes('*')) {
                throw new n8n_workflow_1.UserError('The polling interval is too short. It has to be at least a minute.');
            }
            const ctx = {
                workflowId: workflow.id,
                timezone: workflow.timezone,
                nodeId: node.id,
                expression,
            };
            this.scheduledTaskManager.registerCron(ctx, executeTrigger);
        }
    }
    async remove(workflowId) {
        if (!this.isActive(workflowId)) {
            this.logger.warn(`Cannot deactivate already inactive workflow ID "${workflowId}"`);
            return false;
        }
        this.scheduledTaskManager.deregisterCrons(workflowId);
        const w = this.activeWorkflows[workflowId];
        for (const r of w.triggerResponses ?? []) {
            await this.closeTrigger(r, workflowId);
        }
        delete this.activeWorkflows[workflowId];
        return true;
    }
    async removeAllTriggerAndPollerBasedWorkflows() {
        const activeWorkflowIds = Object.keys(this.activeWorkflows);
        if (activeWorkflowIds.length === 0)
            return;
        for (const workflowId of activeWorkflowIds) {
            await this.remove(workflowId);
        }
        this.logger.debug('Deactivated all trigger- and poller-based workflows', {
            workflowIds: activeWorkflowIds,
        });
    }
    async closeTrigger(response, workflowId) {
        if (!response.closeFunction)
            return;
        try {
            await response.closeFunction();
        }
        catch (e) {
            if (e instanceof n8n_workflow_1.TriggerCloseError) {
                this.logger.error(`There was a problem calling "closeFunction" on "${e.node.name}" in workflow "${workflowId}"`);
                this.errorReporter.error(e, { extra: { workflowId } });
                return;
            }
            const error = e instanceof Error ? e : new Error(`${e}`);
            throw new n8n_workflow_1.WorkflowDeactivationError(`Failed to deactivate trigger of workflow ID "${workflowId}": "${error.message}"`, { cause: error, workflowId });
        }
    }
};
exports.ActiveWorkflows = ActiveWorkflows;
exports.ActiveWorkflows = ActiveWorkflows = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [backend_common_1.Logger,
        scheduled_task_manager_1.ScheduledTaskManager,
        triggers_and_pollers_1.TriggersAndPollers,
        error_reporter_1.ErrorReporter])
], ActiveWorkflows);
//# sourceMappingURL=active-workflows.js.map