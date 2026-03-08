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
exports.anyReachableRootHasRunData = anyReachableRootHasRunData;
exports.findTriggerForPartialExecution = findTriggerForPartialExecution;
const assert = __importStar(require("assert/strict"));
const isTriggerNode = (nodeType) => nodeType.description.group.includes('trigger');
function findAllParentTriggers(workflow, destinationNodeName) {
    const parentNodes = workflow
        .getParentNodes(destinationNodeName)
        .map((name) => {
        const node = workflow.getNode(name);
        assert.ok(node);
        return {
            node,
            nodeType: workflow.nodeTypes.getByNameAndVersion(node.type, node.typeVersion),
        };
    })
        .filter((value) => value !== null)
        .filter(({ nodeType }) => isTriggerNode(nodeType))
        .map(({ node }) => node);
    return parentNodes;
}
function anyReachableRootHasRunData(workflow, destinationNodeName, runData) {
    const destinationNode = workflow.getNodes().get(destinationNodeName);
    if (!destinationNode)
        return false;
    const parentConnections = workflow.getParentConnections(destinationNode);
    const parentNodes = new Set();
    for (const connection of parentConnections) {
        parentNodes.add(connection.from);
    }
    const rootNodes = new Set();
    for (const parentNode of parentNodes) {
        const hasParents = workflow.getDirectParentConnections(parentNode).length > 0;
        if (!hasParents) {
            rootNodes.add(parentNode);
        }
    }
    for (const rootNode of rootNodes) {
        if (runData[rootNode.name]) {
            return true;
        }
    }
    return false;
}
function findTriggerForPartialExecution(workflow, destinationNodeName, runData) {
    const destinationNode = workflow.getNode(destinationNodeName);
    if (!destinationNode)
        return;
    const destinationNodeType = workflow.nodeTypes.getByNameAndVersion(destinationNode.type, destinationNode.typeVersion);
    if (isTriggerNode(destinationNodeType) && !destinationNode.disabled) {
        return destinationNode;
    }
    const parentTriggers = findAllParentTriggers(workflow, destinationNodeName).filter((trigger) => !trigger.disabled);
    for (const trigger of parentTriggers) {
        if (runData[trigger.name]) {
            return trigger;
        }
    }
    const pinnedTriggers = parentTriggers
        .filter((trigger) => workflow.pinData?.[trigger.name])
        .sort((a, b) => (a.type.endsWith('webhook') ? -1 : b.type.endsWith('webhook') ? 1 : 0));
    if (pinnedTriggers.length) {
        return pinnedTriggers[0];
    }
    const webhookTriggers = parentTriggers.filter((trigger) => trigger.type.endsWith('webhook'));
    return webhookTriggers.length > 0 ? webhookTriggers[0] : parentTriggers[0];
}
//# sourceMappingURL=find-trigger-for-partial-execution.js.map