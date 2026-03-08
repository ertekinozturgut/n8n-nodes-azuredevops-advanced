"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadWorkflowNodeContext = void 0;
const node_execution_context_1 = require("./node-execution-context");
class LoadWorkflowNodeContext extends node_execution_context_1.NodeExecutionContext {
    constructor(workflow, node, additionalData) {
        super(workflow, node, additionalData, 'internal');
        {
            this.getNodeParameter = ((parameterName, itemIndex, fallbackValue, options) => this._getNodeParameter(parameterName, itemIndex, fallbackValue, options));
        }
    }
}
exports.LoadWorkflowNodeContext = LoadWorkflowNodeContext;
//# sourceMappingURL=workflow-node-context.js.map