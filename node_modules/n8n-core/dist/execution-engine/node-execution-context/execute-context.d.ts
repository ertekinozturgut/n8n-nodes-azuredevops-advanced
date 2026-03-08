import type { AINodeConnectionType, CallbackManager, ChunkType, CloseFunction, IDataObject, IExecuteData, IExecuteFunctions, IExecuteResponsePromiseData, INode, INodeExecutionData, IRunExecutionData, ITaskDataConnections, IWorkflowExecuteAdditionalData, NodeExecutionHint, Workflow, WorkflowExecuteMode, EngineResponse } from 'n8n-workflow';
import { BaseExecuteContext } from './base-execute-context';
export declare class ExecuteContext extends BaseExecuteContext implements IExecuteFunctions {
    private readonly closeFunctions;
    subNodeExecutionResults?: EngineResponse | undefined;
    readonly helpers: IExecuteFunctions['helpers'];
    readonly nodeHelpers: IExecuteFunctions['nodeHelpers'];
    readonly getNodeParameter: IExecuteFunctions['getNodeParameter'];
    readonly hints: NodeExecutionHint[];
    constructor(workflow: Workflow, node: INode, additionalData: IWorkflowExecuteAdditionalData, mode: WorkflowExecuteMode, runExecutionData: IRunExecutionData, runIndex: number, connectionInputData: INodeExecutionData[], inputData: ITaskDataConnections, executeData: IExecuteData, closeFunctions: CloseFunction[], abortSignal?: AbortSignal, subNodeExecutionResults?: EngineResponse | undefined);
    isStreaming(): boolean;
    sendChunk(type: ChunkType, itemIndex: number, content?: IDataObject | string): Promise<void>;
    getInputConnectionData(connectionType: AINodeConnectionType, itemIndex: number): Promise<unknown>;
    getInputData(inputIndex?: number, connectionType?: "main"): INodeExecutionData[];
    logNodeOutput(...args: unknown[]): void;
    sendResponse(response: IExecuteResponsePromiseData): Promise<void>;
    addInputData(): {
        index: number;
    };
    addOutputData(): void;
    getParentCallbackManager(): CallbackManager | undefined;
    addExecutionHints(...hints: NodeExecutionHint[]): void;
}
