"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalLoadOptionsContext = void 0;
const get_1 = __importDefault(require("lodash/get"));
const n8n_workflow_1 = require("n8n-workflow");
const workflow_node_context_1 = require("./workflow-node-context");
class LocalLoadOptionsContext {
    constructor(nodeTypes, additionalData, path, workflowLoader) {
        this.nodeTypes = nodeTypes;
        this.additionalData = additionalData;
        this.path = path;
        this.workflowLoader = workflowLoader;
    }
    async getWorkflowNodeContext(nodeType) {
        const { value: workflowId } = this.getCurrentNodeParameter('workflowId');
        if (typeof workflowId !== 'string' || !workflowId) {
            throw new n8n_workflow_1.ApplicationError(`No workflowId parameter defined on node of type "${nodeType}"!`);
        }
        const dbWorkflow = await this.workflowLoader.get(workflowId);
        const selectedWorkflowNode = dbWorkflow.nodes.find((node) => node.type === nodeType);
        if (selectedWorkflowNode) {
            const selectedSingleNodeWorkflow = new n8n_workflow_1.Workflow({
                id: dbWorkflow.id,
                name: dbWorkflow.name,
                nodes: [selectedWorkflowNode],
                connections: {},
                active: false,
                nodeTypes: this.nodeTypes,
            });
            const workflowAdditionalData = {
                ...this.additionalData,
                currentNodeParameters: selectedWorkflowNode.parameters,
            };
            return new workflow_node_context_1.LoadWorkflowNodeContext(selectedSingleNodeWorkflow, selectedWorkflowNode, workflowAdditionalData);
        }
        return null;
    }
    getCurrentNodeParameter(parameterPath) {
        const nodeParameters = this.additionalData.currentNodeParameters;
        parameterPath = (0, n8n_workflow_1.resolveRelativePath)(this.path, parameterPath);
        return (0, get_1.default)(nodeParameters, parameterPath);
    }
}
exports.LocalLoadOptionsContext = LocalLoadOptionsContext;
//# sourceMappingURL=local-load-options-context.js.map