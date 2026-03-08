import type { Controller, ControllerMetadata, HandlerName, RouteMetadata } from './types';
export declare class ControllerRegistryMetadata {
    private registry;
    getControllerMetadata(controllerClass: Controller): ControllerMetadata;
    getRouteMetadata(controllerClass: Controller, handlerName: HandlerName): RouteMetadata;
    get controllerClasses(): MapIterator<Controller>;
}
