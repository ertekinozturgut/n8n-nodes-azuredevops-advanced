"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowHasIssuesError = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class WorkflowHasIssuesError extends n8n_workflow_1.WorkflowOperationError {
    constructor() {
        super('The workflow has issues and cannot be executed for that reason. Please fix them first.');
    }
}
exports.WorkflowHasIssuesError = WorkflowHasIssuesError;
//# sourceMappingURL=workflow-has-issues.error.js.map