"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterDisabledNodes = filterDisabledNodes;
const n8n_workflow_1 = require("n8n-workflow");
function filterDisabledNodes(graph) {
    const filteredGraph = graph.clone();
    for (const node of filteredGraph.getNodes().values()) {
        if (node.disabled) {
            filteredGraph.removeNode(node, {
                reconnectConnections: true,
                skipConnectionFn: (c) => c.type !== n8n_workflow_1.NodeConnectionTypes.Main,
            });
        }
    }
    return filteredGraph;
}
//# sourceMappingURL=filter-disabled-nodes.js.map