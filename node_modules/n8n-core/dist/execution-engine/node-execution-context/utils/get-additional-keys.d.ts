import type { IRunExecutionData, IWorkflowDataProxyAdditionalKeys, IWorkflowExecuteAdditionalData, WorkflowExecuteMode } from 'n8n-workflow';
export declare function getAdditionalKeys(additionalData: IWorkflowExecuteAdditionalData, mode: WorkflowExecuteMode, runExecutionData: IRunExecutionData | null, options?: {
    secretsEnabled?: boolean;
}): IWorkflowDataProxyAdditionalKeys;
