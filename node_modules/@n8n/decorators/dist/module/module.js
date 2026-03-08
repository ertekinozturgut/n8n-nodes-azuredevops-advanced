"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendModule = void 0;
const di_1 = require("@n8n/di");
const module_metadata_1 = require("./module-metadata");
const BackendModule = (opts) => (target) => {
    di_1.Container.get(module_metadata_1.ModuleMetadata).register(opts.name, {
        class: target,
        licenseFlag: opts?.licenseFlag,
        instanceTypes: opts?.instanceTypes,
    });
    return (0, di_1.Service)()(target);
};
exports.BackendModule = BackendModule;
//# sourceMappingURL=module.js.map