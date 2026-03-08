"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HookContext = void 0;
const errors_1 = require("@n8n/errors");
const node_execution_context_1 = require("./node-execution-context");
const request_helper_functions_1 = require("./utils/request-helper-functions");
const webhook_helper_functions_1 = require("./utils/webhook-helper-functions");
class HookContext extends node_execution_context_1.NodeExecutionContext {
    constructor(workflow, node, additionalData, mode, activation, webhookData) {
        super(workflow, node, additionalData, mode);
        this.activation = activation;
        this.webhookData = webhookData;
        this.helpers = (0, request_helper_functions_1.getRequestHelperFunctions)(workflow, node, additionalData);
    }
    getActivationMode() {
        return this.activation;
    }
    async getCredentials(type) {
        return await this._getCredentials(type);
    }
    getNodeWebhookUrl(name) {
        return (0, webhook_helper_functions_1.getNodeWebhookUrl)(name, this.workflow, this.node, this.additionalData, this.mode, this.additionalKeys, this.webhookData?.isTest);
    }
    getWebhookName() {
        if (this.webhookData === undefined) {
            throw new errors_1.ApplicationError('Only supported in webhook functions');
        }
        return this.webhookData.webhookDescription.name;
    }
    getWebhookDescription(name) {
        return (0, webhook_helper_functions_1.getWebhookDescription)(name, this.workflow, this.node);
    }
}
exports.HookContext = HookContext;
//# sourceMappingURL=hook-context.js.map