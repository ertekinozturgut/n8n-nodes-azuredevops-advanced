import { Logger } from '@n8n/backend-common';
import type { IWorkflowExecuteAdditionalData, Workflow, WorkflowActivateMode, WorkflowExecuteMode } from 'n8n-workflow';
import { ErrorReporter } from '../errors/error-reporter';
import type { IWorkflowData } from '../interfaces';
import type { IGetExecutePollFunctions, IGetExecuteTriggerFunctions } from './interfaces';
import { ScheduledTaskManager } from './scheduled-task-manager';
import { TriggersAndPollers } from './triggers-and-pollers';
export declare class ActiveWorkflows {
    private readonly logger;
    private readonly scheduledTaskManager;
    private readonly triggersAndPollers;
    private readonly errorReporter;
    constructor(logger: Logger, scheduledTaskManager: ScheduledTaskManager, triggersAndPollers: TriggersAndPollers, errorReporter: ErrorReporter);
    private activeWorkflows;
    isActive(workflowId: string): boolean;
    allActiveWorkflows(): string[];
    get(workflowId: string): IWorkflowData;
    add(workflowId: string, workflow: Workflow, additionalData: IWorkflowExecuteAdditionalData, mode: WorkflowExecuteMode, activation: WorkflowActivateMode, getTriggerFunctions: IGetExecuteTriggerFunctions, getPollFunctions: IGetExecutePollFunctions): Promise<void>;
    private activatePolling;
    remove(workflowId: string): Promise<boolean>;
    removeAllTriggerAndPollerBasedWorkflows(): Promise<void>;
    private closeTrigger;
}
