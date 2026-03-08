"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookContext = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const node_execution_context_1 = require("./node-execution-context");
const binary_helper_functions_1 = require("./utils/binary-helper-functions");
const get_input_connection_data_1 = require("./utils/get-input-connection-data");
const request_helper_functions_1 = require("./utils/request-helper-functions");
const return_json_array_1 = require("./utils/return-json-array");
const webhook_helper_functions_1 = require("./utils/webhook-helper-functions");
class WebhookContext extends node_execution_context_1.NodeExecutionContext {
    constructor(workflow, node, additionalData, mode, webhookData, closeFunctions, runExecutionData) {
        let connectionInputData = [];
        let executionData;
        if (runExecutionData?.executionData !== undefined) {
            executionData = runExecutionData.executionData.nodeExecutionStack[0];
            if (executionData !== undefined) {
                connectionInputData = executionData.data.main[0];
            }
        }
        super(workflow, node, additionalData, mode, runExecutionData, 0, connectionInputData, executionData);
        this.webhookData = webhookData;
        this.closeFunctions = closeFunctions;
        this.helpers = {
            createDeferredPromise: n8n_workflow_1.createDeferredPromise,
            returnJsonArray: return_json_array_1.returnJsonArray,
            ...(0, request_helper_functions_1.getRequestHelperFunctions)(workflow, node, additionalData),
            ...(0, binary_helper_functions_1.getBinaryHelperFunctions)(additionalData, workflow.id),
        };
        this.nodeHelpers = {
            copyBinaryFile: async (filePath, fileName, mimeType) => await (0, binary_helper_functions_1.copyBinaryFile)(this.workflow.id, this.additionalData.executionId, filePath, fileName, mimeType),
        };
    }
    async getCredentials(type) {
        return await this._getCredentials(type);
    }
    getBodyData() {
        return this.assertHttpRequest().body;
    }
    getHeaderData() {
        return this.assertHttpRequest().headers;
    }
    getParamsData() {
        return this.assertHttpRequest().params;
    }
    getQueryData() {
        return this.assertHttpRequest().query;
    }
    getRequestObject() {
        return this.assertHttpRequest();
    }
    getResponseObject() {
        if (this.additionalData.httpResponse === undefined) {
            throw new n8n_workflow_1.ApplicationError('Response is missing');
        }
        return this.additionalData.httpResponse;
    }
    assertHttpRequest() {
        const { httpRequest } = this.additionalData;
        if (httpRequest === undefined) {
            throw new n8n_workflow_1.ApplicationError('Request is missing');
        }
        return httpRequest;
    }
    getNodeWebhookUrl(name) {
        return (0, webhook_helper_functions_1.getNodeWebhookUrl)(name, this.workflow, this.node, this.additionalData, this.mode, this.additionalKeys);
    }
    getWebhookName() {
        return this.webhookData.webhookDescription.name;
    }
    async validateCookieAuth(cookieValue) {
        if (!this.additionalData.validateCookieAuth) {
            throw new n8n_workflow_1.ApplicationError('Cookie auth validation is not available');
        }
        await this.additionalData.validateCookieAuth(cookieValue);
    }
    async getInputConnectionData(connectionType, itemIndex) {
        const connectionInputData = [
            { json: this.additionalData.httpRequest?.body || {} },
        ];
        const runExecutionData = this.runExecutionData ?? (0, n8n_workflow_1.createEmptyRunExecutionData)();
        const executeData = {
            data: {
                main: [connectionInputData],
            },
            node: this.node,
            source: null,
        };
        return await get_input_connection_data_1.getInputConnectionData.call(this, this.workflow, runExecutionData, this.runIndex, connectionInputData, {}, this.additionalData, executeData, this.mode, this.closeFunctions, connectionType, itemIndex);
    }
}
exports.WebhookContext = WebhookContext;
//# sourceMappingURL=webhook-context.js.map