"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepMerge = deepMerge;
function isPlainObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}
function deepMerge(target, source) {
    if (source === null || source === undefined) {
        return isPlainObject(target) ? { ...target } : target;
    }
    if (target === null || target === undefined) {
        return source;
    }
    if (!isPlainObject(target) || !isPlainObject(source)) {
        return source;
    }
    const result = { ...target };
    const sourceRecord = source;
    for (const key of Object.keys(sourceRecord)) {
        const sourceValue = sourceRecord[key];
        const targetValue = result[key];
        if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
            result[key] = deepMerge(targetValue, sourceValue);
        }
        else {
            result[key] = sourceValue;
        }
    }
    return result;
}
//# sourceMappingURL=deep-merge.js.map