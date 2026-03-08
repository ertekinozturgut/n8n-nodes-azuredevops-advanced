import type { Constructable } from '@n8n/di';
import type { INode, INodeExecutionData, INodeProperties, PlaintextExecutionContext, Workflow } from 'n8n-workflow';
export type ContextEstablishmentOptions = {
    triggerNode: INode;
    workflow: Workflow;
    triggerItems: INodeExecutionData[] | null;
    context: PlaintextExecutionContext;
    options?: Record<string, unknown>;
};
export type ContextEstablishmentResult = {
    triggerItems?: INodeExecutionData[];
    contextUpdate?: Partial<PlaintextExecutionContext>;
};
export type HookDescription = {
    name: string;
    displayName?: string;
    options?: INodeProperties[];
};
export interface IContextEstablishmentHook {
    hookDescription: HookDescription;
    execute(options: ContextEstablishmentOptions): Promise<ContextEstablishmentResult>;
    isApplicableToTriggerNode(nodeType: string): boolean;
    init?(): Promise<void>;
}
export type ContextEstablishmentHookClass = Constructable<IContextEstablishmentHook>;
