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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionsConfig = void 0;
const zod_1 = __importDefault(require("zod"));
const decorators_1 = require("../decorators");
let PruningIntervalsConfig = class PruningIntervalsConfig {
    constructor() {
        this.hardDelete = 15;
        this.softDelete = 60;
    }
};
__decorate([
    (0, decorators_1.Env)('EXECUTIONS_DATA_PRUNE_HARD_DELETE_INTERVAL'),
    __metadata("design:type", Number)
], PruningIntervalsConfig.prototype, "hardDelete", void 0);
__decorate([
    (0, decorators_1.Env)('EXECUTIONS_DATA_PRUNE_SOFT_DELETE_INTERVAL'),
    __metadata("design:type", Number)
], PruningIntervalsConfig.prototype, "softDelete", void 0);
PruningIntervalsConfig = __decorate([
    decorators_1.Config
], PruningIntervalsConfig);
let ConcurrencyConfig = class ConcurrencyConfig {
    constructor() {
        this.productionLimit = -1;
        this.evaluationLimit = -1;
    }
};
__decorate([
    (0, decorators_1.Env)('N8N_CONCURRENCY_PRODUCTION_LIMIT'),
    __metadata("design:type", Number)
], ConcurrencyConfig.prototype, "productionLimit", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_CONCURRENCY_EVALUATION_LIMIT'),
    __metadata("design:type", Number)
], ConcurrencyConfig.prototype, "evaluationLimit", void 0);
ConcurrencyConfig = __decorate([
    decorators_1.Config
], ConcurrencyConfig);
let QueueRecoveryConfig = class QueueRecoveryConfig {
    constructor() {
        this.interval = 180;
        this.batchSize = 100;
    }
};
__decorate([
    (0, decorators_1.Env)('N8N_EXECUTIONS_QUEUE_RECOVERY_INTERVAL'),
    __metadata("design:type", Number)
], QueueRecoveryConfig.prototype, "interval", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_EXECUTIONS_QUEUE_RECOVERY_BATCH'),
    __metadata("design:type", Number)
], QueueRecoveryConfig.prototype, "batchSize", void 0);
QueueRecoveryConfig = __decorate([
    decorators_1.Config
], QueueRecoveryConfig);
let RecoveryConfig = class RecoveryConfig {
    constructor() {
        this.maxLastExecutions = 3;
        this.workflowDeactivationEnabled = false;
    }
};
__decorate([
    (0, decorators_1.Env)('N8N_WORKFLOW_AUTODEACTIVATION_MAX_LAST_EXECUTIONS'),
    __metadata("design:type", Number)
], RecoveryConfig.prototype, "maxLastExecutions", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_WORKFLOW_AUTODEACTIVATION_ENABLED'),
    __metadata("design:type", Boolean)
], RecoveryConfig.prototype, "workflowDeactivationEnabled", void 0);
RecoveryConfig = __decorate([
    decorators_1.Config
], RecoveryConfig);
const executionModeSchema = zod_1.default.enum(['regular', 'queue']);
let ExecutionsConfig = class ExecutionsConfig {
    constructor() {
        this.mode = 'regular';
        this.timeout = -1;
        this.maxTimeout = 3600;
        this.pruneData = true;
        this.pruneDataMaxAge = 336;
        this.pruneDataMaxCount = 10_000;
        this.pruneDataHardDeleteBuffer = 1;
        this.saveDataOnError = 'all';
        this.saveDataOnSuccess = 'all';
        this.saveExecutionProgress = false;
        this.saveDataManualExecutions = true;
    }
};
exports.ExecutionsConfig = ExecutionsConfig;
__decorate([
    (0, decorators_1.Env)('EXECUTIONS_MODE', executionModeSchema),
    __metadata("design:type", String)
], ExecutionsConfig.prototype, "mode", void 0);
__decorate([
    (0, decorators_1.Env)('EXECUTIONS_TIMEOUT'),
    __metadata("design:type", Number)
], ExecutionsConfig.prototype, "timeout", void 0);
__decorate([
    (0, decorators_1.Env)('EXECUTIONS_TIMEOUT_MAX'),
    __metadata("design:type", Number)
], ExecutionsConfig.prototype, "maxTimeout", void 0);
__decorate([
    (0, decorators_1.Env)('EXECUTIONS_DATA_PRUNE'),
    __metadata("design:type", Boolean)
], ExecutionsConfig.prototype, "pruneData", void 0);
__decorate([
    (0, decorators_1.Env)('EXECUTIONS_DATA_MAX_AGE'),
    __metadata("design:type", Number)
], ExecutionsConfig.prototype, "pruneDataMaxAge", void 0);
__decorate([
    (0, decorators_1.Env)('EXECUTIONS_DATA_PRUNE_MAX_COUNT'),
    __metadata("design:type", Number)
], ExecutionsConfig.prototype, "pruneDataMaxCount", void 0);
__decorate([
    (0, decorators_1.Env)('EXECUTIONS_DATA_HARD_DELETE_BUFFER'),
    __metadata("design:type", Number)
], ExecutionsConfig.prototype, "pruneDataHardDeleteBuffer", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", PruningIntervalsConfig)
], ExecutionsConfig.prototype, "pruneDataIntervals", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", ConcurrencyConfig)
], ExecutionsConfig.prototype, "concurrency", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", QueueRecoveryConfig)
], ExecutionsConfig.prototype, "queueRecovery", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", RecoveryConfig)
], ExecutionsConfig.prototype, "recovery", void 0);
__decorate([
    (0, decorators_1.Env)('EXECUTIONS_DATA_SAVE_ON_ERROR'),
    __metadata("design:type", String)
], ExecutionsConfig.prototype, "saveDataOnError", void 0);
__decorate([
    (0, decorators_1.Env)('EXECUTIONS_DATA_SAVE_ON_SUCCESS'),
    __metadata("design:type", String)
], ExecutionsConfig.prototype, "saveDataOnSuccess", void 0);
__decorate([
    (0, decorators_1.Env)('EXECUTIONS_DATA_SAVE_ON_PROGRESS'),
    __metadata("design:type", Boolean)
], ExecutionsConfig.prototype, "saveExecutionProgress", void 0);
__decorate([
    (0, decorators_1.Env)('EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS'),
    __metadata("design:type", Boolean)
], ExecutionsConfig.prototype, "saveDataManualExecutions", void 0);
exports.ExecutionsConfig = ExecutionsConfig = __decorate([
    decorators_1.Config
], ExecutionsConfig);
//# sourceMappingURL=executions.config.js.map