"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalSecretsProxy = void 0;
const di_1 = require("@n8n/di");
let ExternalSecretsProxy = class ExternalSecretsProxy {
    setManager(manager) {
        this.manager = manager;
    }
    async update() {
        await this.manager?.updateSecrets();
    }
    getSecret(provider, name) {
        return this.manager?.getSecret(provider, name);
    }
    hasSecret(provider, name) {
        return !!this.manager && this.manager.hasSecret(provider, name);
    }
    hasProvider(provider) {
        return !!this.manager && this.manager.hasProvider(provider);
    }
    listProviders() {
        return this.manager?.getProviderNames() ?? [];
    }
    listSecrets(provider) {
        return this.manager?.getSecretNames(provider) ?? [];
    }
};
exports.ExternalSecretsProxy = ExternalSecretsProxy;
exports.ExternalSecretsProxy = ExternalSecretsProxy = __decorate([
    (0, di_1.Service)()
], ExternalSecretsProxy);
//# sourceMappingURL=external-secrets-proxy.js.map