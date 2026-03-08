"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Param = exports.Query = exports.Body = void 0;
const di_1 = require("@n8n/di");
const controller_registry_metadata_1 = require("./controller-registry-metadata");
const ArgDecorator = (arg) => (target, handlerName, parameterIndex) => {
    const routeMetadata = di_1.Container.get(controller_registry_metadata_1.ControllerRegistryMetadata).getRouteMetadata(target.constructor, String(handlerName));
    routeMetadata.args[parameterIndex] = arg;
};
exports.Body = ArgDecorator({ type: 'body' });
exports.Query = ArgDecorator({ type: 'query' });
const Param = (key) => ArgDecorator({ type: 'param', key });
exports.Param = Param;
//# sourceMappingURL=args.js.map