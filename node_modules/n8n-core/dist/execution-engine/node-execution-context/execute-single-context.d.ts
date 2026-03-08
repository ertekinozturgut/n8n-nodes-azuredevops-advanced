import type { ICredentialDataDecryptedObject, IGetNodeParameterOptions, INode, INodeExecutionData, IRunExecutionData, IExecuteSingleFunctions, IWorkflowExecuteAdditionalData, Workflow, WorkflowExecuteMode, ITaskDataConnections, IExecuteData } from 'n8n-workflow';
import { BaseExecuteContext } from './base-execute-context';
export declare class ExecuteSingleContext extends BaseExecuteContext implements IExecuteSingleFunctions {
    private readonly itemIndex;
    readonly helpers: IExecuteSingleFunctions['helpers'];
    constructor(workflow: Workflow, node: INode, additionalData: IWorkflowExecuteAdditionalData, mode: WorkflowExecuteMode, runExecutionData: IRunExecutionData, runIndex: number, connectionInputData: INodeExecutionData[], inputData: ITaskDataConnections, itemIndex: number, executeData: IExecuteData, abortSignal?: AbortSignal);
    evaluateExpression(expression: string, itemIndex?: number): import("n8n-workflow").INodeParameters | import("n8n-workflow").NodeParameterValue | import("n8n-workflow").INodeParameters[] | import("n8n-workflow").NodeParameterValue[];
    getInputData(inputIndex?: number, connectionType?: "main"): INodeExecutionData | {
        json: {};
    };
    getItemIndex(): number;
    getNodeParameter(parameterName: string, fallbackValue?: any, options?: IGetNodeParameterOptions): object | import("n8n-workflow").NodeParameterValueType;
    getCredentials<T extends object = ICredentialDataDecryptedObject>(type: string): Promise<T>;
    getWorkflowDataProxy(): import("n8n-workflow").IWorkflowDataProxyData;
}
