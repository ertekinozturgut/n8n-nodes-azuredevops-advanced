"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertExecutionDataExists = assertExecutionDataExists;
const n8n_workflow_1 = require("n8n-workflow");
function assertExecutionDataExists(executionData, workflow, additionalData, mode) {
    if (!executionData) {
        throw new n8n_workflow_1.UnexpectedError('Failed to run workflow due to missing execution data', {
            extra: {
                workflowId: workflow.id,
                executionId: additionalData.executionId,
                mode,
            },
        });
    }
}
//# sourceMappingURL=assertions.js.map