import type { AllRoleTypes, AuthPrincipal, Resource, Scope } from '../types.ee';
export declare const COMBINED_ROLE_MAP: Record<AllRoleTypes, Scope[]>;
export declare function getRoleScopes(role: AllRoleTypes, filters?: Resource[]): Scope[];
export declare function getAuthPrincipalScopes(user: AuthPrincipal, filters?: Resource[]): Scope[];
