import type { IWorkflowExecuteAdditionalData, NodeParameterValueType, ILocalLoadOptionsFunctions, IWorkflowLoader, IWorkflowNodeContext, INodeTypes } from 'n8n-workflow';
export declare class LocalLoadOptionsContext implements ILocalLoadOptionsFunctions {
    private nodeTypes;
    private additionalData;
    private path;
    private workflowLoader;
    constructor(nodeTypes: INodeTypes, additionalData: IWorkflowExecuteAdditionalData, path: string, workflowLoader: IWorkflowLoader);
    getWorkflowNodeContext(nodeType: string): Promise<IWorkflowNodeContext | null>;
    getCurrentNodeParameter(parameterPath: string): NodeParameterValueType | object | undefined;
}
