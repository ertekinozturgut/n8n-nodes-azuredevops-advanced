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
exports.ExecutionContextHookRegistry = void 0;
const backend_common_1 = require("@n8n/backend-common");
const decorators_1 = require("@n8n/decorators");
const di_1 = require("@n8n/di");
let ExecutionContextHookRegistry = class ExecutionContextHookRegistry {
    constructor(executionContextHookMetadata, logger) {
        this.executionContextHookMetadata = executionContextHookMetadata;
        this.logger = logger;
        this.hookMap = new Map();
    }
    async init() {
        this.hookMap.clear();
        const hookClasses = this.executionContextHookMetadata.getClasses();
        this.logger.debug(`Registering ${hookClasses.length} execution context hooks.`);
        for (const HookClass of hookClasses) {
            let hook;
            try {
                hook = di_1.Container.get(HookClass);
            }
            catch (error) {
                this.logger.error(`Failed to instantiate execution context hook class "${HookClass.name}": ${error.message}`, { error });
                continue;
            }
            if (this.hookMap.has(hook.hookDescription.name)) {
                this.logger.warn(`Execution context hook with name "${hook.hookDescription.name}" is already registered. Conflicting classes are "${this.hookMap.get(hook.hookDescription.name)?.constructor.name}" and "${HookClass.name}". Skipping the latter.`);
                continue;
            }
            if (hook.init) {
                try {
                    await hook.init();
                }
                catch (error) {
                    this.logger.error(`Failed to initialize execution context hook "${hook.hookDescription.name}": ${error.message}`, { error });
                    continue;
                }
            }
            this.hookMap.set(hook.hookDescription.name, hook);
        }
    }
    getHookByName(name) {
        return this.hookMap.get(name);
    }
    getAllHooks() {
        return Array.from(this.hookMap.values());
    }
    getHookForTriggerType(triggerType) {
        return Array.from(this.hookMap.values()).filter((hook) => hook.isApplicableToTriggerNode(triggerType));
    }
};
exports.ExecutionContextHookRegistry = ExecutionContextHookRegistry;
exports.ExecutionContextHookRegistry = ExecutionContextHookRegistry = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [decorators_1.ContextEstablishmentHookMetadata,
        backend_common_1.Logger])
], ExecutionContextHookRegistry);
//# sourceMappingURL=execution-context-hook-registry.service.js.map