"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextEstablishmentHook = exports.ContextEstablishmentHookMetadata = void 0;
const di_1 = require("@n8n/di");
let ContextEstablishmentHookMetadata = class ContextEstablishmentHookMetadata {
    constructor() {
        this.contextEstablishmentHooks = new Set();
    }
    register(hookEntry) {
        this.contextEstablishmentHooks.add(hookEntry);
    }
    getEntries() {
        return [...this.contextEstablishmentHooks.entries()];
    }
    getClasses() {
        return [...this.contextEstablishmentHooks.values()].map((entry) => entry.class);
    }
};
exports.ContextEstablishmentHookMetadata = ContextEstablishmentHookMetadata;
exports.ContextEstablishmentHookMetadata = ContextEstablishmentHookMetadata = __decorate([
    (0, di_1.Service)()
], ContextEstablishmentHookMetadata);
const ContextEstablishmentHook = () => (target) => {
    di_1.Container.get(ContextEstablishmentHookMetadata).register({
        class: target,
    });
    return (0, di_1.Service)()(target);
};
exports.ContextEstablishmentHook = ContextEstablishmentHook;
//# sourceMappingURL=context-establishment-hook-metadata.js.map