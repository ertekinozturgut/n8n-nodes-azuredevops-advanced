import { type IConnection, type IExecuteData, type INode, type INodeExecutionData, type IRunData, type IRunNodeResponse, type ITaskMetadata, type EngineRequest, type Workflow, type EngineResponse } from 'n8n-workflow';
type NodeToBeExecuted = {
    inputConnectionData: IConnection;
    parentOutputIndex: number;
    parentNode: string;
    parentOutputData: INodeExecutionData[][];
    runIndex: number;
    nodeRunIndex: number;
    metadata?: ITaskMetadata;
};
export declare function handleRequest({ workflow, currentNode, request, runIndex, executionData, runData, }: {
    workflow: Workflow;
    currentNode: INode;
    request: EngineRequest;
    runIndex: number;
    executionData: IExecuteData;
    runData: IRunData;
}): {
    nodesToBeExecuted: NodeToBeExecuted[];
};
export declare function isEngineRequest(responseOrRequest: INodeExecutionData[][] | IRunNodeResponse | EngineRequest | null | undefined): responseOrRequest is EngineRequest;
export declare function makeEngineResponse(): EngineResponse;
export {};
