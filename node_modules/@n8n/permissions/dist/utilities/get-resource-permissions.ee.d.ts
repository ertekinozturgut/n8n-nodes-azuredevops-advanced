import { RESOURCES } from '../constants.ee';
import type { Scope } from '../types.ee';
type ActionBooleans<T extends readonly string[]> = {
    [K in T[number]]?: boolean;
};
export type PermissionsRecord = {
    [K in keyof typeof RESOURCES]: ActionBooleans<(typeof RESOURCES)[K]>;
};
export declare const getResourcePermissions: (resourceScopes?: Scope[]) => PermissionsRecord;
export {};
