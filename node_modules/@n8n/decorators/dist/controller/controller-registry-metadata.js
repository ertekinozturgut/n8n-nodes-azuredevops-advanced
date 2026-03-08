"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerRegistryMetadata = void 0;
const di_1 = require("@n8n/di");
let ControllerRegistryMetadata = class ControllerRegistryMetadata {
    constructor() {
        this.registry = new Map();
    }
    getControllerMetadata(controllerClass) {
        let metadata = this.registry.get(controllerClass);
        if (!metadata) {
            metadata = {
                basePath: '/',
                registerOnRootPath: false,
                middlewares: [],
                routes: new Map(),
            };
            this.registry.set(controllerClass, metadata);
        }
        return metadata;
    }
    getRouteMetadata(controllerClass, handlerName) {
        const metadata = this.getControllerMetadata(controllerClass);
        let route = metadata.routes.get(handlerName);
        if (!route) {
            route = {};
            route.args = [];
            metadata.routes.set(handlerName, route);
        }
        return route;
    }
    get controllerClasses() {
        return this.registry.keys();
    }
};
exports.ControllerRegistryMetadata = ControllerRegistryMetadata;
exports.ControllerRegistryMetadata = ControllerRegistryMetadata = __decorate([
    (0, di_1.Service)()
], ControllerRegistryMetadata);
//# sourceMappingURL=controller-registry-metadata.js.map