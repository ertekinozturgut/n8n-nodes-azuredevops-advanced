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
exports.PublicApiConfig = void 0;
const decorators_1 = require("../decorators");
let PublicApiConfig = class PublicApiConfig {
    constructor() {
        this.disabled = false;
        this.path = 'api';
        this.swaggerUiDisabled = false;
    }
};
exports.PublicApiConfig = PublicApiConfig;
__decorate([
    (0, decorators_1.Env)('N8N_PUBLIC_API_DISABLED'),
    __metadata("design:type", Boolean)
], PublicApiConfig.prototype, "disabled", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_PUBLIC_API_ENDPOINT'),
    __metadata("design:type", String)
], PublicApiConfig.prototype, "path", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_PUBLIC_API_SWAGGERUI_DISABLED'),
    __metadata("design:type", Boolean)
], PublicApiConfig.prototype, "swaggerUiDisabled", void 0);
exports.PublicApiConfig = PublicApiConfig = __decorate([
    decorators_1.Config
], PublicApiConfig);
//# sourceMappingURL=public-api.config.js.map