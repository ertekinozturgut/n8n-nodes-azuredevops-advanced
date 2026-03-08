"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnPubSubEvent = void 0;
const di_1 = require("@n8n/di");
const pubsub_metadata_1 = require("./pubsub-metadata");
const errors_1 = require("../errors");
const OnPubSubEvent = (eventName, filter) => (prototype, propertyKey, descriptor) => {
    const eventHandlerClass = prototype.constructor;
    const methodName = String(propertyKey);
    if (typeof descriptor?.value !== 'function') {
        throw new errors_1.NonMethodError(`${eventHandlerClass.name}.${methodName}()`);
    }
    di_1.Container.get(pubsub_metadata_1.PubSubMetadata).register({
        eventHandlerClass,
        methodName,
        eventName,
        filter,
    });
};
exports.OnPubSubEvent = OnPubSubEvent;
//# sourceMappingURL=on-pubsub-event.js.map