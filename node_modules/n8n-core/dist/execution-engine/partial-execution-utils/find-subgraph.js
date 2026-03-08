"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findSubgraph = findSubgraph;
const n8n_workflow_1 = require("n8n-workflow");
const directed_graph_1 = require("./directed-graph");
function findSubgraphRecursive(graph, destinationNode, current, trigger, newGraph, currentBranch) {
    if (current === trigger) {
        newGraph.addNode(trigger);
        for (const connection of currentBranch) {
            newGraph.addNodes(connection.from, connection.to);
            newGraph.addConnection(connection);
        }
        return;
    }
    const parentConnections = graph.getDirectParentConnections(current);
    if (parentConnections.length === 0) {
        return;
    }
    const isCycleWithDestinationNode = current === destinationNode && currentBranch.some((c) => c.to === destinationNode);
    if (isCycleWithDestinationNode) {
        return;
    }
    const isCycleWithCurrentNode = currentBranch.some((c) => c.to === current);
    if (isCycleWithCurrentNode) {
        for (const connection of currentBranch) {
            newGraph.addNodes(connection.from, connection.to);
            newGraph.addConnection(connection);
        }
        return;
    }
    for (const parentConnection of parentConnections) {
        if (parentConnection.type !== n8n_workflow_1.NodeConnectionTypes.Main) {
            continue;
        }
        findSubgraphRecursive(graph, destinationNode, parentConnection.from, trigger, newGraph, [
            ...currentBranch,
            parentConnection,
        ]);
    }
}
function findSubgraph(options) {
    const graph = options.graph;
    const destination = options.destination;
    const trigger = options.trigger;
    const subgraph = new directed_graph_1.DirectedGraph();
    findSubgraphRecursive(graph, destination, destination, trigger, subgraph, []);
    for (const node of subgraph.getNodes().values()) {
        const parentConnections = graph.getParentConnections(node);
        for (const connection of parentConnections) {
            if (connection.type === n8n_workflow_1.NodeConnectionTypes.Main) {
                continue;
            }
            subgraph.addNodes(connection.from, connection.to);
            subgraph.addConnection(connection);
        }
    }
    return subgraph;
}
//# sourceMappingURL=find-subgraph.js.map