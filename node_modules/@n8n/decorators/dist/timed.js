"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timed = void 0;
const Timed = (logger, msg = 'Slow method call') => (options = {}) => (_target, propertyKey, descriptor) => {
    const originalMethod = descriptor.value;
    const thresholdMs = options.threshold ?? 100;
    const logArgs = options.logArgs ?? false;
    descriptor.value = async function (...args) {
        const methodName = `${this.constructor.name}.${String(propertyKey)}`;
        const start = performance.now();
        const result = await originalMethod.apply(this, args);
        const durationMs = performance.now() - start;
        if (durationMs > thresholdMs) {
            logger.warn(msg, {
                method: methodName,
                durationMs: Math.round(durationMs),
                thresholdMs,
                params: logArgs ? args : '[hidden]',
            });
        }
        return result;
    };
    return descriptor;
};
exports.Timed = Timed;
//# sourceMappingURL=timed.js.map