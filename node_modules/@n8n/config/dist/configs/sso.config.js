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
exports.SsoConfig = void 0;
const decorators_1 = require("../decorators");
let SamlConfig = class SamlConfig {
    constructor() {
        this.loginEnabled = false;
        this.loginLabel = '';
    }
};
__decorate([
    (0, decorators_1.Env)('N8N_SSO_SAML_LOGIN_ENABLED'),
    __metadata("design:type", Boolean)
], SamlConfig.prototype, "loginEnabled", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_SSO_SAML_LOGIN_LABEL'),
    __metadata("design:type", String)
], SamlConfig.prototype, "loginLabel", void 0);
SamlConfig = __decorate([
    decorators_1.Config
], SamlConfig);
let OidcConfig = class OidcConfig {
    constructor() {
        this.loginEnabled = false;
    }
};
__decorate([
    (0, decorators_1.Env)('N8N_SSO_OIDC_LOGIN_ENABLED'),
    __metadata("design:type", Boolean)
], OidcConfig.prototype, "loginEnabled", void 0);
OidcConfig = __decorate([
    decorators_1.Config
], OidcConfig);
let LdapConfig = class LdapConfig {
    constructor() {
        this.loginEnabled = false;
        this.loginLabel = '';
    }
};
__decorate([
    (0, decorators_1.Env)('N8N_SSO_LDAP_LOGIN_ENABLED'),
    __metadata("design:type", Boolean)
], LdapConfig.prototype, "loginEnabled", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_SSO_LDAP_LOGIN_LABEL'),
    __metadata("design:type", String)
], LdapConfig.prototype, "loginLabel", void 0);
LdapConfig = __decorate([
    decorators_1.Config
], LdapConfig);
let ProvisioningConfig = class ProvisioningConfig {
    constructor() {
        this.scopesProvisionInstanceRole = false;
        this.scopesProvisionProjectRoles = false;
        this.scopesName = 'n8n';
        this.scopesInstanceRoleClaimName = 'n8n_instance_role';
        this.scopesProjectsRolesClaimName = 'n8n_projects';
    }
};
__decorate([
    (0, decorators_1.Env)('N8N_SSO_SCOPES_PROVISION_INSTANCE_ROLE'),
    __metadata("design:type", Boolean)
], ProvisioningConfig.prototype, "scopesProvisionInstanceRole", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_SSO_SCOPES_PROVISION_PROJECT_ROLES'),
    __metadata("design:type", Boolean)
], ProvisioningConfig.prototype, "scopesProvisionProjectRoles", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_SSO_SCOPES_NAME'),
    __metadata("design:type", String)
], ProvisioningConfig.prototype, "scopesName", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_SSO_SCOPES_INSTANCE_ROLE_CLAIM_NAME'),
    __metadata("design:type", String)
], ProvisioningConfig.prototype, "scopesInstanceRoleClaimName", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_SSO_SCOPES_PROJECTS_ROLES_CLAIM_NAME'),
    __metadata("design:type", String)
], ProvisioningConfig.prototype, "scopesProjectsRolesClaimName", void 0);
ProvisioningConfig = __decorate([
    decorators_1.Config
], ProvisioningConfig);
let SsoConfig = class SsoConfig {
    constructor() {
        this.justInTimeProvisioning = true;
        this.redirectLoginToSso = true;
    }
};
exports.SsoConfig = SsoConfig;
__decorate([
    (0, decorators_1.Env)('N8N_SSO_JUST_IN_TIME_PROVISIONING'),
    __metadata("design:type", Boolean)
], SsoConfig.prototype, "justInTimeProvisioning", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_SSO_REDIRECT_LOGIN_TO_SSO'),
    __metadata("design:type", Boolean)
], SsoConfig.prototype, "redirectLoginToSso", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", SamlConfig)
], SsoConfig.prototype, "saml", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", OidcConfig)
], SsoConfig.prototype, "oidc", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", LdapConfig)
], SsoConfig.prototype, "ldap", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", ProvisioningConfig)
], SsoConfig.prototype, "provisioning", void 0);
exports.SsoConfig = SsoConfig = __decorate([
    decorators_1.Config
], SsoConfig);
//# sourceMappingURL=sso.config.js.map