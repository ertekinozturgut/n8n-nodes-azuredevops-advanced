import type { INode, IPollFunctions, ITriggerFunctions, IWorkflowExecuteAdditionalData, Workflow, WorkflowActivateMode, WorkflowExecuteMode } from 'n8n-workflow';
export declare function getExecutePollFunctions(workflow: Workflow, node: INode, additionalData: IWorkflowExecuteAdditionalData, mode: WorkflowExecuteMode, activation: WorkflowActivateMode): IPollFunctions;
export declare function getExecuteTriggerFunctions(workflow: Workflow, node: INode, additionalData: IWorkflowExecuteAdditionalData, mode: WorkflowExecuteMode, activation: WorkflowActivateMode): ITriggerFunctions;
