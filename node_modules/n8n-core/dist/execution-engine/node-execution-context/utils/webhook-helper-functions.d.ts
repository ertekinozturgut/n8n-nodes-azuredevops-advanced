import type { WebhookType, Workflow, INode, IWorkflowExecuteAdditionalData, WorkflowExecuteMode, IWorkflowDataProxyAdditionalKeys, IWebhookDescription } from 'n8n-workflow';
export declare function getWebhookDescription(name: WebhookType, workflow: Workflow, node: INode): IWebhookDescription | undefined;
export declare function getNodeWebhookUrl(name: WebhookType, workflow: Workflow, node: INode, additionalData: IWorkflowExecuteAdditionalData, mode: WorkflowExecuteMode, additionalKeys: IWorkflowDataProxyAdditionalKeys, isTest?: boolean): string | undefined;
