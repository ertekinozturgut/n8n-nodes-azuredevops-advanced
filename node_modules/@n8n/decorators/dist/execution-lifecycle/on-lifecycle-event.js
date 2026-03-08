"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnLifecycleEvent = void 0;
const di_1 = require("@n8n/di");
const lifecycle_metadata_1 = require("./lifecycle-metadata");
const errors_1 = require("../errors");
const OnLifecycleEvent = (eventName) => (prototype, propertyKey, descriptor) => {
    const handlerClass = prototype.constructor;
    const methodName = String(propertyKey);
    if (typeof descriptor?.value !== 'function') {
        throw new errors_1.NonMethodError(`${handlerClass.name}.${methodName}()`);
    }
    di_1.Container.get(lifecycle_metadata_1.LifecycleMetadata).register({
        handlerClass,
        methodName,
        eventName,
    });
};
exports.OnLifecycleEvent = OnLifecycleEvent;
//# sourceMappingURL=on-lifecycle-event.js.map