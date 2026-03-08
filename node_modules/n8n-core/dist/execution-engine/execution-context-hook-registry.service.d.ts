import { Logger } from '@n8n/backend-common';
import { ContextEstablishmentHookMetadata, IContextEstablishmentHook } from '@n8n/decorators';
export declare class ExecutionContextHookRegistry {
    private readonly executionContextHookMetadata;
    private readonly logger;
    private hookMap;
    constructor(executionContextHookMetadata: ContextEstablishmentHookMetadata, logger: Logger);
    init(): Promise<void>;
    getHookByName(name: string): IContextEstablishmentHook | undefined;
    getAllHooks(): IContextEstablishmentHook[];
    getHookForTriggerType(triggerType: string): IContextEstablishmentHook[];
}
