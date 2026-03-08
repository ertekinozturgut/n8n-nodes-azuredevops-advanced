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
exports.LicenseConfig = void 0;
const decorators_1 = require("../decorators");
let LicenseConfig = class LicenseConfig {
    constructor() {
        this.serverUrl = 'https://license.n8n.io/v1';
        this.autoRenewalEnabled = true;
        this.activationKey = '';
        this.detachFloatingOnShutdown = true;
        this.tenantId = 1;
        this.cert = '';
    }
};
exports.LicenseConfig = LicenseConfig;
__decorate([
    (0, decorators_1.Env)('N8N_LICENSE_SERVER_URL'),
    __metadata("design:type", String)
], LicenseConfig.prototype, "serverUrl", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_LICENSE_AUTO_RENEW_ENABLED'),
    __metadata("design:type", Boolean)
], LicenseConfig.prototype, "autoRenewalEnabled", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_LICENSE_ACTIVATION_KEY'),
    __metadata("design:type", String)
], LicenseConfig.prototype, "activationKey", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_LICENSE_DETACH_FLOATING_ON_SHUTDOWN'),
    __metadata("design:type", Boolean)
], LicenseConfig.prototype, "detachFloatingOnShutdown", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_LICENSE_TENANT_ID'),
    __metadata("design:type", Number)
], LicenseConfig.prototype, "tenantId", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_LICENSE_CERT'),
    __metadata("design:type", String)
], LicenseConfig.prototype, "cert", void 0);
exports.LicenseConfig = LicenseConfig = __decorate([
    decorators_1.Config
], LicenseConfig);
//# sourceMappingURL=license.config.js.map