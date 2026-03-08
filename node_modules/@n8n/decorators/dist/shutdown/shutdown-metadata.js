"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShutdownMetadata = void 0;
const di_1 = require("@n8n/di");
const n8n_workflow_1 = require("n8n-workflow");
const constants_1 = require("./constants");
let ShutdownMetadata = class ShutdownMetadata {
    constructor() {
        this.handlersByPriority = [];
    }
    register(priority, handler) {
        if (priority < constants_1.LOWEST_SHUTDOWN_PRIORITY || priority > constants_1.HIGHEST_SHUTDOWN_PRIORITY) {
            throw new n8n_workflow_1.UserError(`Invalid shutdown priority. Please set it between ${constants_1.LOWEST_SHUTDOWN_PRIORITY} and ${constants_1.HIGHEST_SHUTDOWN_PRIORITY}.`, { extra: { priority } });
        }
        if (!this.handlersByPriority[priority])
            this.handlersByPriority[priority] = [];
        this.handlersByPriority[priority].push(handler);
    }
    getHandlersByPriority() {
        return this.handlersByPriority;
    }
    clear() {
        this.handlersByPriority = [];
    }
};
exports.ShutdownMetadata = ShutdownMetadata;
exports.ShutdownMetadata = ShutdownMetadata = __decorate([
    (0, di_1.Service)()
], ShutdownMetadata);
//# sourceMappingURL=shutdown-metadata.js.map