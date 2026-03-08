import type { DataTableProxyProvider } from 'n8n-workflow';
import type { ExecutionLifecycleHooks } from './execution-lifecycle-hooks';
import type { ExternalSecretsProxy } from './external-secrets-proxy';
declare module 'n8n-workflow' {
    interface IWorkflowExecuteAdditionalData {
        hooks?: ExecutionLifecycleHooks;
        externalSecretsProxy: ExternalSecretsProxy;
        'data-table'?: {
            dataTableProxyProvider: DataTableProxyProvider;
        };
        dataTableProjectId?: string;
    }
}
export * from './active-workflows';
export type * from './interfaces';
export * from './routing-node';
export * from './node-execution-context';
export * from './partial-execution-utils';
export * from './node-execution-context/utils/execution-metadata';
export * from './workflow-execute';
export * from './execution-context-hook-registry.service';
export { ExecutionLifecycleHooks } from './execution-lifecycle-hooks';
export { ExternalSecretsProxy, type IExternalSecretsManager } from './external-secrets-proxy';
export { isEngineRequest } from './requests-response';
