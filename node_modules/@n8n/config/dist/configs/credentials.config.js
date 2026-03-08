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
exports.CredentialsConfig = void 0;
const decorators_1 = require("../decorators");
let CredentialsOverwrite = class CredentialsOverwrite {
    constructor() {
        this.data = '{}';
        this.endpoint = '';
        this.endpointAuthToken = '';
        this.persistence = false;
    }
};
__decorate([
    (0, decorators_1.Env)('CREDENTIALS_OVERWRITE_DATA'),
    __metadata("design:type", String)
], CredentialsOverwrite.prototype, "data", void 0);
__decorate([
    (0, decorators_1.Env)('CREDENTIALS_OVERWRITE_ENDPOINT'),
    __metadata("design:type", String)
], CredentialsOverwrite.prototype, "endpoint", void 0);
__decorate([
    (0, decorators_1.Env)('CREDENTIALS_OVERWRITE_ENDPOINT_AUTH_TOKEN'),
    __metadata("design:type", String)
], CredentialsOverwrite.prototype, "endpointAuthToken", void 0);
__decorate([
    (0, decorators_1.Env)('CREDENTIALS_OVERWRITE_PERSISTENCE'),
    __metadata("design:type", Boolean)
], CredentialsOverwrite.prototype, "persistence", void 0);
CredentialsOverwrite = __decorate([
    decorators_1.Config
], CredentialsOverwrite);
let CredentialsConfig = class CredentialsConfig {
    constructor() {
        this.defaultName = 'My credentials';
    }
};
exports.CredentialsConfig = CredentialsConfig;
__decorate([
    (0, decorators_1.Env)('CREDENTIALS_DEFAULT_NAME'),
    __metadata("design:type", String)
], CredentialsConfig.prototype, "defaultName", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", CredentialsOverwrite)
], CredentialsConfig.prototype, "overwrite", void 0);
exports.CredentialsConfig = CredentialsConfig = __decorate([
    decorators_1.Config
], CredentialsConfig);
//# sourceMappingURL=credentials.config.js.map