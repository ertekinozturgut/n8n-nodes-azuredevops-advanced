"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecuteContext = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const base_execute_context_1 = require("./base-execute-context");
const binary_helper_functions_1 = require("./utils/binary-helper-functions");
const construct_execution_metadata_1 = require("./utils/construct-execution-metadata");
const copy_input_items_1 = require("./utils/copy-input-items");
const data_table_helper_functions_1 = require("./utils/data-table-helper-functions");
const deduplication_helper_functions_1 = require("./utils/deduplication-helper-functions");
const file_system_helper_functions_1 = require("./utils/file-system-helper-functions");
const get_input_connection_data_1 = require("./utils/get-input-connection-data");
const normalize_items_1 = require("./utils/normalize-items");
const request_helper_functions_1 = require("./utils/request-helper-functions");
const return_json_array_1 = require("./utils/return-json-array");
const ssh_tunnel_helper_functions_1 = require("./utils/ssh-tunnel-helper-functions");
class ExecuteContext extends base_execute_context_1.BaseExecuteContext {
    constructor(workflow, node, additionalData, mode, runExecutionData, runIndex, connectionInputData, inputData, executeData, closeFunctions, abortSignal, subNodeExecutionResults) {
        super(workflow, node, additionalData, mode, runExecutionData, runIndex, connectionInputData, inputData, executeData, abortSignal);
        this.closeFunctions = closeFunctions;
        this.subNodeExecutionResults = subNodeExecutionResults;
        this.hints = [];
        this.helpers = {
            createDeferredPromise: n8n_workflow_1.createDeferredPromise,
            returnJsonArray: return_json_array_1.returnJsonArray,
            copyInputItems: copy_input_items_1.copyInputItems,
            normalizeItems: normalize_items_1.normalizeItems,
            constructExecutionMetaData: construct_execution_metadata_1.constructExecutionMetaData,
            ...(0, request_helper_functions_1.getRequestHelperFunctions)(workflow, node, additionalData, runExecutionData, connectionInputData),
            ...(0, binary_helper_functions_1.getBinaryHelperFunctions)(additionalData, workflow.id),
            ...(0, data_table_helper_functions_1.getDataTableHelperFunctions)(additionalData, workflow, node),
            ...(0, ssh_tunnel_helper_functions_1.getSSHTunnelFunctions)(),
            ...(0, file_system_helper_functions_1.getFileSystemHelperFunctions)(node),
            ...(0, deduplication_helper_functions_1.getDeduplicationHelperFunctions)(workflow, node),
            assertBinaryData: (itemIndex, propertyName) => (0, binary_helper_functions_1.assertBinaryData)(inputData, node, itemIndex, propertyName, 0),
            getBinaryDataBuffer: async (itemIndex, propertyName) => await (0, binary_helper_functions_1.getBinaryDataBuffer)(inputData, itemIndex, propertyName, 0),
            detectBinaryEncoding: (buffer) => (0, binary_helper_functions_1.detectBinaryEncoding)(buffer),
        };
        this.nodeHelpers = {
            copyBinaryFile: async (filePath, fileName, mimeType) => await (0, binary_helper_functions_1.copyBinaryFile)(this.workflow.id, this.additionalData.executionId, filePath, fileName, mimeType),
        };
        this.getNodeParameter = ((parameterName, itemIndex, fallbackValue, options) => this._getNodeParameter(parameterName, itemIndex, fallbackValue, options));
    }
    isStreaming() {
        const handlers = this.additionalData.hooks?.handlers?.sendChunk?.length;
        const hasHandlers = handlers !== undefined && handlers > 0;
        const streamingEnabled = this.additionalData.streamingEnabled === true;
        const executionModeSupportsStreaming = ['manual', 'webhook', 'integrated', 'chat'];
        const isStreamingMode = executionModeSupportsStreaming.includes(this.mode);
        return hasHandlers && isStreamingMode && streamingEnabled;
    }
    async sendChunk(type, itemIndex, content) {
        const node = this.getNode();
        const metadata = {
            nodeId: node.id,
            nodeName: node.name,
            itemIndex,
            runIndex: this.runIndex,
            timestamp: Date.now(),
        };
        const parsedContent = typeof content === 'string' ? content : JSON.stringify(content);
        const message = {
            type,
            content: parsedContent,
            metadata,
        };
        await this.additionalData.hooks?.runHook('sendChunk', [message]);
    }
    async getInputConnectionData(connectionType, itemIndex) {
        return await get_input_connection_data_1.getInputConnectionData.call(this, this.workflow, this.runExecutionData, this.runIndex, this.connectionInputData, this.inputData, this.additionalData, this.executeData, this.mode, this.closeFunctions, connectionType, itemIndex, this.abortSignal);
    }
    getInputData(inputIndex = 0, connectionType = n8n_workflow_1.NodeConnectionTypes.Main) {
        if (!this.inputData.hasOwnProperty(connectionType)) {
            return [];
        }
        return super.getInputItems(inputIndex, connectionType) ?? [];
    }
    logNodeOutput(...args) {
        if (this.mode === 'manual') {
            const parsedLogArgs = args.map((arg) => typeof arg === 'string' ? (0, n8n_workflow_1.jsonParse)(arg, { fallbackValue: arg }) : arg);
            this.sendMessageToUI(...parsedLogArgs);
            return;
        }
        if (process.env.CODE_ENABLE_STDOUT === 'true') {
            console.log(`[Workflow "${this.getWorkflow().id}"][Node "${this.node.name}"]`, ...args);
        }
    }
    async sendResponse(response) {
        await this.additionalData.hooks?.runHook('sendResponse', [response]);
    }
    addInputData() {
        throw new n8n_workflow_1.ApplicationError('addInputData should not be called on IExecuteFunctions');
    }
    addOutputData() {
        throw new n8n_workflow_1.ApplicationError('addOutputData should not be called on IExecuteFunctions');
    }
    getParentCallbackManager() {
        return this.additionalData.parentCallbackManager;
    }
    addExecutionHints(...hints) {
        this.hints.push(...hints);
    }
}
exports.ExecuteContext = ExecuteContext;
//# sourceMappingURL=execute-context.js.map