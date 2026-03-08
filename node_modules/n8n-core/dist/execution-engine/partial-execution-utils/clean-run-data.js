"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanRunData = cleanRunData;
const n8n_workflow_1 = require("n8n-workflow");
function cleanRunData(runData, graph, nodesToClean) {
    const newRunData = { ...runData };
    for (const nodeToClean of nodesToClean) {
        delete newRunData[nodeToClean.name];
        const children = graph.getChildren(nodeToClean);
        for (const node of [nodeToClean, ...children]) {
            delete newRunData[node.name];
            const subNodeConnections = graph.getParentConnections(node);
            for (const subNodeConnection of subNodeConnections) {
                if (subNodeConnection.type === n8n_workflow_1.NodeConnectionTypes.Main) {
                    continue;
                }
                delete newRunData[subNodeConnection.from.name];
            }
        }
    }
    for (const nodeName of Object.keys(newRunData)) {
        if (!graph.hasNode(nodeName)) {
            delete newRunData[nodeName];
        }
    }
    return newRunData;
}
//# sourceMappingURL=clean-run-data.js.map