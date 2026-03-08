import type { AuthPrincipal, Scope, ScopeOptions } from '../types.ee';
export declare const hasGlobalScope: (principal: AuthPrincipal, scope: Scope | Scope[], scopeOptions?: ScopeOptions) => boolean;
