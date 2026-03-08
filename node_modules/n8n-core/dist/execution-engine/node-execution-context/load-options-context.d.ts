import type { ICredentialDataDecryptedObject, IGetNodeParameterOptions, INode, ILoadOptionsFunctions, IWorkflowExecuteAdditionalData, NodeParameterValueType, Workflow } from 'n8n-workflow';
import { NodeExecutionContext } from './node-execution-context';
export declare class LoadOptionsContext extends NodeExecutionContext implements ILoadOptionsFunctions {
    private readonly path;
    readonly helpers: ILoadOptionsFunctions['helpers'];
    constructor(workflow: Workflow, node: INode, additionalData: IWorkflowExecuteAdditionalData, path: string);
    getCredentials<T extends object = ICredentialDataDecryptedObject>(type: string): Promise<T>;
    getCurrentNodeParameter(parameterPath: string, options?: IGetNodeParameterOptions): NodeParameterValueType | object | undefined;
    getCurrentNodeParameters(): import("n8n-workflow").INodeParameters | undefined;
}
