"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnShutdown = void 0;
const di_1 = require("@n8n/di");
const n8n_workflow_1 = require("n8n-workflow");
const constants_1 = require("./constants");
const shutdown_metadata_1 = require("./shutdown-metadata");
const OnShutdown = (priority = constants_1.DEFAULT_SHUTDOWN_PRIORITY) => (prototype, propertyKey, descriptor) => {
    const serviceClass = prototype.constructor;
    const methodName = String(propertyKey);
    if (typeof descriptor?.value === 'function') {
        di_1.Container.get(shutdown_metadata_1.ShutdownMetadata).register(priority, { serviceClass, methodName });
    }
    else {
        const name = `${serviceClass.name}.${methodName}()`;
        throw new n8n_workflow_1.UnexpectedError(`${name} must be a method on ${serviceClass.name} to use "OnShutdown"`);
    }
};
exports.OnShutdown = OnShutdown;
//# sourceMappingURL=on-shutdown.js.map