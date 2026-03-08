"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebhookDescription = getWebhookDescription;
exports.getNodeWebhookUrl = getNodeWebhookUrl;
const n8n_workflow_1 = require("n8n-workflow");
function getWebhookDescription(name, workflow, node) {
    const nodeType = workflow.nodeTypes.getByNameAndVersion(node.type, node.typeVersion);
    if (nodeType.description.webhooks === undefined)
        return;
    for (const webhookDescription of nodeType.description.webhooks) {
        if (webhookDescription.name === name) {
            return webhookDescription;
        }
    }
    return undefined;
}
function getNodeWebhookUrl(name, workflow, node, additionalData, mode, additionalKeys, isTest) {
    let baseUrl = additionalData.webhookBaseUrl;
    if (isTest === true) {
        baseUrl = additionalData.webhookTestBaseUrl;
    }
    const webhookDescription = getWebhookDescription(name, workflow, node);
    if (webhookDescription === undefined)
        return;
    const path = workflow.expression.getSimpleParameterValue(node, webhookDescription.path, mode, additionalKeys);
    if (path === undefined)
        return;
    const isFullPath = workflow.expression.getSimpleParameterValue(node, webhookDescription.isFullPath, mode, additionalKeys, undefined, false);
    return n8n_workflow_1.NodeHelpers.getNodeWebhookUrl(baseUrl, workflow.id, node, path.toString(), isFullPath);
}
//# sourceMappingURL=webhook-helper-functions.js.map