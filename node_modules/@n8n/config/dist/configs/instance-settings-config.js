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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceSettingsConfig = void 0;
const node_path_1 = __importDefault(require("node:path"));
const decorators_1 = require("../decorators");
const utils_1 = require("../utils/utils");
let InstanceSettingsConfig = class InstanceSettingsConfig {
    constructor() {
        this.enforceSettingsFilePermissions = false;
        this.encryptionKey = '';
        this.n8nFolder = (0, utils_1.getN8nFolder)();
        this.userHome = node_path_1.default.dirname(this.n8nFolder);
    }
};
exports.InstanceSettingsConfig = InstanceSettingsConfig;
__decorate([
    (0, decorators_1.Env)('N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS'),
    __metadata("design:type", Boolean)
], InstanceSettingsConfig.prototype, "enforceSettingsFilePermissions", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_ENCRYPTION_KEY'),
    __metadata("design:type", String)
], InstanceSettingsConfig.prototype, "encryptionKey", void 0);
exports.InstanceSettingsConfig = InstanceSettingsConfig = __decorate([
    decorators_1.Config,
    __metadata("design:paramtypes", [])
], InstanceSettingsConfig);
//# sourceMappingURL=instance-settings-config.js.map