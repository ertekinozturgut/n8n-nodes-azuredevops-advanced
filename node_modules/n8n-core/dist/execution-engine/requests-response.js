"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRequest = handleRequest;
exports.isEngineRequest = isEngineRequest;
exports.makeEngineResponse = makeEngineResponse;
const di_1 = require("@n8n/di");
const n8n_workflow_1 = require("n8n-workflow");
const error_reporter_1 = require("../errors/error-reporter");
function prepareRequestedNodesForExecution(workflow, currentNode, request, runIndex, runData, executionData) {
    const nodesToBeExecuted = [];
    const subNodeExecutionData = {
        actions: [],
        metadata: request.metadata,
    };
    for (const action of request.actions) {
        const node = workflow.getNode(action.nodeName);
        if (!node) {
            throw new n8n_workflow_1.UnexpectedError(`Workflow does not contain a node with the name of "${action.nodeName}".`);
        }
        node.rewireOutputLogTo = action.type;
        const inputConnectionData = {
            type: action.type,
            node: action.nodeName,
            index: 0,
        };
        const parentNode = currentNode.name;
        const parentSourceData = executionData.source?.main?.[runIndex];
        const parentOutputIndex = parentSourceData?.previousNodeOutput ?? 0;
        const parentRunIndex = parentSourceData?.previousNodeRun ?? 0;
        const parentSourceNode = parentSourceData?.previousNode ?? currentNode.name;
        const itemIndex = action.metadata?.itemIndex ?? 0;
        const agentInputData = executionData.data.main?.[0]?.[itemIndex];
        const mergedJson = {
            ...(agentInputData?.json ?? {}),
            ...action.input,
            toolCallId: action.id,
        };
        const parentOutputData = [
            [
                {
                    json: mergedJson,
                    pairedItem: {
                        item: parentRunIndex,
                        input: parentOutputIndex,
                        sourceOverwrite: {
                            previousNode: parentSourceNode,
                            previousNodeOutput: parentOutputIndex,
                            previousNodeRun: parentRunIndex,
                        },
                    },
                },
            ],
        ];
        runData[node.name] ||= [];
        const nodeRunData = runData[node.name];
        const nodeRunIndex = nodeRunData.length;
        nodeRunData.push({
            inputOverride: { ai_tool: parentOutputData },
            source: [],
            executionIndex: 0,
            executionTime: 0,
            startTime: 0,
        });
        nodesToBeExecuted.push({
            inputConnectionData,
            parentOutputIndex: 0,
            parentNode,
            parentOutputData,
            runIndex,
            nodeRunIndex,
            metadata: { preserveSourceOverwrite: true },
        });
        subNodeExecutionData.actions.push({
            action,
            nodeName: action.nodeName,
            runIndex: nodeRunIndex,
        });
    }
    return { nodesToBeExecuted, subNodeExecutionData };
}
function prepareRequestingNodeForResuming(workflow, request, executionData) {
    const parentNode = executionData.source?.main?.[0]?.previousNode;
    if (!parentNode) {
        di_1.Container.get(error_reporter_1.ErrorReporter).error(new n8n_workflow_1.UnexpectedError('Cannot find parent node for subnode execution - request will be ignored'), {
            extra: {
                executionNode: executionData.node.name,
                sourceData: executionData.source,
                workflowId: workflow.id,
                requestActions: request.actions.map((a) => ({
                    nodeName: a.nodeName,
                    actionType: a.actionType,
                    id: a.id,
                })),
            },
        });
        return undefined;
    }
    const connectionData = {
        type: 'ai_tool',
        node: executionData.node.name,
        index: 0,
    };
    return { connectionData, parentNode };
}
function handleRequest({ workflow, currentNode, request, runIndex, executionData, runData, }) {
    const { nodesToBeExecuted, subNodeExecutionData } = prepareRequestedNodesForExecution(workflow, currentNode, request, runIndex, runData, executionData);
    const result = prepareRequestingNodeForResuming(workflow, request, executionData);
    if (!result) {
        return { nodesToBeExecuted: [] };
    }
    nodesToBeExecuted.unshift({
        inputConnectionData: result.connectionData,
        parentOutputIndex: 0,
        parentNode: result.parentNode,
        parentOutputData: executionData.data.main,
        runIndex,
        nodeRunIndex: runIndex,
        metadata: { nodeWasResumed: true, subNodeExecutionData },
    });
    return { nodesToBeExecuted };
}
function isEngineRequest(responseOrRequest) {
    return !!responseOrRequest && 'actions' in responseOrRequest;
}
function makeEngineResponse() {
    return { actionResponses: [], metadata: {} };
}
//# sourceMappingURL=requests-response.js.map