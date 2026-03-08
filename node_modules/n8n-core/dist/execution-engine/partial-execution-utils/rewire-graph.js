"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewireGraph = rewireGraph;
const constants_1 = require("@n8n/constants");
const a = __importStar(require("assert/strict"));
const n8n_workflow_1 = require("n8n-workflow");
function rewireGraph(tool, graph, agentRequest) {
    const modifiedGraph = graph.clone();
    const children = modifiedGraph.getChildren(tool);
    if (children.size === 0) {
        return graph;
    }
    const rootNode = [...children][children.size - 1];
    a.ok(rootNode);
    const allIncomingConnection = modifiedGraph
        .getDirectParentConnections(rootNode)
        .filter((cn) => cn.type === n8n_workflow_1.NodeConnectionTypes.Main);
    const toolExecutor = {
        name: constants_1.TOOL_EXECUTOR_NODE_NAME,
        disabled: false,
        type: '@n8n/n8n-nodes-langchain.toolExecutor',
        parameters: {
            query: agentRequest?.query ?? {},
            toolName: agentRequest?.tool?.name ?? '',
        },
        id: rootNode.id,
        typeVersion: 0,
        position: [0, 0],
    };
    modifiedGraph.addNode(toolExecutor);
    tool.rewireOutputLogTo = n8n_workflow_1.NodeConnectionTypes.AiTool;
    modifiedGraph.addConnection({ from: tool, to: toolExecutor, type: n8n_workflow_1.NodeConnectionTypes.AiTool });
    for (const cn of allIncomingConnection) {
        modifiedGraph.addConnection({ from: cn.from, to: toolExecutor, type: cn.type });
    }
    modifiedGraph.removeNode(rootNode);
    return modifiedGraph;
}
//# sourceMappingURL=rewire-graph.js.map