"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeHandleToolInvocation = makeHandleToolInvocation;
exports.getInputConnectionData = getInputConnectionData;
const n8n_workflow_1 = require("n8n-workflow");
const create_node_as_tool_1 = require("./create-node-as-tool");
const supply_data_context_1 = require("../../node-execution-context/supply-data-context");
const requests_response_1 = require("../../requests-response");
function getNextRunIndex(runExecutionData, nodeName) {
    return runExecutionData.resultData.runData[nodeName]?.length ?? 0;
}
function containsBinaryData(nodeExecutionResult) {
    if ((0, requests_response_1.isEngineRequest)(nodeExecutionResult)) {
        return false;
    }
    if (nodeExecutionResult === undefined || nodeExecutionResult === null) {
        return false;
    }
    return nodeExecutionResult.some((outputBranch) => outputBranch.some((item) => item.binary));
}
function containsDataThatIsUsefulToTheAgent(nodeExecutionResult) {
    if ((0, requests_response_1.isEngineRequest)(nodeExecutionResult)) {
        return false;
    }
    if (nodeExecutionResult === undefined || nodeExecutionResult === null) {
        return false;
    }
    return nodeExecutionResult.some((outputBranch) => outputBranch.some((item) => Object.keys(item.json).length > 0));
}
function mapResult(result) {
    let response;
    let nodeHasMixedJsonAndBinaryData = false;
    if (result === undefined) {
        response = undefined;
    }
    else if ((0, requests_response_1.isEngineRequest)(result)) {
        response =
            'Error: The Tool attempted to return an engine request, which is not supported in Agents';
    }
    else if (containsBinaryData(result) && !containsDataThatIsUsefulToTheAgent(result)) {
        response = 'Error: The Tool attempted to return binary data, which is not supported in Agents';
    }
    else {
        if (containsBinaryData(result)) {
            nodeHasMixedJsonAndBinaryData = true;
        }
        response = result?.[0]?.flatMap((item) => item.json);
    }
    return { response, nodeHasMixedJsonAndBinaryData };
}
function makeHandleToolInvocation(contextFactory, node, nodeType, runExecutionData) {
    let runIndex = getNextRunIndex(runExecutionData, node.name);
    return async (toolArgs) => {
        let maxTries = 1;
        if (node.retryOnFail === true) {
            maxTries = Math.min(5, Math.max(2, node.maxTries ?? 3));
        }
        let waitBetweenTries = 0;
        if (node.retryOnFail === true) {
            waitBetweenTries = Math.min(5000, Math.max(0, node.waitBetweenTries ?? 1000));
        }
        let lastError;
        for (let tryIndex = 0; tryIndex < maxTries; tryIndex++) {
            const localRunIndex = runIndex++;
            const context = contextFactory(localRunIndex);
            const abortSignal = context.getExecutionCancelSignal?.();
            if (abortSignal?.aborted) {
                return 'Error during node execution: Execution was cancelled';
            }
            if (tryIndex !== 0) {
                lastError = undefined;
                if (waitBetweenTries !== 0) {
                    try {
                        await (0, n8n_workflow_1.sleepWithAbort)(waitBetweenTries, abortSignal);
                    }
                    catch (abortError) {
                        return 'Error during node execution: Execution was cancelled';
                    }
                }
            }
            context.addInputData(n8n_workflow_1.NodeConnectionTypes.AiTool, [[{ json: toolArgs }]]);
            try {
                const result = await nodeType.execute?.call(context);
                const { response, nodeHasMixedJsonAndBinaryData } = mapResult(result);
                if (nodeHasMixedJsonAndBinaryData) {
                    context.logger.warn(`Response from Tool '${node.name}' included binary data, which is not supported in Agents. The binary data was omitted from the response.`);
                }
                context.addOutputData(n8n_workflow_1.NodeConnectionTypes.AiTool, localRunIndex, [
                    [{ json: { response } }],
                ]);
                return JSON.stringify(response);
            }
            catch (error) {
                if (abortSignal?.aborted) {
                    throw new n8n_workflow_1.NodeOperationError(node, 'Execution was cancelled');
                }
                const nodeError = new n8n_workflow_1.NodeOperationError(node, error);
                context.addOutputData(n8n_workflow_1.NodeConnectionTypes.AiTool, localRunIndex, nodeError);
                lastError = nodeError;
                if (tryIndex === maxTries - 1) {
                    if (nodeError.description && !nodeError.message.includes(nodeError.description)) {
                        nodeError.message = `${nodeError.message}\n\nDetails: ${nodeError.description}`;
                    }
                    throw nodeError;
                }
            }
        }
        if (lastError) {
            if (lastError.description && !lastError.message.includes(lastError.description)) {
                lastError.message = `${lastError.message}\n\nDetails: ${lastError.description}`;
            }
            throw lastError;
        }
        throw new n8n_workflow_1.NodeOperationError(node, 'Unknown error during node execution');
    };
}
function validateInputConfiguration(context, connectionType, nodeInputs, connectedNodes) {
    const parentNode = context.getNode();
    const connections = context.getConnections(parentNode, connectionType);
    for (let index = 0; index < nodeInputs.length; index++) {
        const inputConfiguration = nodeInputs[index];
        if (inputConfiguration.required) {
            if (connections.length === 0 ||
                connections.length <= index ||
                connections.at(index)?.length === 0 ||
                !connectedNodes.find((node) => connections
                    .at(index)
                    ?.map((value) => value.node)
                    .includes(node.name))) {
                throw new n8n_workflow_1.NodeOperationError(parentNode, `A ${inputConfiguration?.displayName ?? connectionType} sub-node must be connected and enabled`);
            }
        }
    }
}
async function getInputConnectionData(workflow, runExecutionData, parentRunIndex, connectionInputData, parentInputData, additionalData, executeData, mode, closeFunctions, connectionType, itemIndex, abortSignal) {
    const parentNode = this.getNode();
    const inputConfigurations = this.nodeInputs.filter((input) => input.type === connectionType);
    if (inputConfigurations === undefined || inputConfigurations.length === 0) {
        throw new n8n_workflow_1.UserError('Node does not have input of type', {
            extra: { nodeName: parentNode.name, connectionType },
        });
    }
    const maxConnections = inputConfigurations.reduce((acc, currentItem) => currentItem.maxConnections !== undefined ? acc + currentItem.maxConnections : acc, 0);
    const connectedNodes = this.getConnectedNodes(connectionType);
    validateInputConfiguration(this, connectionType, inputConfigurations, connectedNodes);
    if (connectedNodes.length === 0) {
        return maxConnections === 1 ? undefined : [];
    }
    if (maxConnections !== undefined &&
        maxConnections !== 0 &&
        connectedNodes.length > maxConnections) {
        throw new n8n_workflow_1.NodeOperationError(parentNode, `Only ${maxConnections} ${connectionType} sub-nodes are/is allowed to be connected`);
    }
    const nodes = [];
    for (const connectedNode of connectedNodes) {
        const connectedNodeType = workflow.nodeTypes.getByNameAndVersion(connectedNode.type, connectedNode.typeVersion);
        const contextFactory = (runIndex, inputData) => new supply_data_context_1.SupplyDataContext(workflow, connectedNode, additionalData, mode, runExecutionData, runIndex, connectionInputData, inputData, connectionType, executeData, closeFunctions, abortSignal, parentNode);
        if (!connectedNodeType.supplyData) {
            if (connectedNodeType.description.outputs.includes(n8n_workflow_1.NodeConnectionTypes.AiTool)) {
                const supplyData = (0, create_node_as_tool_1.createNodeAsTool)({
                    node: connectedNode,
                    nodeType: connectedNodeType,
                    handleToolInvocation: makeHandleToolInvocation((i) => contextFactory(i, {}), connectedNode, connectedNodeType, runExecutionData),
                });
                nodes.push(supplyData);
            }
            else {
                throw new n8n_workflow_1.ApplicationError('Node does not have a `supplyData` method defined', {
                    extra: { nodeName: connectedNode.name },
                });
            }
        }
        else {
            const context = contextFactory(parentRunIndex, parentInputData);
            try {
                const supplyData = await connectedNodeType.supplyData.call(context, itemIndex);
                if (supplyData.closeFunction) {
                    closeFunctions.push(supplyData.closeFunction);
                }
                if (context.hints.length > 0) {
                    supplyData.hints = context.hints;
                }
                nodes.push(supplyData);
            }
            catch (error) {
                if (error instanceof n8n_workflow_1.ExecutionBaseError) {
                    if (error.functionality === 'configuration-node')
                        throw error;
                }
                else {
                    error = new n8n_workflow_1.NodeOperationError(connectedNode, error, {
                        itemIndex,
                    });
                }
                let currentNodeRunIndex = 0;
                if (runExecutionData.resultData.runData.hasOwnProperty(parentNode.name)) {
                    currentNodeRunIndex = runExecutionData.resultData.runData[parentNode.name].length;
                }
                await context.addExecutionDataFunctions('input', error, connectionType, parentNode.name, currentNodeRunIndex);
                await context.addExecutionDataFunctions('output', error, connectionType, parentNode.name, currentNodeRunIndex);
                throw new n8n_workflow_1.NodeOperationError(connectedNode, `Error in sub-node ${connectedNode.name}`, {
                    itemIndex,
                    functionality: 'configuration-node',
                    description: error.message,
                });
            }
        }
    }
    return maxConnections === 1 ? (nodes || [])[0]?.response : nodes.map((node) => node.response);
}
//# sourceMappingURL=get-input-connection-data.js.map