import { type ApiKeyScope, type AuthPrincipal } from './types.ee';
export declare const OWNER_API_KEY_SCOPES: ApiKeyScope[];
export declare const ADMIN_API_KEY_SCOPES: ApiKeyScope[];
export declare const MEMBER_API_KEY_SCOPES: ApiKeyScope[];
export declare const API_KEY_SCOPES_FOR_IMPLICIT_PERSONAL_PROJECT: ApiKeyScope[];
export declare const getApiKeyScopesForRole: (user: AuthPrincipal) => ApiKeyScope[];
export declare const getOwnerOnlyApiKeyScopes: () => ApiKeyScope[];
