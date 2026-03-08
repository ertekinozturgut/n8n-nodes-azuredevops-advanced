import type { LICENSE_FEATURES, InstanceType } from '@n8n/constants';
import { type Constructable } from '@n8n/di';
export interface BaseEntity {
    hasId(): boolean;
    save(options?: unknown): Promise<this>;
    remove(options?: unknown): Promise<this>;
    softRemove(options?: unknown): Promise<this>;
    recover(options?: unknown): Promise<this>;
    reload(): Promise<void>;
}
export interface TimestampedEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
export type EntityClass = new () => BaseEntity | TimestampedEntity;
export type ModuleSettings = Record<string, unknown>;
export type ModuleContext = Record<string, unknown>;
export interface ModuleInterface {
    init?(): Promise<void>;
    shutdown?(): Promise<void>;
    entities?(): Promise<EntityClass[]>;
    settings?(): Promise<ModuleSettings>;
    context?(): Promise<ModuleContext>;
    loadDir?(): Promise<string | null>;
}
export type ModuleClass = Constructable<ModuleInterface>;
export type LicenseFlag = (typeof LICENSE_FEATURES)[keyof typeof LICENSE_FEATURES];
export type BackendModuleOptions = {
    name: string;
    licenseFlag?: LicenseFlag | LicenseFlag[];
    instanceTypes?: InstanceType[];
};
export declare const BackendModule: (opts: BackendModuleOptions) => ClassDecorator;
