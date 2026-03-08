"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.establishExecutionContext = void 0;
const di_1 = require("@n8n/di");
const assertions_1 = require("../utils/assertions");
const execution_context_service_1 = require("./execution-context.service");
const establishExecutionContext = async (workflow, runExecutionData, additionalData, mode) => {
    (0, assertions_1.assertExecutionDataExists)(runExecutionData.executionData, workflow, additionalData, mode);
    const executionData = runExecutionData.executionData;
    if (executionData.runtimeData) {
        return;
    }
    executionData.runtimeData = {
        version: 1,
        establishedAt: Date.now(),
        source: mode,
    };
    if (runExecutionData.parentExecution) {
        executionData.runtimeData = {
            ...(runExecutionData.parentExecution.executionContext ?? {}),
            ...executionData.runtimeData,
            parentExecutionId: runExecutionData.parentExecution.executionId,
        };
        return;
    }
    const [startItem] = executionData.nodeExecutionStack;
    if (!startItem) {
        return;
    }
    if (startItem.metadata?.parentExecution?.executionContext) {
        executionData.runtimeData = {
            ...startItem.metadata.parentExecution.executionContext,
            ...executionData.runtimeData,
            parentExecutionId: startItem.metadata.parentExecution.executionId,
        };
        return;
    }
    const executionContextService = di_1.Container.get(execution_context_service_1.ExecutionContextService);
    const { context, triggerItems } = await executionContextService.augmentExecutionContextWithHooks(workflow, startItem, executionData.runtimeData);
    executionData.runtimeData = context;
    if (triggerItems) {
        startItem.data['main'][0] = triggerItems;
    }
};
exports.establishExecutionContext = establishExecutionContext;
//# sourceMappingURL=execution-context.js.map