"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiMainMetadata = exports.LEADER_STEPDOWN_EVENT_NAME = exports.LEADER_TAKEOVER_EVENT_NAME = void 0;
const di_1 = require("@n8n/di");
exports.LEADER_TAKEOVER_EVENT_NAME = 'leader-takeover';
exports.LEADER_STEPDOWN_EVENT_NAME = 'leader-stepdown';
let MultiMainMetadata = class MultiMainMetadata {
    constructor() {
        this.handlers = [];
    }
    register(handler) {
        this.handlers.push(handler);
    }
    getHandlers() {
        return this.handlers;
    }
};
exports.MultiMainMetadata = MultiMainMetadata;
exports.MultiMainMetadata = MultiMainMetadata = __decorate([
    (0, di_1.Service)()
], MultiMainMetadata);
//# sourceMappingURL=multi-main-metadata.js.map