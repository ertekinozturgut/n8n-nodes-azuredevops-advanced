"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnLeaderStepdown = exports.OnLeaderTakeover = void 0;
const di_1 = require("@n8n/di");
const multi_main_metadata_1 = require("./multi-main-metadata");
const errors_1 = require("../errors");
const OnMultiMainEvent = (eventName) => (prototype, propertyKey, descriptor) => {
    const eventHandlerClass = prototype.constructor;
    const methodName = String(propertyKey);
    if (typeof descriptor?.value !== 'function') {
        throw new errors_1.NonMethodError(`${eventHandlerClass.name}.${methodName}()`);
    }
    di_1.Container.get(multi_main_metadata_1.MultiMainMetadata).register({
        eventHandlerClass,
        methodName,
        eventName,
    });
};
const OnLeaderTakeover = () => OnMultiMainEvent(multi_main_metadata_1.LEADER_TAKEOVER_EVENT_NAME);
exports.OnLeaderTakeover = OnLeaderTakeover;
const OnLeaderStepdown = () => OnMultiMainEvent(multi_main_metadata_1.LEADER_STEPDOWN_EVENT_NAME);
exports.OnLeaderStepdown = OnLeaderStepdown;
//# sourceMappingURL=on-multi-main-event.js.map