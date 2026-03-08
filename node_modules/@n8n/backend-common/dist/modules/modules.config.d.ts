import { CommaSeparatedStringArray } from '@n8n/config';
export declare const MODULE_NAMES: readonly ["insights", "external-secrets", "community-packages", "data-table", "mcp", "chat-hub", "provisioning", "breaking-changes"];
export type ModuleName = (typeof MODULE_NAMES)[number];
declare class ModuleArray extends CommaSeparatedStringArray<ModuleName> {
    constructor(str: string);
}
export declare class ModulesConfig {
    enabledModules: ModuleArray;
    disabledModules: ModuleArray;
}
export {};
