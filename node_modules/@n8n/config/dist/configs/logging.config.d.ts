import { z } from 'zod';
import { CommaSeparatedStringArray } from '../custom-types';
export declare const LOG_SCOPES: readonly ["concurrency", "external-secrets", "license", "multi-main-setup", "pruning", "pubsub", "push", "redis", "scaling", "waiting-executions", "task-runner", "task-runner-js", "task-runner-py", "insights", "workflow-activation", "ssh-client", "data-table", "cron", "community-nodes", "legacy-sqlite-execution-recovery", "chat-hub", "breaking-changes", "circuit-breaker"];
export type LogScope = (typeof LOG_SCOPES)[number];
export declare class CronLoggingConfig {
    activeInterval: number;
}
declare class FileLoggingConfig {
    fileCountMax: number;
    fileSizeMax: number;
    location: string;
}
declare const logLevelSchema: z.ZodEnum<["error", "warn", "info", "debug", "silent"]>;
type LogLevel = z.infer<typeof logLevelSchema>;
export declare class LoggingConfig {
    level: LogLevel;
    outputs: CommaSeparatedStringArray<'console' | 'file'>;
    format: 'text' | 'json';
    file: FileLoggingConfig;
    cron: CronLoggingConfig;
    scopes: CommaSeparatedStringArray<LogScope>;
}
export {};
