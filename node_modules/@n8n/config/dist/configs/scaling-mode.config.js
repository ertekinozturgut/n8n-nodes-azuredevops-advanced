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
exports.ScalingModeConfig = void 0;
const decorators_1 = require("../decorators");
let HealthConfig = class HealthConfig {
    constructor() {
        this.active = false;
        this.port = 5678;
        this.address = '::';
    }
};
__decorate([
    (0, decorators_1.Env)('QUEUE_HEALTH_CHECK_ACTIVE'),
    __metadata("design:type", Boolean)
], HealthConfig.prototype, "active", void 0);
__decorate([
    (0, decorators_1.Env)('QUEUE_HEALTH_CHECK_PORT'),
    __metadata("design:type", Number)
], HealthConfig.prototype, "port", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_WORKER_SERVER_ADDRESS'),
    __metadata("design:type", String)
], HealthConfig.prototype, "address", void 0);
HealthConfig = __decorate([
    decorators_1.Config
], HealthConfig);
let RedisConfig = class RedisConfig {
    constructor() {
        this.db = 0;
        this.host = 'localhost';
        this.password = '';
        this.port = 6379;
        this.timeoutThreshold = 10_000;
        this.username = '';
        this.clusterNodes = '';
        this.tls = false;
        this.dualStack = false;
    }
};
__decorate([
    (0, decorators_1.Env)('QUEUE_BULL_REDIS_DB'),
    __metadata("design:type", Number)
], RedisConfig.prototype, "db", void 0);
__decorate([
    (0, decorators_1.Env)('QUEUE_BULL_REDIS_HOST'),
    __metadata("design:type", String)
], RedisConfig.prototype, "host", void 0);
__decorate([
    (0, decorators_1.Env)('QUEUE_BULL_REDIS_PASSWORD'),
    __metadata("design:type", String)
], RedisConfig.prototype, "password", void 0);
__decorate([
    (0, decorators_1.Env)('QUEUE_BULL_REDIS_PORT'),
    __metadata("design:type", Number)
], RedisConfig.prototype, "port", void 0);
__decorate([
    (0, decorators_1.Env)('QUEUE_BULL_REDIS_TIMEOUT_THRESHOLD'),
    __metadata("design:type", Number)
], RedisConfig.prototype, "timeoutThreshold", void 0);
__decorate([
    (0, decorators_1.Env)('QUEUE_BULL_REDIS_USERNAME'),
    __metadata("design:type", String)
], RedisConfig.prototype, "username", void 0);
__decorate([
    (0, decorators_1.Env)('QUEUE_BULL_REDIS_CLUSTER_NODES'),
    __metadata("design:type", String)
], RedisConfig.prototype, "clusterNodes", void 0);
__decorate([
    (0, decorators_1.Env)('QUEUE_BULL_REDIS_TLS'),
    __metadata("design:type", Boolean)
], RedisConfig.prototype, "tls", void 0);
__decorate([
    (0, decorators_1.Env)('QUEUE_BULL_REDIS_DUALSTACK'),
    __metadata("design:type", Boolean)
], RedisConfig.prototype, "dualStack", void 0);
RedisConfig = __decorate([
    decorators_1.Config
], RedisConfig);
let SettingsConfig = class SettingsConfig {
    constructor() {
        this.lockDuration = 60_000;
        this.lockRenewTime = 10_000;
        this.stalledInterval = 30_000;
        this.maxStalledCount = 1;
    }
};
__decorate([
    (0, decorators_1.Env)('QUEUE_WORKER_LOCK_DURATION'),
    __metadata("design:type", Number)
], SettingsConfig.prototype, "lockDuration", void 0);
__decorate([
    (0, decorators_1.Env)('QUEUE_WORKER_LOCK_RENEW_TIME'),
    __metadata("design:type", Number)
], SettingsConfig.prototype, "lockRenewTime", void 0);
__decorate([
    (0, decorators_1.Env)('QUEUE_WORKER_STALLED_INTERVAL'),
    __metadata("design:type", Number)
], SettingsConfig.prototype, "stalledInterval", void 0);
__decorate([
    (0, decorators_1.Env)('QUEUE_WORKER_MAX_STALLED_COUNT'),
    __metadata("design:type", Number)
], SettingsConfig.prototype, "maxStalledCount", void 0);
SettingsConfig = __decorate([
    decorators_1.Config
], SettingsConfig);
let BullConfig = class BullConfig {
    constructor() {
        this.prefix = 'bull';
        this.gracefulShutdownTimeout = 30;
    }
};
__decorate([
    (0, decorators_1.Env)('QUEUE_BULL_PREFIX'),
    __metadata("design:type", String)
], BullConfig.prototype, "prefix", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", RedisConfig)
], BullConfig.prototype, "redis", void 0);
__decorate([
    (0, decorators_1.Env)('QUEUE_WORKER_TIMEOUT'),
    __metadata("design:type", Number)
], BullConfig.prototype, "gracefulShutdownTimeout", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", SettingsConfig)
], BullConfig.prototype, "settings", void 0);
BullConfig = __decorate([
    decorators_1.Config
], BullConfig);
let ScalingModeConfig = class ScalingModeConfig {
};
exports.ScalingModeConfig = ScalingModeConfig;
__decorate([
    decorators_1.Nested,
    __metadata("design:type", HealthConfig)
], ScalingModeConfig.prototype, "health", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", BullConfig)
], ScalingModeConfig.prototype, "bull", void 0);
exports.ScalingModeConfig = ScalingModeConfig = __decorate([
    decorators_1.Config
], ScalingModeConfig);
//# sourceMappingURL=scaling-mode.config.js.map