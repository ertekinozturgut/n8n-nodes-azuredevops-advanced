"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJsonCompatible = isJsonCompatible;
const check = (val, path = 'value', stack = new Set(), keysToIgnore = new Set()) => {
    const type = typeof val;
    if (val === null || type === 'boolean' || type === 'string' || type === 'undefined') {
        return { isValid: true };
    }
    if (type === 'number') {
        if (!Number.isFinite(val)) {
            return {
                isValid: false,
                errorPath: path,
                errorMessage: `is ${val}, which is not JSON-compatible`,
            };
        }
        return { isValid: true };
    }
    if (type === 'function' || type === 'symbol' || type === 'bigint') {
        return {
            isValid: false,
            errorPath: path,
            errorMessage: `is a ${type}, which is not JSON-compatible`,
        };
    }
    if (Array.isArray(val)) {
        if (stack.has(val)) {
            return {
                isValid: false,
                errorPath: path,
                errorMessage: 'contains a circular reference',
            };
        }
        stack.add(val);
        for (let i = 0; i < val.length; i++) {
            const result = check(val[i], `${path}[${i}]`, stack, keysToIgnore);
            if (!result.isValid)
                return result;
        }
        stack.delete(val);
        return { isValid: true };
    }
    if (stack.has(val)) {
        return {
            isValid: false,
            errorPath: path,
            errorMessage: 'contains a circular reference',
        };
    }
    stack.add(val);
    const proto = Object.getPrototypeOf(val);
    if (proto !== Object.prototype && proto !== null) {
        return {
            isValid: false,
            errorPath: path,
            errorMessage: `has non-plain prototype (${proto?.constructor?.name || 'unknown'})`,
        };
    }
    for (const key of Reflect.ownKeys(val)) {
        if (typeof key === 'symbol') {
            return {
                isValid: false,
                errorPath: `${path}.${key.toString()}`,
                errorMessage: `has a symbol key (${String(key)}), which is not JSON-compatible`,
            };
        }
        if (keysToIgnore.has(key)) {
            continue;
        }
        const subVal = val[key];
        const result = check(subVal, `${path}.${key}`, stack, keysToIgnore);
        if (!result.isValid)
            return result;
    }
    stack.delete(val);
    return { isValid: true };
};
function isJsonCompatible(value, keysToIgnore = new Set()) {
    return check(value, undefined, undefined, keysToIgnore);
}
//# sourceMappingURL=is-json-compatible.js.map