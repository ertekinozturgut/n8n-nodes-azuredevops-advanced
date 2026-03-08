"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecuteSingleContext = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const base_execute_context_1 = require("./base-execute-context");
const binary_helper_functions_1 = require("./utils/binary-helper-functions");
const request_helper_functions_1 = require("./utils/request-helper-functions");
const return_json_array_1 = require("./utils/return-json-array");
class ExecuteSingleContext extends base_execute_context_1.BaseExecuteContext {
    constructor(workflow, node, additionalData, mode, runExecutionData, runIndex, connectionInputData, inputData, itemIndex, executeData, abortSignal) {
        super(workflow, node, additionalData, mode, runExecutionData, runIndex, connectionInputData, inputData, executeData, abortSignal);
        this.itemIndex = itemIndex;
        this.helpers = {
            createDeferredPromise: n8n_workflow_1.createDeferredPromise,
            returnJsonArray: return_json_array_1.returnJsonArray,
            ...(0, request_helper_functions_1.getRequestHelperFunctions)(workflow, node, additionalData, runExecutionData, connectionInputData),
            ...(0, binary_helper_functions_1.getBinaryHelperFunctions)(additionalData, workflow.id),
            assertBinaryData: (propertyName, inputIndex = 0) => (0, binary_helper_functions_1.assertBinaryData)(inputData, node, itemIndex, propertyName, inputIndex),
            getBinaryDataBuffer: async (propertyName, inputIndex = 0) => await (0, binary_helper_functions_1.getBinaryDataBuffer)(inputData, itemIndex, propertyName, inputIndex),
            detectBinaryEncoding: (buffer) => (0, binary_helper_functions_1.detectBinaryEncoding)(buffer),
        };
    }
    evaluateExpression(expression, itemIndex = this.itemIndex) {
        return super.evaluateExpression(expression, itemIndex);
    }
    getInputData(inputIndex = 0, connectionType = n8n_workflow_1.NodeConnectionTypes.Main) {
        if (!this.inputData.hasOwnProperty(connectionType)) {
            return { json: {} };
        }
        const allItems = super.getInputItems(inputIndex, connectionType);
        const data = allItems?.[this.itemIndex];
        if (data === undefined) {
            throw new n8n_workflow_1.ApplicationError('Value of input with given index was not set', {
                extra: { inputIndex, connectionType, itemIndex: this.itemIndex },
            });
        }
        return data;
    }
    getItemIndex() {
        return this.itemIndex;
    }
    getNodeParameter(parameterName, fallbackValue, options) {
        return this._getNodeParameter(parameterName, this.itemIndex, fallbackValue, options);
    }
    async getCredentials(type) {
        return await super.getCredentials(type, this.itemIndex);
    }
    getWorkflowDataProxy() {
        return super.getWorkflowDataProxy(this.itemIndex);
    }
}
exports.ExecuteSingleContext = ExecuteSingleContext;
//# sourceMappingURL=execute-single-context.js.map