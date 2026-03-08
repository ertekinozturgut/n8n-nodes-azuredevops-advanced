declare class PrometheusMetricsConfig {
    enable: boolean;
    prefix: string;
    includeDefaultMetrics: boolean;
    includeWorkflowIdLabel: boolean;
    includeNodeTypeLabel: boolean;
    includeCredentialTypeLabel: boolean;
    includeApiEndpoints: boolean;
    includeApiPathLabel: boolean;
    includeApiMethodLabel: boolean;
    includeApiStatusCodeLabel: boolean;
    includeCacheMetrics: boolean;
    includeMessageEventBusMetrics: boolean;
    includeQueueMetrics: boolean;
    queueMetricsInterval: number;
    activeWorkflowCountInterval: number;
    includeWorkflowNameLabel: boolean;
    includeWorkflowStatistics: boolean;
    workflowStatisticsInterval: number;
}
export declare class EndpointsConfig {
    payloadSizeMax: number;
    formDataFileSizeMax: number;
    metrics: PrometheusMetricsConfig;
    rest: string;
    form: string;
    formTest: string;
    formWaiting: string;
    webhook: string;
    webhookTest: string;
    webhookWaiting: string;
    mcp: string;
    mcpTest: string;
    disableUi: boolean;
    disableProductionWebhooksOnMainProcess: boolean;
    additionalNonUIRoutes: string;
}
export {};
