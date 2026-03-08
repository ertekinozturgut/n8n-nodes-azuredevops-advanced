import type { INodeExecutionData, IPairedItemData, NodeExecutionWithMetadata } from 'n8n-workflow';
export declare function constructExecutionMetaData(inputData: INodeExecutionData[], options: {
    itemData: IPairedItemData | IPairedItemData[];
}): NodeExecutionWithMetadata[];
