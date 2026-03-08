export declare class DataTableConfig {
    maxSize: number;
    warningThreshold?: number;
    sizeCheckCacheDuration: number;
    uploadMaxFileSize?: number;
    cleanupIntervalMs: number;
    fileMaxAgeMs: number;
    readonly uploadDir: string;
    constructor();
}
