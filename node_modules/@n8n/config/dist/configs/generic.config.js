"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericConfig = void 0;
const zod_1 = require("zod");
const decorators_1 = require("../decorators");
const releaseChannelSchema = zod_1.z.enum(['stable', 'beta', 'nightly', 'dev', 'rc']);
let GenericConfig = class GenericConfig {
    constructor() {
        this.timezone = 'America/New_York';
        this.releaseChannel = 'dev';
        this.gracefulShutdownTimeout = 30;
    }
};
exports.GenericConfig = GenericConfig;
__decorate([
    (0, decorators_1.Env)('GENERIC_TIMEZONE'),
    __metadata("design:type", String)
], GenericConfig.prototype, "timezone", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_RELEASE_TYPE', releaseChannelSchema),
    __metadata("design:type", String)
], GenericConfig.prototype, "releaseChannel", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_GRACEFUL_SHUTDOWN_TIMEOUT'),
    __metadata("design:type", Number)
], GenericConfig.prototype, "gracefulShutdownTimeout", void 0);
exports.GenericConfig = GenericConfig = __decorate([
    decorators_1.Config
], GenericConfig);
//# sourceMappingURL=generic.config.js.map