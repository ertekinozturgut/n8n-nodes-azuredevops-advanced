import type { AINodeConnectionType, CloseFunction, ExecutionBaseError, IExecuteData, INode, INodeExecutionData, IRunExecutionData, ISupplyDataFunctions, ITaskDataConnections, ITaskMetadata, IWorkflowExecuteAdditionalData, Workflow, WorkflowExecuteMode, NodeConnectionType, NodeExecutionHint } from 'n8n-workflow';
import { BaseExecuteContext } from './base-execute-context';
export declare class SupplyDataContext extends BaseExecuteContext implements ISupplyDataFunctions {
    private readonly connectionType;
    private readonly closeFunctions;
    readonly helpers: ISupplyDataFunctions['helpers'];
    readonly getNodeParameter: ISupplyDataFunctions['getNodeParameter'];
    readonly parentNode?: INode;
    readonly hints: NodeExecutionHint[];
    constructor(workflow: Workflow, node: INode, additionalData: IWorkflowExecuteAdditionalData, mode: WorkflowExecuteMode, runExecutionData: IRunExecutionData, runIndex: number, connectionInputData: INodeExecutionData[], inputData: ITaskDataConnections, connectionType: NodeConnectionType, executeData: IExecuteData, closeFunctions: CloseFunction[], abortSignal?: AbortSignal, parentNode?: INode);
    cloneWith(replacements: {
        runIndex: number;
        inputData: INodeExecutionData[][];
    }): SupplyDataContext;
    getInputConnectionData(connectionType: AINodeConnectionType, itemIndex: number): Promise<unknown>;
    getInputData(inputIndex?: number, connectionType?: NodeConnectionType): INodeExecutionData[];
    getNextRunIndex(): number;
    addInputData(connectionType: AINodeConnectionType, data: INodeExecutionData[][], runIndex?: number): {
        index: number;
    };
    addOutputData(connectionType: AINodeConnectionType, currentNodeRunIndex: number, data: INodeExecutionData[][] | ExecutionBaseError, metadata?: ITaskMetadata, sourceNodeRunIndex?: number): void;
    addExecutionDataFunctions(type: 'input' | 'output', data: INodeExecutionData[][] | ExecutionBaseError, connectionType: AINodeConnectionType, sourceNodeName: string, currentNodeRunIndex: number, metadata?: ITaskMetadata, sourceNodeRunIndex?: number): Promise<void>;
    logNodeOutput(...args: unknown[]): void;
    addExecutionHints(...hints: NodeExecutionHint[]): void;
}
