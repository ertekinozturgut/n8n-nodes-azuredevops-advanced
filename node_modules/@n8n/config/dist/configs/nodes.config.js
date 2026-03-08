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
exports.NodesConfig = void 0;
const decorators_1 = require("../decorators");
function isStringArray(input) {
    return Array.isArray(input) && input.every((item) => typeof item === 'string');
}
class JsonStringArray extends Array {
    constructor(str) {
        super();
        let parsed;
        try {
            parsed = JSON.parse(str);
        }
        catch {
            return [];
        }
        return isStringArray(parsed) ? parsed : [];
    }
}
let NodesConfig = class NodesConfig {
    constructor() {
        this.include = [];
        this.exclude = [];
        this.errorTriggerType = 'n8n-nodes-base.errorTrigger';
        this.pythonEnabled = true;
    }
};
exports.NodesConfig = NodesConfig;
__decorate([
    (0, decorators_1.Env)('NODES_INCLUDE'),
    __metadata("design:type", JsonStringArray)
], NodesConfig.prototype, "include", void 0);
__decorate([
    (0, decorators_1.Env)('NODES_EXCLUDE'),
    __metadata("design:type", JsonStringArray)
], NodesConfig.prototype, "exclude", void 0);
__decorate([
    (0, decorators_1.Env)('NODES_ERROR_TRIGGER_TYPE'),
    __metadata("design:type", String)
], NodesConfig.prototype, "errorTriggerType", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_PYTHON_ENABLED'),
    __metadata("design:type", Boolean)
], NodesConfig.prototype, "pythonEnabled", void 0);
exports.NodesConfig = NodesConfig = __decorate([
    decorators_1.Config
], NodesConfig);
//# sourceMappingURL=nodes.config.js.map