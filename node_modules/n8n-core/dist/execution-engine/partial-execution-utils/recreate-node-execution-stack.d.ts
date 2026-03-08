import { type NodeConnectionType, type IExecuteData, type INode, type INodeExecutionData, type IPinData, type IRunData, type ISourceData, type IWaitingForExecution, type IWaitingForExecutionSource } from 'n8n-workflow';
import type { DirectedGraph } from './directed-graph';
export declare function addWaitingExecution(waitingExecution: IWaitingForExecution, nodeName: string, runIndex: number, inputType: NodeConnectionType, inputIndex: number, executionData: INodeExecutionData[] | null): void;
export declare function addWaitingExecutionSource(waitingExecutionSource: IWaitingForExecutionSource, nodeName: string, runIndex: number, inputType: NodeConnectionType, inputIndex: number, sourceData: ISourceData | null): void;
export declare function recreateNodeExecutionStack(graph: DirectedGraph, startNodes: Set<INode>, runData: IRunData, pinData: IPinData): {
    nodeExecutionStack: IExecuteData[];
    waitingExecution: IWaitingForExecution;
    waitingExecutionSource: IWaitingForExecutionSource;
};
