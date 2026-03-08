import type { InstanceType } from '@n8n/constants';
import { ModuleMetadata } from '@n8n/decorators';
import type { EntityClass, ModuleContext, ModuleSettings } from '@n8n/decorators';
import { ModulesConfig } from './modules.config';
import type { ModuleName } from './modules.config';
import { LicenseState } from '../license-state';
import { Logger } from '../logging/logger';
export declare class ModuleRegistry {
    private readonly moduleMetadata;
    private readonly licenseState;
    private readonly logger;
    private readonly modulesConfig;
    readonly entities: EntityClass[];
    readonly loadDirs: string[];
    readonly settings: Map<string, ModuleSettings>;
    readonly context: Map<string, ModuleContext>;
    constructor(moduleMetadata: ModuleMetadata, licenseState: LicenseState, logger: Logger, modulesConfig: ModulesConfig);
    private readonly defaultModules;
    private readonly activeModules;
    get eligibleModules(): ModuleName[];
    loadModules(modules?: ModuleName[]): Promise<void>;
    initModules(instanceType: InstanceType): Promise<void>;
    refreshModuleSettings(moduleName: ModuleName): Promise<ModuleSettings | null>;
    shutdownModule(moduleName: ModuleName): Promise<void>;
    isActive(moduleName: ModuleName): boolean;
    getActiveModules(): string[];
}
