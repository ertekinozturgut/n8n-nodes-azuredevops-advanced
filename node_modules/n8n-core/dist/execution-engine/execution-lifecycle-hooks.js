"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionLifecycleHooks = void 0;
class ExecutionLifecycleHooks {
    constructor(mode, executionId, workflowData) {
        this.mode = mode;
        this.executionId = executionId;
        this.workflowData = workflowData;
        this.handlers = {
            nodeExecuteAfter: [],
            nodeExecuteBefore: [],
            nodeFetchedData: [],
            sendResponse: [],
            workflowExecuteAfter: [],
            workflowExecuteBefore: [],
            sendChunk: [],
        };
    }
    addHandler(hookName, ...handlers) {
        this.handlers[hookName].push(...handlers);
    }
    async runHook(hookName, parameters) {
        const hooks = this.handlers[hookName];
        for (const hookFunction of hooks) {
            const typedHookFunction = hookFunction;
            await typedHookFunction.apply(this, parameters);
        }
    }
}
exports.ExecutionLifecycleHooks = ExecutionLifecycleHooks;
//# sourceMappingURL=execution-lifecycle-hooks.js.map