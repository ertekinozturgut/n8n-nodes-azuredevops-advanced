import type { ICredentialsDecrypted, INodeExecutionData, INodePropertyOptions, INodeType, DeclarativeRestApiSettings, IWorkflowDataProxyAdditionalKeys, IExecuteSingleFunctions, INodeProperties } from 'n8n-workflow';
import { type ExecuteContext } from './node-execution-context';
export declare class RoutingNode {
    private readonly context;
    private readonly nodeType;
    private readonly credentialsDecrypted?;
    constructor(context: ExecuteContext, nodeType: INodeType, credentialsDecrypted?: ICredentialsDecrypted | undefined);
    runNode(): Promise<INodeExecutionData[][] | undefined>;
    private mergeOptions;
    private runPostReceiveAction;
    private postProcessResponseData;
    private rawRoutingRequest;
    private makeRequest;
    private getParameterValue;
    getRequestOptionsFromParameters(executeSingleFunctions: IExecuteSingleFunctions, nodeProperties: INodeProperties | INodePropertyOptions, itemIndex: number, runIndex: number, path: string, additionalKeys?: IWorkflowDataProxyAdditionalKeys): DeclarativeRestApiSettings.ResultOptions | undefined;
    private prepareCredentials;
}
