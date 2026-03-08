"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeItems = normalizeItems;
const errors_1 = require("@n8n/errors");
function normalizeItems(executionData) {
    if (typeof executionData === 'object' && !Array.isArray(executionData)) {
        executionData = executionData.json ? [executionData] : [{ json: executionData }];
    }
    if (executionData.every((item) => typeof item === 'object' && 'json' in item))
        return executionData;
    if (executionData.some((item) => typeof item === 'object' && 'json' in item)) {
        throw new errors_1.ApplicationError('Inconsistent item format');
    }
    if (executionData.every((item) => typeof item === 'object' && 'binary' in item)) {
        const normalizedItems = [];
        executionData.forEach((item) => {
            const json = Object.keys(item).reduce((acc, key) => {
                if (key === 'binary')
                    return acc;
                return { ...acc, [key]: item[key] };
            }, {});
            normalizedItems.push({
                json,
                binary: item.binary,
            });
        });
        return normalizedItems;
    }
    if (executionData.some((item) => typeof item === 'object' && 'binary' in item)) {
        throw new errors_1.ApplicationError('Inconsistent item format');
    }
    return executionData.map((item) => {
        return { json: item };
    });
}
//# sourceMappingURL=normalize-items.js.map