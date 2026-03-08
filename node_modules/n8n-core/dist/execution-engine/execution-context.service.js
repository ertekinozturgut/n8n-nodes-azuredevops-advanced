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
exports.ExecutionContextService = void 0;
const backend_common_1 = require("@n8n/backend-common");
const di_1 = require("@n8n/di");
const n8n_workflow_1 = require("n8n-workflow");
const encryption_1 = require("../encryption");
const deep_merge_1 = require("../utils/deep-merge");
const execution_context_hook_registry_service_1 = require("./execution-context-hook-registry.service");
let ExecutionContextService = class ExecutionContextService {
    constructor(logger, executionContextHookRegistry, cipher) {
        this.logger = logger;
        this.executionContextHookRegistry = executionContextHookRegistry;
        this.cipher = cipher;
    }
    decryptExecutionContext(context) {
        let credentials = undefined;
        if (context.credentials) {
            const decrypted = this.cipher.decrypt(context.credentials);
            credentials = (0, n8n_workflow_1.toCredentialContext)(decrypted);
        }
        return {
            ...context,
            credentials,
        };
    }
    encryptExecutionContext(context) {
        let credentials = undefined;
        if (context.credentials) {
            credentials = this.cipher.encrypt(context.credentials);
        }
        return {
            ...context,
            credentials,
        };
    }
    mergeExecutionContexts(baseContext, contextToMerge) {
        return (0, deep_merge_1.deepMerge)(baseContext, contextToMerge);
    }
    async augmentExecutionContextWithHooks(workflow, startItem, contextToAugment) {
        let currentTriggerItems = startItem.data['main'][0];
        const contextEstablishmentHookParameters = startItem.node.parameters?.contextEstablishmentHooks;
        const startNodeParametersResult = (0, n8n_workflow_1.toExecutionContextEstablishmentHookParameter)(contextEstablishmentHookParameters);
        if (!startNodeParametersResult || startNodeParametersResult.error) {
            if (startNodeParametersResult?.error) {
                this.logger.warn(`Failed to parse execution context establishment hook parameters for node ${startItem.node.name}: ${startNodeParametersResult.error.message}`);
            }
            return {
                context: contextToAugment,
                triggerItems: currentTriggerItems,
            };
        }
        const startNodeParameters = startNodeParametersResult.data;
        let context = this.decryptExecutionContext(contextToAugment);
        for (const hookParameters of startNodeParameters.hooks) {
            const hook = this.executionContextHookRegistry.getHookByName(hookParameters.hookName);
            if (!hook) {
                this.logger.warn(`Execution context establishment hook ${hookParameters.hookName} not found, skipping this hook`);
                continue;
            }
            try {
                const result = await hook.execute({
                    triggerNode: startItem.node,
                    workflow,
                    triggerItems: currentTriggerItems,
                    context,
                    options: hookParameters,
                });
                if (result.triggerItems !== undefined) {
                    currentTriggerItems = result.triggerItems;
                }
                if (result.contextUpdate) {
                    context = this.mergeExecutionContexts(context, result.contextUpdate);
                }
            }
            catch (error) {
                this.logger.warn(`Failed to execute context establishment hook ${hookParameters.hookName}`, { error });
                if (!hookParameters.isAllowedToFail) {
                    throw error;
                }
            }
        }
        return {
            context: this.encryptExecutionContext(context),
            triggerItems: currentTriggerItems,
        };
    }
};
exports.ExecutionContextService = ExecutionContextService;
exports.ExecutionContextService = ExecutionContextService = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [backend_common_1.Logger,
        execution_context_hook_registry_service_1.ExecutionContextHookRegistry,
        encryption_1.Cipher])
], ExecutionContextService);
//# sourceMappingURL=execution-context.service.js.map