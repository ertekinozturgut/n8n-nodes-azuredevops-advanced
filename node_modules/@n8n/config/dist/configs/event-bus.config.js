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
exports.EventBusConfig = void 0;
const zod_1 = require("zod");
const decorators_1 = require("../decorators");
let LogWriterConfig = class LogWriterConfig {
    constructor() {
        this.keepLogCount = 3;
        this.maxFileSizeInKB = 10240;
        this.logBaseName = 'n8nEventLog';
    }
};
__decorate([
    (0, decorators_1.Env)('N8N_EVENTBUS_LOGWRITER_KEEPLOGCOUNT'),
    __metadata("design:type", Number)
], LogWriterConfig.prototype, "keepLogCount", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_EVENTBUS_LOGWRITER_MAXFILESIZEINKB'),
    __metadata("design:type", Number)
], LogWriterConfig.prototype, "maxFileSizeInKB", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_EVENTBUS_LOGWRITER_LOGBASENAME'),
    __metadata("design:type", String)
], LogWriterConfig.prototype, "logBaseName", void 0);
LogWriterConfig = __decorate([
    decorators_1.Config
], LogWriterConfig);
const recoveryModeSchema = zod_1.z.enum(['simple', 'extensive']);
let EventBusConfig = class EventBusConfig {
    constructor() {
        this.checkUnsentInterval = 0;
        this.crashRecoveryMode = 'extensive';
    }
};
exports.EventBusConfig = EventBusConfig;
__decorate([
    (0, decorators_1.Env)('N8N_EVENTBUS_CHECKUNSENTINTERVAL'),
    __metadata("design:type", Number)
], EventBusConfig.prototype, "checkUnsentInterval", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", LogWriterConfig)
], EventBusConfig.prototype, "logWriter", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_EVENTBUS_RECOVERY_MODE', recoveryModeSchema),
    __metadata("design:type", String)
], EventBusConfig.prototype, "crashRecoveryMode", void 0);
exports.EventBusConfig = EventBusConfig = __decorate([
    decorators_1.Config
], EventBusConfig);
//# sourceMappingURL=event-bus.config.js.map