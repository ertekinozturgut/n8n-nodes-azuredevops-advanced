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
exports.LoggingConfig = exports.CronLoggingConfig = exports.LOG_SCOPES = void 0;
const zod_1 = require("zod");
const custom_types_1 = require("../custom-types");
const decorators_1 = require("../decorators");
exports.LOG_SCOPES = [
    'concurrency',
    'external-secrets',
    'license',
    'multi-main-setup',
    'pruning',
    'pubsub',
    'push',
    'redis',
    'scaling',
    'waiting-executions',
    'task-runner',
    'task-runner-js',
    'task-runner-py',
    'insights',
    'workflow-activation',
    'ssh-client',
    'data-table',
    'cron',
    'community-nodes',
    'legacy-sqlite-execution-recovery',
    'chat-hub',
    'breaking-changes',
    'circuit-breaker',
];
let CronLoggingConfig = class CronLoggingConfig {
    constructor() {
        this.activeInterval = 0;
    }
};
exports.CronLoggingConfig = CronLoggingConfig;
__decorate([
    (0, decorators_1.Env)('N8N_LOG_CRON_ACTIVE_INTERVAL'),
    __metadata("design:type", Number)
], CronLoggingConfig.prototype, "activeInterval", void 0);
exports.CronLoggingConfig = CronLoggingConfig = __decorate([
    decorators_1.Config
], CronLoggingConfig);
let FileLoggingConfig = class FileLoggingConfig {
    constructor() {
        this.fileCountMax = 100;
        this.fileSizeMax = 16;
        this.location = 'logs/n8n.log';
    }
};
__decorate([
    (0, decorators_1.Env)('N8N_LOG_FILE_COUNT_MAX'),
    __metadata("design:type", Number)
], FileLoggingConfig.prototype, "fileCountMax", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_LOG_FILE_SIZE_MAX'),
    __metadata("design:type", Number)
], FileLoggingConfig.prototype, "fileSizeMax", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_LOG_FILE_LOCATION'),
    __metadata("design:type", String)
], FileLoggingConfig.prototype, "location", void 0);
FileLoggingConfig = __decorate([
    decorators_1.Config
], FileLoggingConfig);
const logLevelSchema = zod_1.z.enum(['error', 'warn', 'info', 'debug', 'silent']);
let LoggingConfig = class LoggingConfig {
    constructor() {
        this.level = 'info';
        this.outputs = ['console'];
        this.format = 'text';
        this.scopes = [];
    }
};
exports.LoggingConfig = LoggingConfig;
__decorate([
    (0, decorators_1.Env)('N8N_LOG_LEVEL', logLevelSchema),
    __metadata("design:type", String)
], LoggingConfig.prototype, "level", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_LOG_OUTPUT'),
    __metadata("design:type", custom_types_1.CommaSeparatedStringArray)
], LoggingConfig.prototype, "outputs", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_LOG_FORMAT'),
    __metadata("design:type", String)
], LoggingConfig.prototype, "format", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", FileLoggingConfig)
], LoggingConfig.prototype, "file", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", CronLoggingConfig)
], LoggingConfig.prototype, "cron", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_LOG_SCOPES'),
    __metadata("design:type", custom_types_1.CommaSeparatedStringArray)
], LoggingConfig.prototype, "scopes", void 0);
exports.LoggingConfig = LoggingConfig = __decorate([
    decorators_1.Config
], LoggingConfig);
//# sourceMappingURL=logging.config.js.map