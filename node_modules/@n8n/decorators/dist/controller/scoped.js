"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectScope = exports.GlobalScope = void 0;
const di_1 = require("@n8n/di");
const controller_registry_metadata_1 = require("./controller-registry-metadata");
const Scoped = (scope, { globalOnly } = { globalOnly: false }) => (target, handlerName) => {
    const routeMetadata = di_1.Container.get(controller_registry_metadata_1.ControllerRegistryMetadata).getRouteMetadata(target.constructor, String(handlerName));
    routeMetadata.accessScope = { scope, globalOnly };
};
const GlobalScope = (scope) => Scoped(scope, { globalOnly: true });
exports.GlobalScope = GlobalScope;
const ProjectScope = (scope) => Scoped(scope);
exports.ProjectScope = ProjectScope;
//# sourceMappingURL=scoped.js.map