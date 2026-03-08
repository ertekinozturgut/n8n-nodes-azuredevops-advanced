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
exports.VersionNotificationsConfig = void 0;
const decorators_1 = require("../decorators");
let VersionNotificationsConfig = class VersionNotificationsConfig {
    constructor() {
        this.enabled = true;
        this.endpoint = 'https://api.n8n.io/api/versions/';
        this.whatsNewEnabled = true;
        this.whatsNewEndpoint = 'https://api.n8n.io/api/whats-new';
        this.infoUrl = 'https://docs.n8n.io/hosting/installation/updating/';
    }
};
exports.VersionNotificationsConfig = VersionNotificationsConfig;
__decorate([
    (0, decorators_1.Env)('N8N_VERSION_NOTIFICATIONS_ENABLED'),
    __metadata("design:type", Boolean)
], VersionNotificationsConfig.prototype, "enabled", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_VERSION_NOTIFICATIONS_ENDPOINT'),
    __metadata("design:type", String)
], VersionNotificationsConfig.prototype, "endpoint", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_VERSION_NOTIFICATIONS_WHATS_NEW_ENABLED'),
    __metadata("design:type", Boolean)
], VersionNotificationsConfig.prototype, "whatsNewEnabled", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_VERSION_NOTIFICATIONS_WHATS_NEW_ENDPOINT'),
    __metadata("design:type", String)
], VersionNotificationsConfig.prototype, "whatsNewEndpoint", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_VERSION_NOTIFICATIONS_INFO_URL'),
    __metadata("design:type", String)
], VersionNotificationsConfig.prototype, "infoUrl", void 0);
exports.VersionNotificationsConfig = VersionNotificationsConfig = __decorate([
    decorators_1.Config
], VersionNotificationsConfig);
//# sourceMappingURL=version-notifications.config.js.map