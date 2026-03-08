import type { INode, IWorkflowExecuteAdditionalData, Workflow, IWorkflowNodeContext } from 'n8n-workflow';
import { NodeExecutionContext } from './node-execution-context';
export declare class LoadWorkflowNodeContext extends NodeExecutionContext implements IWorkflowNodeContext {
    readonly getNodeParameter: IWorkflowNodeContext['getNodeParameter'];
    constructor(workflow: Workflow, node: INode, additionalData: IWorkflowExecuteAdditionalData);
}
