"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExecutePollFunctions = getExecutePollFunctions;
exports.getExecuteTriggerFunctions = getExecuteTriggerFunctions;
const node_execution_context_1 = require("./execution-engine/node-execution-context");
function getExecutePollFunctions(workflow, node, additionalData, mode, activation) {
    return new node_execution_context_1.PollContext(workflow, node, additionalData, mode, activation);
}
function getExecuteTriggerFunctions(workflow, node, additionalData, mode, activation) {
    return new node_execution_context_1.TriggerContext(workflow, node, additionalData, mode, activation);
}
//# sourceMappingURL=node-execute-functions.js.map