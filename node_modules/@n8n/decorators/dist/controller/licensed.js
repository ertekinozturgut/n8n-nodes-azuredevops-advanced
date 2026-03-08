"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Licensed = void 0;
const di_1 = require("@n8n/di");
const controller_registry_metadata_1 = require("./controller-registry-metadata");
const Licensed = (licenseFeature) => (target, handlerName) => {
    const routeMetadata = di_1.Container.get(controller_registry_metadata_1.ControllerRegistryMetadata).getRouteMetadata(target.constructor, String(handlerName));
    routeMetadata.licenseFeature = licenseFeature;
};
exports.Licensed = Licensed;
//# sourceMappingURL=licensed.js.map