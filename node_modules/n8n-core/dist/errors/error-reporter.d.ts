import { Logger } from '@n8n/backend-common';
import { type InstanceType } from '@n8n/constants';
import type { ReportingOptions } from '@n8n/errors';
import type { ErrorEvent, EventHint } from '@sentry/core';
type ErrorReporterInitOptions = {
    serverType: InstanceType | 'task_runner';
    dsn: string;
    release: string;
    environment: string;
    serverName: string;
    releaseDate?: Date;
    withEventLoopBlockDetection: boolean;
    beforeSendFilter?: (event: ErrorEvent, hint: EventHint) => boolean;
};
export declare class ErrorReporter {
    private readonly logger;
    private expirationTimer?;
    private seenErrors;
    private report;
    private beforeSendFilter?;
    constructor(logger: Logger);
    private defaultReport;
    shutdown(timeoutInMs?: number): Promise<void>;
    init({ beforeSendFilter, dsn, serverType, release, environment, serverName, releaseDate, withEventLoopBlockDetection, }: ErrorReporterInitOptions): Promise<void>;
    beforeSend(event: ErrorEvent, hint: EventHint): Promise<ErrorEvent | null>;
    error(e: unknown, options?: ReportingOptions): void;
    warn(warning: Error | string, options?: ReportingOptions): void;
    info(msg: string, options?: ReportingOptions): void;
    private wrap;
    private isIgnoredSqliteError;
    private isIgnoredN8nError;
    private extractEventDetailsFromN8nError;
    private getEventLoopBlockIntegration;
}
export {};
