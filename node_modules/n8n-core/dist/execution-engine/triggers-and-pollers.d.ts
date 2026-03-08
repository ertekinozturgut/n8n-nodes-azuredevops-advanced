import type { Workflow, INode, INodeExecutionData, IPollFunctions, IWorkflowExecuteAdditionalData, WorkflowExecuteMode, WorkflowActivateMode, ITriggerResponse } from 'n8n-workflow';
import type { IGetExecuteTriggerFunctions } from './interfaces';
export declare class TriggersAndPollers {
    runTrigger(workflow: Workflow, node: INode, getTriggerFunctions: IGetExecuteTriggerFunctions, additionalData: IWorkflowExecuteAdditionalData, mode: WorkflowExecuteMode, activation: WorkflowActivateMode): Promise<ITriggerResponse | undefined>;
    runPoll(workflow: Workflow, node: INode, pollFunctions: IPollFunctions): Promise<INodeExecutionData[][] | null>;
}
