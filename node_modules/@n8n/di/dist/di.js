"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
exports.Service = Service;
require("reflect-metadata");
const instances = new Map();
function Service({ factory } = {}) {
    return function (target) {
        instances.set(target, { factory });
        return target;
    };
}
class DIError extends Error {
    constructor(message) {
        super(`[DI] ${message}`);
    }
}
class ContainerClass {
    constructor() {
        this.resolutionStack = [];
    }
    has(type) {
        return instances.has(type);
    }
    get(type) {
        const { resolutionStack } = this;
        const metadata = instances.get(type);
        if (!metadata) {
            if (resolutionStack.length)
                return undefined;
            throw new DIError(`${type.name} is not decorated with ${Service.name}`);
        }
        if (metadata?.instance)
            return metadata.instance;
        resolutionStack.push(type);
        try {
            let instance;
            const paramTypes = (Reflect.getMetadata('design:paramtypes', type) ?? []);
            const dependencies = paramTypes.map((paramType, index) => {
                if (paramType === undefined) {
                    throw new DIError(`Circular dependency detected in ${type.name} at index ${index}.\n${resolutionStack.map((t) => t.name).join(' -> ')}\n`);
                }
                return this.get(paramType);
            });
            if (metadata?.factory) {
                instance = metadata.factory(...dependencies);
            }
            else {
                instance = new type(...dependencies);
            }
            instances.set(type, { ...metadata, instance });
            return instance;
        }
        catch (error) {
            if (error instanceof TypeError && error.message.toLowerCase().includes('abstract')) {
                throw new DIError(`${type.name} is an abstract class, and cannot be instantiated`);
            }
            throw error;
        }
        finally {
            resolutionStack.pop();
        }
    }
    set(type, instance) {
        const metadata = instances.get(type) ?? {};
        instances.set(type, { ...metadata, instance });
    }
    reset() {
        for (const metadata of instances.values()) {
            delete metadata.instance;
        }
    }
}
exports.Container = new ContainerClass();
//# sourceMappingURL=di.js.map