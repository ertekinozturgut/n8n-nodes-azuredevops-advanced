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
exports.HiringBannerConfig = void 0;
const decorators_1 = require("../decorators");
let HiringBannerConfig = class HiringBannerConfig {
    constructor() {
        this.enabled = true;
    }
};
exports.HiringBannerConfig = HiringBannerConfig;
__decorate([
    (0, decorators_1.Env)('N8N_HIRING_BANNER_ENABLED'),
    __metadata("design:type", Boolean)
], HiringBannerConfig.prototype, "enabled", void 0);
exports.HiringBannerConfig = HiringBannerConfig = __decorate([
    decorators_1.Config
], HiringBannerConfig);
//# sourceMappingURL=hiring-banner.config.js.map