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
exports.ModulesConfig = exports.MODULE_NAMES = void 0;
const config_1 = require("@n8n/config");
const unknown_module_error_1 = require("./errors/unknown-module.error");
exports.MODULE_NAMES = [
    'insights',
    'external-secrets',
    'community-packages',
    'data-table',
    'mcp',
    'chat-hub',
    'provisioning',
    'breaking-changes',
];
class ModuleArray extends config_1.CommaSeparatedStringArray {
    constructor(str) {
        super(str);
        for (const moduleName of this) {
            if (!exports.MODULE_NAMES.includes(moduleName))
                throw new unknown_module_error_1.UnknownModuleError(moduleName);
        }
    }
}
let ModulesConfig = class ModulesConfig {
    constructor() {
        this.enabledModules = [];
        this.disabledModules = [];
    }
};
exports.ModulesConfig = ModulesConfig;
__decorate([
    (0, config_1.Env)('N8N_ENABLED_MODULES'),
    __metadata("design:type", ModuleArray)
], ModulesConfig.prototype, "enabledModules", void 0);
__decorate([
    (0, config_1.Env)('N8N_DISABLED_MODULES'),
    __metadata("design:type", ModuleArray)
], ModulesConfig.prototype, "disabledModules", void 0);
exports.ModulesConfig = ModulesConfig = __decorate([
    config_1.Config
], ModulesConfig);
//# sourceMappingURL=modules.config.js.map