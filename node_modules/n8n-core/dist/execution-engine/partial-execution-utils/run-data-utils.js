"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextExecutionIndex = getNextExecutionIndex;
function getNextExecutionIndex(runData = {}) {
    if (!runData || Object.keys(runData).length === 0)
        return 0;
    const previousIndices = Object.values(runData)
        .flat()
        .map((taskData) => taskData.executionIndex)
        .filter((value) => typeof value === 'number');
    if (previousIndices.length === 0)
        return 0;
    return Math.max(...previousIndices) + 1;
}
//# sourceMappingURL=run-data-utils.js.map