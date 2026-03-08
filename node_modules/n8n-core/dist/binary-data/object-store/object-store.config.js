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
exports.ObjectStoreConfig = void 0;
const config_1 = require("@n8n/config");
const zod_1 = require("zod");
const protocolSchema = zod_1.z.enum(['http', 'https']);
let ObjectStoreBucketConfig = class ObjectStoreBucketConfig {
    constructor() {
        this.name = '';
        this.region = '';
    }
};
__decorate([
    (0, config_1.Env)('N8N_EXTERNAL_STORAGE_S3_BUCKET_NAME'),
    __metadata("design:type", String)
], ObjectStoreBucketConfig.prototype, "name", void 0);
__decorate([
    (0, config_1.Env)('N8N_EXTERNAL_STORAGE_S3_BUCKET_REGION'),
    __metadata("design:type", String)
], ObjectStoreBucketConfig.prototype, "region", void 0);
ObjectStoreBucketConfig = __decorate([
    config_1.Config
], ObjectStoreBucketConfig);
let ObjectStoreCredentialsConfig = class ObjectStoreCredentialsConfig {
    constructor() {
        this.accessKey = '';
        this.accessSecret = '';
        this.authAutoDetect = false;
    }
};
__decorate([
    (0, config_1.Env)('N8N_EXTERNAL_STORAGE_S3_ACCESS_KEY'),
    __metadata("design:type", String)
], ObjectStoreCredentialsConfig.prototype, "accessKey", void 0);
__decorate([
    (0, config_1.Env)('N8N_EXTERNAL_STORAGE_S3_ACCESS_SECRET'),
    __metadata("design:type", String)
], ObjectStoreCredentialsConfig.prototype, "accessSecret", void 0);
__decorate([
    (0, config_1.Env)('N8N_EXTERNAL_STORAGE_S3_AUTH_AUTO_DETECT'),
    __metadata("design:type", Boolean)
], ObjectStoreCredentialsConfig.prototype, "authAutoDetect", void 0);
ObjectStoreCredentialsConfig = __decorate([
    config_1.Config
], ObjectStoreCredentialsConfig);
let ObjectStoreConfig = class ObjectStoreConfig {
    constructor() {
        this.host = '';
        this.protocol = 'https';
        this.bucket = {};
        this.credentials = {};
    }
};
exports.ObjectStoreConfig = ObjectStoreConfig;
__decorate([
    (0, config_1.Env)('N8N_EXTERNAL_STORAGE_S3_HOST'),
    __metadata("design:type", String)
], ObjectStoreConfig.prototype, "host", void 0);
__decorate([
    (0, config_1.Env)('N8N_EXTERNAL_STORAGE_S3_PROTOCOL', protocolSchema),
    __metadata("design:type", String)
], ObjectStoreConfig.prototype, "protocol", void 0);
__decorate([
    config_1.Nested,
    __metadata("design:type", ObjectStoreBucketConfig)
], ObjectStoreConfig.prototype, "bucket", void 0);
__decorate([
    config_1.Nested,
    __metadata("design:type", ObjectStoreCredentialsConfig)
], ObjectStoreConfig.prototype, "credentials", void 0);
exports.ObjectStoreConfig = ObjectStoreConfig = __decorate([
    config_1.Config
], ObjectStoreConfig);
//# sourceMappingURL=object-store.config.js.map