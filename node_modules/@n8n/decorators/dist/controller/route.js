"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = exports.Head = exports.Delete = exports.Patch = exports.Put = exports.Post = exports.Get = void 0;
const di_1 = require("@n8n/di");
const controller_registry_metadata_1 = require("./controller-registry-metadata");
const RouteFactory = (method) => (path, options = {}) => (target, handlerName) => {
    const routeMetadata = di_1.Container.get(controller_registry_metadata_1.ControllerRegistryMetadata).getRouteMetadata(target.constructor, String(handlerName));
    routeMetadata.method = method;
    routeMetadata.path = path;
    routeMetadata.middlewares = options.middlewares ?? [];
    routeMetadata.usesTemplates = options.usesTemplates ?? false;
    routeMetadata.skipAuth = options.skipAuth ?? false;
    routeMetadata.allowSkipPreviewAuth = options.allowSkipPreviewAuth ?? false;
    routeMetadata.allowSkipMFA = options.allowSkipMFA ?? false;
    routeMetadata.apiKeyAuth = options.apiKeyAuth ?? false;
    routeMetadata.rateLimit = options.rateLimit;
};
exports.Get = RouteFactory('get');
exports.Post = RouteFactory('post');
exports.Put = RouteFactory('put');
exports.Patch = RouteFactory('patch');
exports.Delete = RouteFactory('delete');
exports.Head = RouteFactory('head');
exports.Options = RouteFactory('options');
//# sourceMappingURL=route.js.map