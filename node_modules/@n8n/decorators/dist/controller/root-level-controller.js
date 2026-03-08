"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootLevelController = void 0;
const di_1 = require("@n8n/di");
const controller_registry_metadata_1 = require("./controller-registry-metadata");
const RootLevelController = (basePath = '/') => (target) => {
    const metadata = di_1.Container.get(controller_registry_metadata_1.ControllerRegistryMetadata).getControllerMetadata(target);
    metadata.basePath = basePath;
    metadata.registerOnRootPath = true;
    return (0, di_1.Service)()(target);
};
exports.RootLevelController = RootLevelController;
//# sourceMappingURL=root-level-controller.js.map