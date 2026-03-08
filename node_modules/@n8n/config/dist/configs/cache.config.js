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
exports.CacheConfig = void 0;
const zod_1 = require("zod");
const decorators_1 = require("../decorators");
const cacheBackendSchema = zod_1.z.enum(['memory', 'redis', 'auto']);
let MemoryConfig = class MemoryConfig {
    constructor() {
        this.maxSize = 3 * 1024 * 1024;
        this.ttl = 3600 * 1000;
    }
};
__decorate([
    (0, decorators_1.Env)('N8N_CACHE_MEMORY_MAX_SIZE'),
    __metadata("design:type", Number)
], MemoryConfig.prototype, "maxSize", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_CACHE_MEMORY_TTL'),
    __metadata("design:type", Number)
], MemoryConfig.prototype, "ttl", void 0);
MemoryConfig = __decorate([
    decorators_1.Config
], MemoryConfig);
let RedisConfig = class RedisConfig {
    constructor() {
        this.prefix = 'cache';
        this.ttl = 3600 * 1000;
    }
};
__decorate([
    (0, decorators_1.Env)('N8N_CACHE_REDIS_KEY_PREFIX'),
    __metadata("design:type", String)
], RedisConfig.prototype, "prefix", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_CACHE_REDIS_TTL'),
    __metadata("design:type", Number)
], RedisConfig.prototype, "ttl", void 0);
RedisConfig = __decorate([
    decorators_1.Config
], RedisConfig);
let CacheConfig = class CacheConfig {
    constructor() {
        this.backend = 'auto';
    }
};
exports.CacheConfig = CacheConfig;
__decorate([
    (0, decorators_1.Env)('N8N_CACHE_BACKEND', cacheBackendSchema),
    __metadata("design:type", String)
], CacheConfig.prototype, "backend", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", MemoryConfig)
], CacheConfig.prototype, "memory", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", RedisConfig)
], CacheConfig.prototype, "redis", void 0);
exports.CacheConfig = CacheConfig = __decorate([
    decorators_1.Config
], CacheConfig);
//# sourceMappingURL=cache.config.js.map