declare class SamlConfig {
    loginEnabled: boolean;
    loginLabel: string;
}
declare class OidcConfig {
    loginEnabled: boolean;
}
declare class LdapConfig {
    loginEnabled: boolean;
    loginLabel: string;
}
declare class ProvisioningConfig {
    scopesProvisionInstanceRole: boolean;
    scopesProvisionProjectRoles: boolean;
    scopesName: string;
    scopesInstanceRoleClaimName: string;
    scopesProjectsRolesClaimName: string;
}
export declare class SsoConfig {
    justInTimeProvisioning: boolean;
    redirectLoginToSso: boolean;
    saml: SamlConfig;
    oidc: OidcConfig;
    ldap: LdapConfig;
    provisioning: ProvisioningConfig;
}
export {};
