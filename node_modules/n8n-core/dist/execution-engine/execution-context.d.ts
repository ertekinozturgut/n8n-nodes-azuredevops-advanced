import { type IWorkflowExecuteAdditionalData, type WorkflowExecuteMode, type IRunExecutionData, type Workflow } from 'n8n-workflow';
export declare const establishExecutionContext: (workflow: Workflow, runExecutionData: IRunExecutionData, additionalData: IWorkflowExecuteAdditionalData, mode: WorkflowExecuteMode) => Promise<void>;
