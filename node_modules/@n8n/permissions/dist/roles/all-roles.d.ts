import type { AllRolesMap, AllRoleTypes } from '../types.ee';
export declare const ALL_ROLES: AllRolesMap;
export declare const isBuiltInRole: (role: string) => role is AllRoleTypes;
