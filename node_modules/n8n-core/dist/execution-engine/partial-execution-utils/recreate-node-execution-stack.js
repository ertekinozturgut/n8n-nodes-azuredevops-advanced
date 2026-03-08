"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.addWaitingExecution = addWaitingExecution;
exports.addWaitingExecutionSource = addWaitingExecutionSource;
exports.recreateNodeExecutionStack = recreateNodeExecutionStack;
const a = __importStar(require("assert/strict"));
const n8n_workflow_1 = require("n8n-workflow");
const get_incoming_data_1 = require("./get-incoming-data");
const get_source_data_groups_1 = require("./get-source-data-groups");
function addWaitingExecution(waitingExecution, nodeName, runIndex, inputType, inputIndex, executionData) {
    const waitingExecutionObject = waitingExecution[nodeName] ?? {};
    const taskDataConnections = waitingExecutionObject[runIndex] ?? {};
    const executionDataList = taskDataConnections[inputType] ?? [];
    executionDataList[inputIndex] = executionData;
    taskDataConnections[inputType] = executionDataList;
    waitingExecutionObject[runIndex] = taskDataConnections;
    waitingExecution[nodeName] = waitingExecutionObject;
}
function addWaitingExecutionSource(waitingExecutionSource, nodeName, runIndex, inputType, inputIndex, sourceData) {
    const waitingExecutionSourceObject = waitingExecutionSource[nodeName] ?? {};
    const taskDataConnectionsSource = waitingExecutionSourceObject[runIndex] ?? {};
    const sourceDataList = taskDataConnectionsSource[inputType] ?? [];
    sourceDataList[inputIndex] = sourceData;
    taskDataConnectionsSource[inputType] = sourceDataList;
    waitingExecutionSourceObject[runIndex] = taskDataConnectionsSource;
    waitingExecutionSource[nodeName] = waitingExecutionSourceObject;
}
function recreateNodeExecutionStack(graph, startNodes, runData, pinData) {
    for (const node of graph.getNodes().values()) {
        a.notEqual(node.disabled, true, `Graph contains disabled nodes. This is not supported. Make sure to pass the graph through "findSubgraph" before calling "recreateNodeExecutionStack". The node in question is "${node.name}"`);
    }
    const nodeExecutionStack = [];
    const waitingExecution = {};
    const waitingExecutionSource = {};
    for (const startNode of startNodes) {
        const incomingStartNodeConnections = graph
            .getDirectParentConnections(startNode)
            .filter((c) => c.type === n8n_workflow_1.NodeConnectionTypes.Main);
        let incomingData = [];
        let incomingSourceData = null;
        if (incomingStartNodeConnections.length === 0) {
            incomingData.push([{ json: {} }]);
            const executeData = {
                node: startNode,
                data: { main: incomingData },
                source: incomingSourceData,
            };
            nodeExecutionStack.push(executeData);
        }
        else {
            const sourceDataSets = (0, get_source_data_groups_1.getSourceDataGroups)(graph, startNode, runData, pinData);
            for (const sourceData of sourceDataSets) {
                if (sourceData.complete) {
                    incomingData = [];
                    incomingSourceData = { main: [] };
                    for (const incomingConnection of sourceData.connections) {
                        let runIndex = 0;
                        const sourceNode = incomingConnection.from;
                        if (pinData[sourceNode.name]) {
                            incomingData.push(pinData[sourceNode.name]);
                        }
                        else {
                            a.ok(runData[sourceNode.name], `Start node(${incomingConnection.to.name}) has an incoming connection with no run or pinned data. This is not supported. The connection in question is "${sourceNode.name}->${startNode.name}". Are you sure the start nodes come from the "findStartNodes" function?`);
                            const nodeIncomingData = (0, get_incoming_data_1.getIncomingDataFromAnyRun)(runData, sourceNode.name, incomingConnection.type, incomingConnection.outputIndex);
                            if (nodeIncomingData) {
                                runIndex = nodeIncomingData.runIndex;
                                incomingData.push(nodeIncomingData.data);
                            }
                        }
                        incomingSourceData.main.push({
                            previousNode: incomingConnection.from.name,
                            previousNodeOutput: incomingConnection.outputIndex,
                            previousNodeRun: runIndex,
                        });
                    }
                    const executeData = {
                        node: startNode,
                        data: { main: incomingData },
                        source: incomingSourceData,
                    };
                    nodeExecutionStack.push(executeData);
                }
                else {
                    const nodeName = startNode.name;
                    const nextRunIndex = waitingExecution[nodeName]
                        ? Object.keys(waitingExecution[nodeName]).length
                        : 0;
                    for (const incomingConnection of sourceData.connections) {
                        const sourceNode = incomingConnection.from;
                        const maybeNodeIncomingData = (0, get_incoming_data_1.getIncomingDataFromAnyRun)(runData, sourceNode.name, incomingConnection.type, incomingConnection.outputIndex);
                        const nodeIncomingData = maybeNodeIncomingData?.data ?? null;
                        if (nodeIncomingData) {
                            addWaitingExecution(waitingExecution, nodeName, nextRunIndex, incomingConnection.type, incomingConnection.inputIndex, nodeIncomingData);
                            addWaitingExecutionSource(waitingExecutionSource, nodeName, nextRunIndex, incomingConnection.type, incomingConnection.inputIndex, nodeIncomingData
                                ? {
                                    previousNode: incomingConnection.from.name,
                                    previousNodeRun: nextRunIndex,
                                    previousNodeOutput: incomingConnection.outputIndex,
                                }
                                : null);
                        }
                    }
                }
            }
        }
    }
    return {
        nodeExecutionStack,
        waitingExecution,
        waitingExecutionSource,
    };
}
//# sourceMappingURL=recreate-node-execution-stack.js.map