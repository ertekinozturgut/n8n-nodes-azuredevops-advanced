"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSourceDataGroups = getSourceDataGroups;
const n8n_workflow_1 = require("n8n-workflow");
function sortByInputIndexThenByName(connection1, connection2) {
    if (connection1.inputIndex === connection2.inputIndex) {
        return connection1.from.name.localeCompare(connection2.from.name);
    }
    else {
        return connection1.inputIndex - connection2.inputIndex;
    }
}
function newGroup() {
    return {
        complete: true,
        connections: [],
    };
}
function getSourceDataGroups(graph, node, runData, pinnedData) {
    const connections = graph.getConnections({ to: node });
    const sortedConnectionsWithData = [];
    const sortedConnectionsWithoutData = [];
    for (const connection of connections) {
        const hasData = runData[connection.from.name] || pinnedData[connection.from.name];
        if (hasData) {
            sortedConnectionsWithData.push(connection);
        }
        else if (connection.type === n8n_workflow_1.NodeConnectionTypes.Main) {
            sortedConnectionsWithoutData.push(connection);
        }
    }
    if (sortedConnectionsWithData.length === 0 && sortedConnectionsWithoutData.length === 0) {
        return [];
    }
    sortedConnectionsWithData.sort(sortByInputIndexThenByName);
    sortedConnectionsWithoutData.sort(sortByInputIndexThenByName);
    const groups = [];
    let currentGroup = newGroup();
    let currentInputIndex = Math.min(...sortedConnectionsWithData.map((c) => c.inputIndex), ...sortedConnectionsWithoutData.map((c) => c.inputIndex)) - 1;
    while (sortedConnectionsWithData.length > 0 || sortedConnectionsWithoutData.length > 0) {
        currentInputIndex++;
        const connectionWithDataIndex = sortedConnectionsWithData.findIndex((c) => c.inputIndex === currentInputIndex);
        if (connectionWithDataIndex >= 0) {
            const connection = sortedConnectionsWithData[connectionWithDataIndex];
            currentGroup.connections.push(connection);
            sortedConnectionsWithData.splice(connectionWithDataIndex, 1);
            continue;
        }
        const connectionWithoutDataIndex = sortedConnectionsWithoutData.findIndex((c) => c.inputIndex === currentInputIndex);
        if (connectionWithoutDataIndex >= 0) {
            const connection = sortedConnectionsWithoutData[connectionWithoutDataIndex];
            currentGroup.connections.push(connection);
            currentGroup.complete = false;
            sortedConnectionsWithoutData.splice(connectionWithoutDataIndex, 1);
            continue;
        }
        groups.push(currentGroup);
        currentGroup = newGroup();
        currentInputIndex =
            Math.min(...sortedConnectionsWithData.map((c) => c.inputIndex), ...sortedConnectionsWithoutData.map((c) => c.inputIndex)) - 1;
    }
    groups.push(currentGroup);
    return groups;
}
//# sourceMappingURL=get-source-data-groups.js.map