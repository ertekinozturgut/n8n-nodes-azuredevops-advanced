"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
const di_1 = require("@n8n/di");
const controller_registry_metadata_1 = require("./controller-registry-metadata");
const Middleware = () => (target, handlerName) => {
    const metadata = di_1.Container.get(controller_registry_metadata_1.ControllerRegistryMetadata).getControllerMetadata(target.constructor);
    metadata.middlewares.push(String(handlerName));
};
exports.Middleware = Middleware;
//# sourceMappingURL=middleware.js.map