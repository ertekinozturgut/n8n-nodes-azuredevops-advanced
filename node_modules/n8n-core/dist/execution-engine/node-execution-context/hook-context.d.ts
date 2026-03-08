import type { ICredentialDataDecryptedObject, INode, IHookFunctions, IWorkflowExecuteAdditionalData, Workflow, WorkflowActivateMode, WorkflowExecuteMode, IWebhookData, WebhookType } from 'n8n-workflow';
import { NodeExecutionContext } from './node-execution-context';
export declare class HookContext extends NodeExecutionContext implements IHookFunctions {
    private readonly activation;
    private readonly webhookData?;
    readonly helpers: IHookFunctions['helpers'];
    constructor(workflow: Workflow, node: INode, additionalData: IWorkflowExecuteAdditionalData, mode: WorkflowExecuteMode, activation: WorkflowActivateMode, webhookData?: IWebhookData | undefined);
    getActivationMode(): WorkflowActivateMode;
    getCredentials<T extends object = ICredentialDataDecryptedObject>(type: string): Promise<T>;
    getNodeWebhookUrl(name: WebhookType): string | undefined;
    getWebhookName(): string;
    getWebhookDescription(name: WebhookType): import("n8n-workflow").IWebhookDescription | undefined;
}
