import type { ApiKeyScope, Scope, ScopeInformation } from './types.ee';
export declare const ALL_SCOPES: Scope[];
export declare const ALL_API_KEY_SCOPES: Set<ApiKeyScope>;
export declare const scopeInformation: Partial<Record<Scope, ScopeInformation>>;
