"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNodeAsTool = createNodeAsTool;
const tools_1 = require("@langchain/core/tools");
const n8n_workflow_1 = require("n8n-workflow");
const zod_1 = require("zod");
function getSchema(node) {
    const collectedArguments = [];
    try {
        (0, n8n_workflow_1.traverseNodeParameters)(node.parameters, collectedArguments);
    }
    catch (error) {
        throw new n8n_workflow_1.NodeOperationError(node, error);
    }
    const nameValidationRegex = /^[a-zA-Z0-9_-]{1,64}$/;
    const keyMap = new Map();
    for (const argument of collectedArguments) {
        if (argument.key.length === 0 || !nameValidationRegex.test(argument.key)) {
            const isEmptyError = 'You must specify a key when using $fromAI()';
            const isInvalidError = `Parameter key \`${argument.key}\` is invalid`;
            const error = new Error(argument.key.length === 0 ? isEmptyError : isInvalidError);
            throw new n8n_workflow_1.NodeOperationError(node, error, {
                description: 'Invalid parameter key, must be between 1 and 64 characters long and only contain letters, numbers, underscores, and hyphens',
            });
        }
        if (keyMap.has(argument.key)) {
            const existingArg = keyMap.get(argument.key);
            if (existingArg.description !== argument.description || existingArg.type !== argument.type) {
                throw new n8n_workflow_1.NodeOperationError(node, `Duplicate key '${argument.key}' found with different description or type`, {
                    description: 'Ensure all $fromAI() calls with the same key have consistent descriptions and types',
                });
            }
        }
        else {
            keyMap.set(argument.key, argument);
        }
    }
    const uniqueArgsMap = collectedArguments.reduce((map, arg) => {
        map.set(arg.key, arg);
        return map;
    }, new Map());
    const uniqueArguments = Array.from(uniqueArgsMap.values());
    const schemaObj = uniqueArguments.reduce((acc, placeholder) => {
        acc[placeholder.key] = (0, n8n_workflow_1.generateZodSchema)(placeholder);
        return acc;
    }, {});
    return zod_1.z.object(schemaObj).required();
}
function createTool(options) {
    const { node, nodeType, handleToolInvocation } = options;
    const schema = getSchema(node);
    const description = n8n_workflow_1.NodeHelpers.getToolDescriptionForNode(node, nodeType);
    const nodeName = (0, n8n_workflow_1.nodeNameToToolName)(node);
    const name = nodeName || nodeType.description.name;
    return new tools_1.DynamicStructuredTool({
        name,
        description,
        schema,
        func: async (toolArgs) => await handleToolInvocation(toolArgs),
    });
}
function createNodeAsTool(options) {
    return { response: createTool(options) };
}
//# sourceMappingURL=create-node-as-tool.js.map