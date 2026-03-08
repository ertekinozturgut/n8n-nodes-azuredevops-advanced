"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplyDataContext = void 0;
const get_1 = __importDefault(require("lodash/get"));
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
class SupplyDataContext extends base_execute_context_1.BaseExecuteContext {
    constructor(workflow, node, additionalData, mode, runExecutionData, runIndex, connectionInputData, inputData, connectionType, executeData, closeFunctions, abortSignal, parentNode) {
        super(workflow, node, additionalData, mode, runExecutionData, runIndex, connectionInputData, inputData, executeData, abortSignal);
        this.connectionType = connectionType;
        this.closeFunctions = closeFunctions;
        this.hints = [];
        this.parentNode = parentNode;
        this.helpers = {
            createDeferredPromise: n8n_workflow_1.createDeferredPromise,
            copyInputItems: copy_input_items_1.copyInputItems,
            ...(0, request_helper_functions_1.getRequestHelperFunctions)(workflow, node, additionalData, runExecutionData, connectionInputData),
            ...(0, ssh_tunnel_helper_functions_1.getSSHTunnelFunctions)(),
            ...(0, file_system_helper_functions_1.getFileSystemHelperFunctions)(node),
            ...(0, binary_helper_functions_1.getBinaryHelperFunctions)(additionalData, workflow.id),
            ...(0, data_table_helper_functions_1.getDataTableHelperFunctions)(additionalData, workflow, node),
            ...(0, deduplication_helper_functions_1.getDeduplicationHelperFunctions)(workflow, node),
            assertBinaryData: (itemIndex, propertyName) => (0, binary_helper_functions_1.assertBinaryData)(inputData, node, itemIndex, propertyName, 0),
            getBinaryDataBuffer: async (itemIndex, propertyName) => await (0, binary_helper_functions_1.getBinaryDataBuffer)(inputData, itemIndex, propertyName, 0),
            detectBinaryEncoding: (buffer) => (0, binary_helper_functions_1.detectBinaryEncoding)(buffer),
            returnJsonArray: return_json_array_1.returnJsonArray,
            normalizeItems: normalize_items_1.normalizeItems,
            constructExecutionMetaData: construct_execution_metadata_1.constructExecutionMetaData,
        };
        this.getNodeParameter = ((parameterName, itemIndex, fallbackValue, options) => this._getNodeParameter(parameterName, itemIndex, fallbackValue, options));
    }
    cloneWith(replacements) {
        const context = new SupplyDataContext(this.workflow, this.node, this.additionalData, this.mode, this.runExecutionData, replacements.runIndex, this.connectionInputData, {}, this.connectionType, this.executeData, this.closeFunctions, this.abortSignal, this.parentNode);
        context.addInputData(n8n_workflow_1.NodeConnectionTypes.AiTool, replacements.inputData);
        return context;
    }
    async getInputConnectionData(connectionType, itemIndex) {
        return await get_input_connection_data_1.getInputConnectionData.call(this, this.workflow, this.runExecutionData, this.runIndex, this.connectionInputData, this.inputData, this.additionalData, this.executeData, this.mode, this.closeFunctions, connectionType, itemIndex, this.abortSignal);
    }
    getInputData(inputIndex = 0, connectionType = this.connectionType) {
        if (!this.inputData.hasOwnProperty(connectionType)) {
            return [];
        }
        return super.getInputItems(inputIndex, connectionType) ?? [];
    }
    getNextRunIndex() {
        const nodeName = this.node.name;
        return this.runExecutionData.resultData.runData[nodeName]?.length ?? 0;
    }
    addInputData(connectionType, data, runIndex) {
        const nodeName = this.node.name;
        const currentNodeRunIndex = this.getNextRunIndex();
        this.addExecutionDataFunctions('input', data, connectionType, nodeName, currentNodeRunIndex, undefined, runIndex).catch((error) => {
            this.logger.warn(`There was a problem logging input data of node "${nodeName}": ${error.message}`);
        });
        return { index: currentNodeRunIndex };
    }
    addOutputData(connectionType, currentNodeRunIndex, data, metadata, sourceNodeRunIndex) {
        const nodeName = this.node.name;
        this.addExecutionDataFunctions('output', data, connectionType, nodeName, currentNodeRunIndex, metadata, sourceNodeRunIndex).catch((error) => {
            this.logger.warn(`There was a problem logging output data of node "${nodeName}": ${error.message}`);
        });
    }
    async addExecutionDataFunctions(type, data, connectionType, sourceNodeName, currentNodeRunIndex, metadata, sourceNodeRunIndex) {
        const { additionalData, runExecutionData, runIndex: currentRunIndex, node: { name: nodeName }, } = this;
        let taskData;
        const source = this.parentNode
            ? [
                {
                    previousNode: this.parentNode.name,
                    previousNodeRun: sourceNodeRunIndex ?? currentRunIndex,
                },
            ]
            : [];
        if (type === 'input') {
            taskData = {
                startTime: Date.now(),
                executionTime: 0,
                executionIndex: additionalData.currentNodeExecutionIndex++,
                executionStatus: 'running',
                source,
            };
        }
        else {
            taskData = (0, get_1.default)(runExecutionData, ['resultData', 'runData', nodeName, currentNodeRunIndex], undefined);
            if (taskData === undefined) {
                return;
            }
            taskData.metadata = metadata;
            taskData.source = source;
        }
        taskData = taskData;
        if (data instanceof Error) {
            if (!(type === 'output' && this.abortSignal?.aborted && taskData.executionStatus === 'canceled')) {
                taskData.executionStatus = 'error';
                taskData.error = data;
            }
        }
        else {
            if (type === 'output') {
                taskData.executionStatus = 'success';
            }
            taskData.data = {
                [connectionType]: data,
            };
        }
        if (type === 'input') {
            if (!(data instanceof Error)) {
                this.inputData[connectionType] = data;
                taskData.inputOverride = {
                    [connectionType]: data,
                };
            }
            if (!runExecutionData.resultData.runData.hasOwnProperty(nodeName)) {
                runExecutionData.resultData.runData[nodeName] = [];
            }
            runExecutionData.resultData.runData[nodeName][currentNodeRunIndex] = taskData;
            await additionalData.hooks?.runHook('nodeExecuteBefore', [nodeName, taskData]);
        }
        else {
            taskData.executionTime = Date.now() - taskData.startTime;
            if (this.hints.length > 0) {
                taskData.hints = this.hints;
            }
            await additionalData.hooks?.runHook('nodeExecuteAfter', [
                nodeName,
                taskData,
                this.runExecutionData,
            ]);
            if ((0, get_1.default)(runExecutionData, 'executionData.metadata', undefined) === undefined) {
                runExecutionData.executionData.metadata = {};
            }
            let sourceTaskData = runExecutionData.executionData?.metadata?.[sourceNodeName];
            if (!sourceTaskData) {
                runExecutionData.executionData.metadata[sourceNodeName] = [];
                sourceTaskData = runExecutionData.executionData.metadata[sourceNodeName];
            }
            if (!sourceTaskData[currentNodeRunIndex]) {
                sourceTaskData[currentNodeRunIndex] = {
                    subRun: [],
                };
            }
            sourceTaskData[currentNodeRunIndex].subRun.push({
                node: nodeName,
                runIndex: currentNodeRunIndex,
            });
        }
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
    addExecutionHints(...hints) {
        this.hints.push(...hints);
    }
}
exports.SupplyDataContext = SupplyDataContext;
//# sourceMappingURL=supply-data-context.js.map