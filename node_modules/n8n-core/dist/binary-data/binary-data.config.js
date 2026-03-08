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
exports.BinaryDataConfig = exports.BINARY_DATA_MODES = void 0;
const config_1 = require("@n8n/config");
const node_crypto_1 = require("node:crypto");
const node_path_1 = __importDefault(require("node:path"));
const zod_1 = require("zod");
const instance_settings_1 = require("../instance-settings");
exports.BINARY_DATA_MODES = ['default', 'filesystem', 's3', 'database'];
const binaryDataModesSchema = zod_1.z.enum(exports.BINARY_DATA_MODES);
const availableModesSchema = zod_1.z
    .string()
    .transform((value) => value.split(','))
    .pipe(binaryDataModesSchema.array());
const dbMaxFileSizeSchema = zod_1.z
    .number()
    .max(1024, 'Binary data max file size in `database` mode cannot exceed 1024 MiB');
let BinaryDataConfig = class BinaryDataConfig {
    constructor({ encryptionKey, n8nFolder }) {
        this.availableModes = ['filesystem'];
        this.mode = 'default';
        this.dbMaxFileSize = 512;
        this.localStoragePath = node_path_1.default.join(n8nFolder, 'binaryData');
        this.signingSecret = (0, node_crypto_1.createHash)('sha256')
            .update(`url-signing:${encryptionKey}`)
            .digest('base64');
    }
};
exports.BinaryDataConfig = BinaryDataConfig;
__decorate([
    (0, config_1.Env)('N8N_AVAILABLE_BINARY_DATA_MODES', availableModesSchema),
    __metadata("design:type", void 0)
], BinaryDataConfig.prototype, "availableModes", void 0);
__decorate([
    (0, config_1.Env)('N8N_DEFAULT_BINARY_DATA_MODE', binaryDataModesSchema),
    __metadata("design:type", void 0)
], BinaryDataConfig.prototype, "mode", void 0);
__decorate([
    (0, config_1.Env)('N8N_BINARY_DATA_STORAGE_PATH'),
    __metadata("design:type", String)
], BinaryDataConfig.prototype, "localStoragePath", void 0);
__decorate([
    (0, config_1.Env)('N8N_BINARY_DATA_SIGNING_SECRET'),
    __metadata("design:type", String)
], BinaryDataConfig.prototype, "signingSecret", void 0);
__decorate([
    (0, config_1.Env)('N8N_BINARY_DATA_DATABASE_MAX_FILE_SIZE', dbMaxFileSizeSchema),
    __metadata("design:type", Number)
], BinaryDataConfig.prototype, "dbMaxFileSize", void 0);
exports.BinaryDataConfig = BinaryDataConfig = __decorate([
    config_1.Config,
    __metadata("design:paramtypes", [instance_settings_1.InstanceSettings])
], BinaryDataConfig);
//# sourceMappingURL=binary-data.config.js.map