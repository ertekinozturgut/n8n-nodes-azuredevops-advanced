import type { InstanceType } from '@n8n/constants';
import type { LicenseFlag, ModuleClass } from './module';
type ModuleEntry = {
    class: ModuleClass;
    licenseFlag?: LicenseFlag | LicenseFlag[];
    instanceTypes?: InstanceType[];
};
export declare class ModuleMetadata {
    private readonly modules;
    register(moduleName: string, moduleEntry: ModuleEntry): void;
    get(moduleName: string): ModuleEntry | undefined;
    getEntries(): [string, ModuleEntry][];
    getClasses(): ModuleClass[];
}
export {};
