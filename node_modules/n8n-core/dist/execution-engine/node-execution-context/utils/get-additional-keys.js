"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdditionalKeys = getAdditionalKeys;
const n8n_workflow_1 = require("n8n-workflow");
const constants_1 = require("../../../constants");
const execution_metadata_1 = require("./execution-metadata");
const get_secrets_proxy_1 = require("./get-secrets-proxy");
function getAdditionalKeys(additionalData, mode, runExecutionData, options) {
    const executionId = additionalData.executionId ?? constants_1.PLACEHOLDER_EMPTY_EXECUTION_ID;
    const resumeUrl = `${additionalData.webhookWaitingBaseUrl}/${executionId}`;
    const resumeFormUrl = `${additionalData.formWaitingBaseUrl}/${executionId}`;
    return {
        $execution: {
            id: executionId,
            mode: mode === 'manual' ? 'test' : 'production',
            resumeUrl,
            resumeFormUrl,
            customData: runExecutionData
                ? {
                    set(key, value) {
                        try {
                            (0, execution_metadata_1.setWorkflowExecutionMetadata)(runExecutionData, key, value);
                        }
                        catch (e) {
                            if (mode === 'manual') {
                                throw e;
                            }
                            n8n_workflow_1.LoggerProxy.debug(e.message);
                        }
                    },
                    setAll(obj) {
                        try {
                            (0, execution_metadata_1.setAllWorkflowExecutionMetadata)(runExecutionData, obj);
                        }
                        catch (e) {
                            if (mode === 'manual') {
                                throw e;
                            }
                            n8n_workflow_1.LoggerProxy.debug(e.message);
                        }
                    },
                    get(key) {
                        return (0, execution_metadata_1.getWorkflowExecutionMetadata)(runExecutionData, key);
                    },
                    getAll() {
                        return (0, execution_metadata_1.getAllWorkflowExecutionMetadata)(runExecutionData);
                    },
                }
                : undefined,
        },
        $vars: additionalData.variables,
        $secrets: options?.secretsEnabled ? (0, get_secrets_proxy_1.getSecretsProxy)(additionalData) : undefined,
        $executionId: executionId,
        $resumeWebhookUrl: resumeUrl,
    };
}
//# sourceMappingURL=get-additional-keys.js.map