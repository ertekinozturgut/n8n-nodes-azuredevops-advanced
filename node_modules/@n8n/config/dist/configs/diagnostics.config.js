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
exports.DiagnosticsConfig = void 0;
const decorators_1 = require("../decorators");
let PostHogConfig = class PostHogConfig {
    constructor() {
        this.apiKey = 'phc_4URIAm1uYfJO7j8kWSe0J8lc8IqnstRLS7Jx8NcakHo';
        this.apiHost = 'https://us.i.posthog.com';
    }
};
__decorate([
    (0, decorators_1.Env)('N8N_DIAGNOSTICS_POSTHOG_API_KEY'),
    __metadata("design:type", String)
], PostHogConfig.prototype, "apiKey", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_DIAGNOSTICS_POSTHOG_API_HOST'),
    __metadata("design:type", String)
], PostHogConfig.prototype, "apiHost", void 0);
PostHogConfig = __decorate([
    decorators_1.Config
], PostHogConfig);
let DiagnosticsConfig = class DiagnosticsConfig {
    constructor() {
        this.enabled = true;
        this.frontendConfig = '1zPn9bgWPzlQc0p8Gj1uiK6DOTn;https://telemetry.n8n.io';
        this.backendConfig = '1zPn7YoGC3ZXE9zLeTKLuQCB4F6;https://telemetry.n8n.io';
    }
};
exports.DiagnosticsConfig = DiagnosticsConfig;
__decorate([
    (0, decorators_1.Env)('N8N_DIAGNOSTICS_ENABLED'),
    __metadata("design:type", Boolean)
], DiagnosticsConfig.prototype, "enabled", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_DIAGNOSTICS_CONFIG_FRONTEND'),
    __metadata("design:type", String)
], DiagnosticsConfig.prototype, "frontendConfig", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_DIAGNOSTICS_CONFIG_BACKEND'),
    __metadata("design:type", String)
], DiagnosticsConfig.prototype, "backendConfig", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", PostHogConfig)
], DiagnosticsConfig.prototype, "posthogConfig", void 0);
exports.DiagnosticsConfig = DiagnosticsConfig = __decorate([
    decorators_1.Config
], DiagnosticsConfig);
//# sourceMappingURL=diagnostics.config.js.map