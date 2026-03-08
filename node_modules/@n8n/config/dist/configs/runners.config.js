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
exports.TaskRunnersConfig = void 0;
const zod_1 = require("zod");
const decorators_1 = require("../decorators");
const runnerModeSchema = zod_1.z.enum(['internal', 'external']);
let TaskRunnersConfig = class TaskRunnersConfig {
    constructor() {
        this.enabled = false;
        this.mode = 'internal';
        this.path = '/runners';
        this.authToken = '';
        this.port = 5679;
        this.listenAddress = '127.0.0.1';
        this.maxPayload = 1024 * 1024 * 1024;
        this.maxOldSpaceSize = '';
        this.maxConcurrency = 10;
        this.taskTimeout = 300;
        this.taskRequestTimeout = 60;
        this.heartbeatInterval = 30;
        this.insecureMode = false;
        this.isNativePythonRunnerEnabled = false;
    }
};
exports.TaskRunnersConfig = TaskRunnersConfig;
__decorate([
    (0, decorators_1.Env)('N8N_RUNNERS_ENABLED'),
    __metadata("design:type", Boolean)
], TaskRunnersConfig.prototype, "enabled", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_RUNNERS_MODE', runnerModeSchema),
    __metadata("design:type", String)
], TaskRunnersConfig.prototype, "mode", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_RUNNERS_PATH'),
    __metadata("design:type", String)
], TaskRunnersConfig.prototype, "path", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_RUNNERS_AUTH_TOKEN'),
    __metadata("design:type", String)
], TaskRunnersConfig.prototype, "authToken", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_RUNNERS_BROKER_PORT'),
    __metadata("design:type", Number)
], TaskRunnersConfig.prototype, "port", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_RUNNERS_BROKER_LISTEN_ADDRESS'),
    __metadata("design:type", String)
], TaskRunnersConfig.prototype, "listenAddress", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_RUNNERS_MAX_PAYLOAD'),
    __metadata("design:type", Number)
], TaskRunnersConfig.prototype, "maxPayload", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_RUNNERS_MAX_OLD_SPACE_SIZE'),
    __metadata("design:type", String)
], TaskRunnersConfig.prototype, "maxOldSpaceSize", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_RUNNERS_MAX_CONCURRENCY'),
    __metadata("design:type", Number)
], TaskRunnersConfig.prototype, "maxConcurrency", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_RUNNERS_TASK_TIMEOUT'),
    __metadata("design:type", Number)
], TaskRunnersConfig.prototype, "taskTimeout", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_RUNNERS_TASK_REQUEST_TIMEOUT'),
    __metadata("design:type", Number)
], TaskRunnersConfig.prototype, "taskRequestTimeout", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_RUNNERS_HEARTBEAT_INTERVAL'),
    __metadata("design:type", Number)
], TaskRunnersConfig.prototype, "heartbeatInterval", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_RUNNERS_INSECURE_MODE'),
    __metadata("design:type", Boolean)
], TaskRunnersConfig.prototype, "insecureMode", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_NATIVE_PYTHON_RUNNER'),
    __metadata("design:type", Boolean)
], TaskRunnersConfig.prototype, "isNativePythonRunnerEnabled", void 0);
exports.TaskRunnersConfig = TaskRunnersConfig = __decorate([
    decorators_1.Config
], TaskRunnersConfig);
//# sourceMappingURL=runners.config.js.map