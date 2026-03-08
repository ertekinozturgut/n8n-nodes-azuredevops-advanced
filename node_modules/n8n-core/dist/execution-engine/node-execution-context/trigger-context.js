"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriggerContext = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const node_execution_context_1 = require("./node-execution-context");
const binary_helper_functions_1 = require("./utils/binary-helper-functions");
const request_helper_functions_1 = require("./utils/request-helper-functions");
const return_json_array_1 = require("./utils/return-json-array");
const scheduling_helper_functions_1 = require("./utils/scheduling-helper-functions");
const ssh_tunnel_helper_functions_1 = require("./utils/ssh-tunnel-helper-functions");
const throwOnEmit = () => {
    throw new n8n_workflow_1.ApplicationError('Overwrite TriggerContext.emit function');
};
const throwOnEmitError = () => {
    throw new n8n_workflow_1.ApplicationError('Overwrite TriggerContext.emitError function');
};
class TriggerContext extends node_execution_context_1.NodeExecutionContext {
    constructor(workflow, node, additionalData, mode, activation, emit = throwOnEmit, emitError = throwOnEmitError) {
        super(workflow, node, additionalData, mode);
        this.activation = activation;
        this.emit = emit;
        this.emitError = emitError;
        this.helpers = {
            createDeferredPromise: n8n_workflow_1.createDeferredPromise,
            returnJsonArray: return_json_array_1.returnJsonArray,
            ...(0, ssh_tunnel_helper_functions_1.getSSHTunnelFunctions)(),
            ...(0, request_helper_functions_1.getRequestHelperFunctions)(workflow, node, additionalData),
            ...(0, binary_helper_functions_1.getBinaryHelperFunctions)(additionalData, workflow.id),
            ...(0, scheduling_helper_functions_1.getSchedulingFunctions)(workflow.id, workflow.timezone, node.id),
        };
    }
    getActivationMode() {
        return this.activation;
    }
    async getCredentials(type) {
        return await this._getCredentials(type);
    }
}
exports.TriggerContext = TriggerContext;
//# sourceMappingURL=trigger-context.js.map