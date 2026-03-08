"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructExecutionMetaData = constructExecutionMetaData;
function constructExecutionMetaData(inputData, options) {
    const { itemData } = options;
    return inputData.map((data) => {
        const { json, ...rest } = data;
        return { json, pairedItem: itemData, ...rest };
    });
}
//# sourceMappingURL=construct-execution-metadata.js.map