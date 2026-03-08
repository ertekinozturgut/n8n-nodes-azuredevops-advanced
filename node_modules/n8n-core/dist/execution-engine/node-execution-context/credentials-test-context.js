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
exports.CredentialTestContext = void 0;
const backend_common_1 = require("@n8n/backend-common");
const decorators_1 = require("@n8n/decorators");
const di_1 = require("@n8n/di");
const request_helper_functions_1 = require("./utils/request-helper-functions");
const ssh_tunnel_helper_functions_1 = require("./utils/ssh-tunnel-helper-functions");
class CredentialTestContext {
    constructor() {
        this.helpers = {
            ...(0, ssh_tunnel_helper_functions_1.getSSHTunnelFunctions)(),
            request: async (uriOrObject, options) => {
                return await (0, request_helper_functions_1.proxyRequestToAxios)(undefined, undefined, undefined, uriOrObject, options);
            },
        };
    }
    get logger() {
        return di_1.Container.get(backend_common_1.Logger);
    }
}
exports.CredentialTestContext = CredentialTestContext;
__decorate([
    decorators_1.Memoized,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], CredentialTestContext.prototype, "logger", null);
//# sourceMappingURL=credentials-test-context.js.map