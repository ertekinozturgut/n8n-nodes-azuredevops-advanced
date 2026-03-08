import { Logger } from '@n8n/backend-common';
import { CronLoggingConfig } from '@n8n/config';
import { CronJob } from 'cron';
import type { CronContext, Workflow } from 'n8n-workflow';
import { ErrorReporter } from '../errors';
import { InstanceSettings } from '../instance-settings';
type CronKey = string;
type Cron = {
    job: CronJob;
    summary: string;
    ctx: CronContext;
};
type CronsByWorkflow = Map<Workflow['id'], Map<CronKey, Cron>>;
export declare class ScheduledTaskManager {
    private readonly instanceSettings;
    private readonly logger;
    private readonly errorReporter;
    readonly cronsByWorkflow: CronsByWorkflow;
    private logInterval?;
    private get loggableCrons();
    constructor(instanceSettings: InstanceSettings, logger: Logger, { activeInterval }: CronLoggingConfig, errorReporter: ErrorReporter);
    registerCron(ctx: CronContext, onTick: () => void): void;
    deregisterCrons(workflowId: string): void;
    deregisterAllCrons(): void;
    private toCronKey;
}
export {};
