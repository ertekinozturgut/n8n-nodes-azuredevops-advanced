"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnJsonArray = returnJsonArray;
function returnJsonArray(jsonData) {
    const returnData = [];
    if (!Array.isArray(jsonData)) {
        jsonData = [jsonData];
    }
    jsonData.forEach((data) => {
        if (data?.json) {
            returnData.push({ ...data, json: data.json });
        }
        else {
            returnData.push({ json: data });
        }
    });
    return returnData;
}
//# sourceMappingURL=return-json-array.js.map