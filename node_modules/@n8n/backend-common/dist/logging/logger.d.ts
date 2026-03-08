import type { LogScope } from '@n8n/config';
import { GlobalConfig, InstanceSettingsConfig } from '@n8n/config';
import type { Logger as LoggerType, LogMetadata } from 'n8n-workflow';
import winston from 'winston';
export declare class Logger implements LoggerType {
    private readonly globalConfig;
    private readonly instanceSettingsConfig;
    private internalLogger;
    private readonly level;
    private readonly scopes;
    private get isScopingEnabled();
    private readonly noColor;
    private readonly noColorDefaultTrue;
    constructor(globalConfig: GlobalConfig, instanceSettingsConfig: InstanceSettingsConfig, { isRoot }?: {
        isRoot?: boolean;
    });
    private setInternalLogger;
    scoped(scopes: LogScope | LogScope[]): Logger;
    private serializeError;
    private log;
    private setLevel;
    private jsonConsoleFormat;
    private pickConsoleTransportFormat;
    private setConsoleTransport;
    private scopeFilter;
    private color;
    private debugDevConsoleFormat;
    private debugProdConsoleFormat;
    private devTsFormat;
    private toPrintable;
    private setFileTransport;
    error(message: string, metadata?: LogMetadata): void;
    warn(message: string, metadata?: LogMetadata): void;
    info(message: string, metadata?: LogMetadata): void;
    debug(message: string, metadata?: LogMetadata): void;
    getInternalLogger(): winston.Logger;
}
