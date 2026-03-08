"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIncomingData = getIncomingData;
exports.getIncomingDataFromAnyRun = getIncomingDataFromAnyRun;
function getIncomingData(runData, nodeName, runIndex, connectionType, outputIndex) {
    return runData[nodeName]?.at(runIndex)?.data?.[connectionType].at(outputIndex) ?? null;
}
function getRunIndexLength(runData, nodeName) {
    return runData[nodeName]?.length ?? 0;
}
function getIncomingDataFromAnyRun(runData, nodeName, connectionType, outputIndex) {
    const maxRunIndexes = getRunIndexLength(runData, nodeName);
    for (let runIndex = 0; runIndex < maxRunIndexes; runIndex++) {
        const data = getIncomingData(runData, nodeName, runIndex, connectionType, outputIndex);
        if (data && data.length > 0) {
            return { data, runIndex };
        }
    }
    return undefined;
}
//# sourceMappingURL=get-incoming-data.js.map