import type { IDataDeduplicator, ICheckProcessedOptions, IDeduplicationOutput, IDeduplicationOutputItems, IDataObject, DeduplicationScope, DeduplicationItemTypes, ICheckProcessedContextData } from 'n8n-workflow';
export declare class DataDeduplicationService {
    private static instance;
    private deduplicator;
    private constructor();
    private assertDeduplicator;
    private static assertInstance;
    private static assertSingleInstance;
    static init(deduplicator: IDataDeduplicator): Promise<void>;
    static getInstance(): DataDeduplicationService;
    checkProcessedItemsAndRecord(propertyName: string, items: IDataObject[], scope: DeduplicationScope, contextData: ICheckProcessedContextData, options: ICheckProcessedOptions): Promise<IDeduplicationOutputItems>;
    checkProcessedAndRecord(items: DeduplicationItemTypes[], scope: DeduplicationScope, contextData: ICheckProcessedContextData, options: ICheckProcessedOptions): Promise<IDeduplicationOutput>;
    removeProcessed(items: DeduplicationItemTypes[], scope: DeduplicationScope, contextData: ICheckProcessedContextData, options: ICheckProcessedOptions): Promise<void>;
    clearAllProcessedItems(scope: DeduplicationScope, contextData: ICheckProcessedContextData, options: ICheckProcessedOptions): Promise<void>;
    getProcessedDataCount(scope: DeduplicationScope, contextData: ICheckProcessedContextData, options: ICheckProcessedOptions): Promise<number>;
}
