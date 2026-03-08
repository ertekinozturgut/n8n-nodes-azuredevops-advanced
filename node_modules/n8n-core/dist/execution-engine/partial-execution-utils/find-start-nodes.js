"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDirty = isDirty;
exports.findStartNodes = findStartNodes;
const n8n_workflow_1 = require("n8n-workflow");
const get_incoming_data_1 = require("./get-incoming-data");
function isDirty(node, runData = {}, pinData = {}) {
    const propertiesOrOptionsChanged = false;
    if (propertiesOrOptionsChanged) {
        return true;
    }
    const parentNodeGotDisabled = false;
    if (parentNodeGotDisabled) {
        return true;
    }
    const hasAnError = false;
    if (hasAnError) {
        return true;
    }
    const hasPinnedData = pinData[node.name] !== undefined;
    if (hasPinnedData) {
        return false;
    }
    const hasRunData = runData?.[node.name];
    if (hasRunData) {
        return false;
    }
    return true;
}
function findStartNodesRecursive(graph, current, destination, runData, pinData, startNodes, seen) {
    const nodeIsDirty = isDirty(current, runData, pinData);
    if (nodeIsDirty) {
        startNodes.add(current);
        return startNodes;
    }
    if (current === destination) {
        startNodes.add(current);
        return startNodes;
    }
    if (current.type === 'n8n-nodes-base.splitInBatches') {
        const nodeRunData = (0, get_incoming_data_1.getIncomingData)(runData, current.name, -1, n8n_workflow_1.NodeConnectionTypes.Main, 0);
        if (nodeRunData === null || nodeRunData.length === 0) {
            startNodes.add(current);
            return startNodes;
        }
    }
    if (seen.has(current)) {
        return startNodes;
    }
    const outGoingConnections = graph.getDirectChildConnections(current);
    for (const outGoingConnection of outGoingConnections) {
        const nodeRunData = (0, get_incoming_data_1.getIncomingDataFromAnyRun)(runData, outGoingConnection.from.name, outGoingConnection.type, outGoingConnection.outputIndex);
        const hasNoRunData = nodeRunData === null || nodeRunData === undefined || nodeRunData.data.length === 0;
        const hasNoPinnedData = pinData[outGoingConnection.from.name] === undefined;
        if (hasNoRunData && hasNoPinnedData) {
            continue;
        }
        findStartNodesRecursive(graph, outGoingConnection.to, destination, runData, pinData, startNodes, new Set(seen).add(current));
    }
    return startNodes;
}
function findStartNodes(options) {
    const graph = options.graph;
    const trigger = options.trigger;
    const destination = options.destination;
    const runData = { ...options.runData };
    const pinData = options.pinData;
    const startNodes = findStartNodesRecursive(graph, trigger, destination, runData, pinData, new Set(), new Set());
    return startNodes;
}
//# sourceMappingURL=find-start-nodes.js.map