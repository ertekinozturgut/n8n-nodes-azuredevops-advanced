import type { Request, Response } from 'express';
import type { AINodeConnectionType, CloseFunction, ICredentialDataDecryptedObject, IDataObject, INode, IRunExecutionData, IWebhookData, IWebhookFunctions, IWorkflowExecuteAdditionalData, WebhookType, Workflow, WorkflowExecuteMode } from 'n8n-workflow';
import { NodeExecutionContext } from './node-execution-context';
export declare class WebhookContext extends NodeExecutionContext implements IWebhookFunctions {
    private readonly webhookData;
    private readonly closeFunctions;
    readonly helpers: IWebhookFunctions['helpers'];
    readonly nodeHelpers: IWebhookFunctions['nodeHelpers'];
    constructor(workflow: Workflow, node: INode, additionalData: IWorkflowExecuteAdditionalData, mode: WorkflowExecuteMode, webhookData: IWebhookData, closeFunctions: CloseFunction[], runExecutionData: IRunExecutionData | null);
    getCredentials<T extends object = ICredentialDataDecryptedObject>(type: string): Promise<T>;
    getBodyData(): IDataObject;
    getHeaderData(): import("http").IncomingHttpHeaders;
    getParamsData(): object;
    getQueryData(): object;
    getRequestObject(): Request;
    getResponseObject(): Response;
    private assertHttpRequest;
    getNodeWebhookUrl(name: WebhookType): string | undefined;
    getWebhookName(): WebhookType;
    validateCookieAuth(cookieValue: string): Promise<void>;
    getInputConnectionData(connectionType: AINodeConnectionType, itemIndex: number): Promise<unknown>;
}
