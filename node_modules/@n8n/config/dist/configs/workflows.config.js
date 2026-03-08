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
exports.WorkflowsConfig = void 0;
const zod_1 = require("zod");
const decorators_1 = require("../decorators");
const callerPolicySchema = zod_1.z.enum(['any', 'none', 'workflowsFromAList', 'workflowsFromSameOwner']);
let WorkflowsConfig = class WorkflowsConfig {
    constructor() {
        this.defaultName = 'My workflow';
        this.callerPolicyDefaultOption = 'workflowsFromSameOwner';
        this.activationBatchSize = 1;
        this.indexingEnabled = false;
        this.draftPublishEnabled = false;
    }
};
exports.WorkflowsConfig = WorkflowsConfig;
__decorate([
    (0, decorators_1.Env)('WORKFLOWS_DEFAULT_NAME'),
    __metadata("design:type", String)
], WorkflowsConfig.prototype, "defaultName", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_WORKFLOW_CALLER_POLICY_DEFAULT_OPTION', callerPolicySchema),
    __metadata("design:type", String)
], WorkflowsConfig.prototype, "callerPolicyDefaultOption", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_WORKFLOW_ACTIVATION_BATCH_SIZE'),
    __metadata("design:type", Number)
], WorkflowsConfig.prototype, "activationBatchSize", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_WORKFLOWS_INDEXING_ENABLED'),
    __metadata("design:type", Boolean)
], WorkflowsConfig.prototype, "indexingEnabled", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_ENV_FEAT_WORKFLOWS_DRAFT_PUBLISH_ENABLED'),
    __metadata("design:type", Boolean)
], WorkflowsConfig.prototype, "draftPublishEnabled", void 0);
exports.WorkflowsConfig = WorkflowsConfig = __decorate([
    decorators_1.Config
], WorkflowsConfig);
//# sourceMappingURL=workflows.config.js.map