import type { INodeExecutionData, IRunData, NodeConnectionType } from 'n8n-workflow';
export declare function getIncomingData(runData: IRunData, nodeName: string, runIndex: number, connectionType: NodeConnectionType, outputIndex: number): INodeExecutionData[] | null;
export declare function getIncomingDataFromAnyRun(runData: IRunData, nodeName: string, connectionType: NodeConnectionType, outputIndex: number): {
    data: INodeExecutionData[];
    runIndex: number;
} | undefined;
