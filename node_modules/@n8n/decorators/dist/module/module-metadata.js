"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleMetadata = void 0;
const di_1 = require("@n8n/di");
let ModuleMetadata = class ModuleMetadata {
    constructor() {
        this.modules = new Map();
    }
    register(moduleName, moduleEntry) {
        this.modules.set(moduleName, moduleEntry);
    }
    get(moduleName) {
        return this.modules.get(moduleName);
    }
    getEntries() {
        return [...this.modules.entries()];
    }
    getClasses() {
        return [...this.modules.values()].map((entry) => entry.class);
    }
};
exports.ModuleMetadata = ModuleMetadata;
exports.ModuleMetadata = ModuleMetadata = __decorate([
    (0, di_1.Service)()
], ModuleMetadata);
//# sourceMappingURL=module-metadata.js.map