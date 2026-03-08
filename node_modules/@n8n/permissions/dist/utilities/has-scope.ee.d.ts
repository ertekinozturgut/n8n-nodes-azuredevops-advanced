import type { Scope, ScopeLevels, ScopeOptions, MaskLevels } from '../types.ee';
export declare const hasScope: (scope: Scope | Scope[], userScopes: ScopeLevels, masks?: MaskLevels, options?: ScopeOptions) => boolean;
