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
exports.AuthConfig = void 0;
const zod_1 = require("zod");
const decorators_1 = require("../decorators");
const samesiteSchema = zod_1.z.enum(['strict', 'lax', 'none']);
let CookieConfig = class CookieConfig {
    constructor() {
        this.secure = true;
        this.samesite = 'lax';
    }
};
__decorate([
    (0, decorators_1.Env)('N8N_SECURE_COOKIE'),
    __metadata("design:type", Boolean)
], CookieConfig.prototype, "secure", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_SAMESITE_COOKIE', samesiteSchema),
    __metadata("design:type", String)
], CookieConfig.prototype, "samesite", void 0);
CookieConfig = __decorate([
    decorators_1.Config
], CookieConfig);
let AuthConfig = class AuthConfig {
};
exports.AuthConfig = AuthConfig;
__decorate([
    decorators_1.Nested,
    __metadata("design:type", CookieConfig)
], AuthConfig.prototype, "cookie", void 0);
exports.AuthConfig = AuthConfig = __decorate([
    decorators_1.Config
], AuthConfig);
//# sourceMappingURL=auth.config.js.map