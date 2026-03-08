"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriggersAndPollers = void 0;
const di_1 = require("@n8n/di");
const errors_1 = require("@n8n/errors");
const node_assert_1 = __importDefault(require("node:assert"));
let TriggersAndPollers = class TriggersAndPollers {
    async runTrigger(workflow, node, getTriggerFunctions, additionalData, mode, activation) {
        const triggerFunctions = getTriggerFunctions(workflow, node, additionalData, mode, activation);
        const nodeType = workflow.nodeTypes.getByNameAndVersion(node.type, node.typeVersion);
        if (!nodeType.trigger) {
            throw new errors_1.ApplicationError('Node type does not have a trigger function defined', {
                extra: { nodeName: node.name },
                tags: { nodeType: node.type },
            });
        }
        if (mode === 'manual') {
            const triggerResponse = await nodeType.trigger.call(triggerFunctions);
            triggerResponse.manualTriggerResponse = new Promise((resolve, reject) => {
                const { hooks } = additionalData;
                node_assert_1.default.ok(hooks, 'Execution lifecycle hooks are not defined');
                triggerFunctions.emit = (data, responsePromise, donePromise) => {
                    if (responsePromise) {
                        hooks.addHandler('sendResponse', (response) => responsePromise.resolve(response));
                    }
                    if (donePromise) {
                        hooks.addHandler('workflowExecuteAfter', (runData) => donePromise.resolve(runData));
                    }
                    resolve(data);
                };
                triggerFunctions.emitError = (error, responsePromise) => {
                    if (responsePromise) {
                        hooks.addHandler('sendResponse', () => responsePromise.reject(error));
                    }
                    reject(error);
                };
            });
            return triggerResponse;
        }
        return await nodeType.trigger.call(triggerFunctions);
    }
    async runPoll(workflow, node, pollFunctions) {
        const nodeType = workflow.nodeTypes.getByNameAndVersion(node.type, node.typeVersion);
        if (!nodeType.poll) {
            throw new errors_1.ApplicationError('Node type does not have a poll function defined', {
                extra: { nodeName: node.name },
                tags: { nodeType: node.type },
            });
        }
        return await nodeType.poll.call(pollFunctions);
    }
};
exports.TriggersAndPollers = TriggersAndPollers;
exports.TriggersAndPollers = TriggersAndPollers = __decorate([
    (0, di_1.Service)()
], TriggersAndPollers);
//# sourceMappingURL=triggers-and-pollers.js.map