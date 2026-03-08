export type Headers = Record<string, string | string[]>;
export type OAuth2GrantType = 'pkce' | 'authorizationCode' | 'clientCredentials';
export type OAuth2AuthenticationMethod = 'header' | 'body';
export interface OAuth2CredentialData {
    clientId: string;
    clientSecret?: string;
    accessTokenUrl: string;
    authentication?: OAuth2AuthenticationMethod;
    authUrl?: string;
    scope?: string;
    authQueryParameters?: string;
    additionalBodyProperties?: string;
    grantType: OAuth2GrantType;
    ignoreSSLIssues?: boolean;
    oauthTokenData?: {
        access_token: string;
        refresh_token?: string;
    };
    useDynamicClientRegistration?: boolean;
    serverUrl?: string;
}
export interface OAuth2AccessTokenErrorResponse extends Record<string, unknown> {
    error: string;
    error_description?: string;
    error_uri?: string;
}
