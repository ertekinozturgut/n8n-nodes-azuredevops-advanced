"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndpointsConfig = void 0;
const decorators_1 = require("../decorators");
let PrometheusMetricsConfig = class PrometheusMetricsConfig {
    constructor() {
        this.enable = false;
        this.prefix = 'n8n_';
        this.includeDefaultMetrics = true;
        this.includeWorkflowIdLabel = false;
        this.includeNodeTypeLabel = false;
        this.includeCredentialTypeLabel = false;
        this.includeApiEndpoints = false;
        this.includeApiPathLabel = false;
        this.includeApiMethodLabel = false;
        this.includeApiStatusCodeLabel = false;
        this.includeCacheMetrics = false;
        this.includeMessageEventBusMetrics = false;
        this.includeQueueMetrics = false;
        this.queueMetricsInterval = 20;
        this.activeWorkflowCountInterval = 60;
        this.includeWorkflowNameLabel = false;
        this.includeWorkflowStatistics = false;
        this.workflowStatisticsInterval = 300;
    }
};
__decorate([
    (0, decorators_1.Env)('N8N_METRICS'),
    __metadata("design:type", Boolean)
], PrometheusMetricsConfig.prototype, "enable", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_METRICS_PREFIX'),
    __metadata("design:type", String)
], PrometheusMetricsConfig.prototype, "prefix", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_METRICS_INCLUDE_DEFAULT_METRICS'),
    __metadata("design:type", Boolean)
], PrometheusMetricsConfig.prototype, "includeDefaultMetrics", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_METRICS_INCLUDE_WORKFLOW_ID_LABEL'),
    __metadata("design:type", Boolean)
], PrometheusMetricsConfig.prototype, "includeWorkflowIdLabel", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_METRICS_INCLUDE_NODE_TYPE_LABEL'),
    __metadata("design:type", Boolean)
], PrometheusMetricsConfig.prototype, "includeNodeTypeLabel", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_METRICS_INCLUDE_CREDENTIAL_TYPE_LABEL'),
    __metadata("design:type", Boolean)
], PrometheusMetricsConfig.prototype, "includeCredentialTypeLabel", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_METRICS_INCLUDE_API_ENDPOINTS'),
    __metadata("design:type", Boolean)
], PrometheusMetricsConfig.prototype, "includeApiEndpoints", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_METRICS_INCLUDE_API_PATH_LABEL'),
    __metadata("design:type", Boolean)
], PrometheusMetricsConfig.prototype, "includeApiPathLabel", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_METRICS_INCLUDE_API_METHOD_LABEL'),
    __metadata("design:type", Boolean)
], PrometheusMetricsConfig.prototype, "includeApiMethodLabel", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_METRICS_INCLUDE_API_STATUS_CODE_LABEL'),
    __metadata("design:type", Boolean)
], PrometheusMetricsConfig.prototype, "includeApiStatusCodeLabel", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_METRICS_INCLUDE_CACHE_METRICS'),
    __metadata("design:type", Boolean)
], PrometheusMetricsConfig.prototype, "includeCacheMetrics", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_METRICS_INCLUDE_MESSAGE_EVENT_BUS_METRICS'),
    __metadata("design:type", Boolean)
], PrometheusMetricsConfig.prototype, "includeMessageEventBusMetrics", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_METRICS_INCLUDE_QUEUE_METRICS'),
    __metadata("design:type", Boolean)
], PrometheusMetricsConfig.prototype, "includeQueueMetrics", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_METRICS_QUEUE_METRICS_INTERVAL'),
    __metadata("design:type", Number)
], PrometheusMetricsConfig.prototype, "queueMetricsInterval", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_METRICS_ACTIVE_WORKFLOW_METRIC_INTERVAL'),
    __metadata("design:type", Number)
], PrometheusMetricsConfig.prototype, "activeWorkflowCountInterval", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_METRICS_INCLUDE_WORKFLOW_NAME_LABEL'),
    __metadata("design:type", Boolean)
], PrometheusMetricsConfig.prototype, "includeWorkflowNameLabel", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_METRICS_INCLUDE_WORKFLOW_STATISTICS'),
    __metadata("design:type", Boolean)
], PrometheusMetricsConfig.prototype, "includeWorkflowStatistics", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_METRICS_WORKFLOW_STATISTICS_INTERVAL'),
    __metadata("design:type", Number)
], PrometheusMetricsConfig.prototype, "workflowStatisticsInterval", void 0);
PrometheusMetricsConfig = __decorate([
    decorators_1.Config
], PrometheusMetricsConfig);
let EndpointsConfig = class EndpointsConfig {
    constructor() {
        this.payloadSizeMax = 16;
        this.formDataFileSizeMax = 200;
        this.rest = 'rest';
        this.form = 'form';
        this.formTest = 'form-test';
        this.formWaiting = 'form-waiting';
        this.webhook = 'webhook';
        this.webhookTest = 'webhook-test';
        this.webhookWaiting = 'webhook-waiting';
        this.mcp = 'mcp';
        this.mcpTest = 'mcp-test';
        this.disableUi = false;
        this.disableProductionWebhooksOnMainProcess = false;
        this.additionalNonUIRoutes = '';
    }
};
exports.EndpointsConfig = EndpointsConfig;
__decorate([
    (0, decorators_1.Env)('N8N_PAYLOAD_SIZE_MAX'),
    __metadata("design:type", Number)
], EndpointsConfig.prototype, "payloadSizeMax", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_FORMDATA_FILE_SIZE_MAX'),
    __metadata("design:type", Number)
], EndpointsConfig.prototype, "formDataFileSizeMax", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", PrometheusMetricsConfig)
], EndpointsConfig.prototype, "metrics", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_ENDPOINT_REST'),
    __metadata("design:type", String)
], EndpointsConfig.prototype, "rest", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_ENDPOINT_FORM'),
    __metadata("design:type", String)
], EndpointsConfig.prototype, "form", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_ENDPOINT_FORM_TEST'),
    __metadata("design:type", String)
], EndpointsConfig.prototype, "formTest", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_ENDPOINT_FORM_WAIT'),
    __metadata("design:type", String)
], EndpointsConfig.prototype, "formWaiting", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_ENDPOINT_WEBHOOK'),
    __metadata("design:type", String)
], EndpointsConfig.prototype, "webhook", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_ENDPOINT_WEBHOOK_TEST'),
    __metadata("design:type", String)
], EndpointsConfig.prototype, "webhookTest", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_ENDPOINT_WEBHOOK_WAIT'),
    __metadata("design:type", String)
], EndpointsConfig.prototype, "webhookWaiting", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_ENDPOINT_MCP'),
    __metadata("design:type", String)
], EndpointsConfig.prototype, "mcp", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_ENDPOINT_MCP_TEST'),
    __metadata("design:type", String)
], EndpointsConfig.prototype, "mcpTest", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_DISABLE_UI'),
    __metadata("design:type", Boolean)
], EndpointsConfig.prototype, "disableUi", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_DISABLE_PRODUCTION_MAIN_PROCESS'),
    __metadata("design:type", Boolean)
], EndpointsConfig.prototype, "disableProductionWebhooksOnMainProcess", void 0);
__decorate([
    (0, decorators_1.Env)('N8N_ADDITIONAL_NON_UI_ROUTES'),
    __metadata("design:type", String)
], EndpointsConfig.prototype, "additionalNonUIRoutes", void 0);
exports.EndpointsConfig = EndpointsConfig = __decorate([
    decorators_1.Config
], EndpointsConfig);
//# sourceMappingURL=endpoints.config.js.map