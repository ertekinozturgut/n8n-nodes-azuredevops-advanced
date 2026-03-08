"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupParameterData = cleanupParameterData;
const luxon_1 = require("luxon");
function cleanupParameterData(inputData) {
    if (typeof inputData !== 'object' || inputData === null) {
        return;
    }
    if (Array.isArray(inputData)) {
        inputData.forEach((value) => cleanupParameterData(value));
        return;
    }
    if (typeof inputData === 'object') {
        Object.keys(inputData).forEach((key) => {
            const value = inputData[key];
            if (typeof value === 'object') {
                if (luxon_1.DateTime.isDateTime(value)) {
                    inputData[key] = value.toString();
                }
                else {
                    cleanupParameterData(value);
                }
            }
        });
    }
}
//# sourceMappingURL=cleanup-parameter-data.js.map