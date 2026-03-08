"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandMetadata = void 0;
const di_1 = require("@n8n/di");
let CommandMetadata = class CommandMetadata {
    constructor() {
        this.commands = new Map();
    }
    register(name, entry) {
        this.commands.set(name, entry);
    }
    get(name) {
        return this.commands.get(name);
    }
    getEntries() {
        return [...this.commands.entries()];
    }
};
exports.CommandMetadata = CommandMetadata;
exports.CommandMetadata = CommandMetadata = __decorate([
    (0, di_1.Service)()
], CommandMetadata);
//# sourceMappingURL=command-metadata.js.map