"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateValueAgainstSchema = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const validateResourceMapperValue = (parameterName, paramValues, node, resourceMapperTypeOptions) => {
    const result = { valid: true, newValue: paramValues };
    const skipRequiredCheck = resourceMapperTypeOptions?.mode !== 'add';
    const enableTypeValidationOptions = Boolean(resourceMapperTypeOptions?.showTypeConversionOptions);
    const paramNameParts = parameterName.split('.');
    if (paramNameParts.length !== 2) {
        return result;
    }
    const resourceMapperParamName = paramNameParts[0];
    const resourceMapperField = node.parameters[resourceMapperParamName];
    if (!resourceMapperField || !(0, n8n_workflow_1.isResourceMapperValue)(resourceMapperField)) {
        return result;
    }
    const schema = resourceMapperField.schema;
    const paramValueNames = Object.keys(paramValues);
    for (let i = 0; i < paramValueNames.length; i++) {
        const key = paramValueNames[i];
        const resolvedValue = paramValues[key];
        const schemaEntry = schema.find((s) => s.id === key);
        if (!skipRequiredCheck &&
            schemaEntry?.required === true &&
            schemaEntry.type !== 'boolean' &&
            (resolvedValue === undefined || resolvedValue === null)) {
            return {
                valid: false,
                errorMessage: `The value "${String(key)}" is required but not set`,
                fieldName: key,
            };
        }
        if (schemaEntry?.type) {
            const validationResult = (0, n8n_workflow_1.validateFieldType)(key, resolvedValue, schemaEntry.type, {
                valueOptions: schemaEntry.options,
                strict: enableTypeValidationOptions && !resourceMapperField.attemptToConvertTypes,
                parseStrings: enableTypeValidationOptions && resourceMapperField.convertFieldsToString,
            });
            if (!validationResult.valid) {
                return { ...validationResult, fieldName: key };
            }
            else {
                paramValues[key] = validationResult.newValue;
            }
        }
    }
    return result;
};
const validateCollection = (node, runIndex, itemIndex, propertyDescription, parameterPath, validationResult) => {
    let nestedDescriptions;
    if (propertyDescription.type === 'fixedCollection') {
        nestedDescriptions = propertyDescription.options.find((entry) => entry.name === parameterPath[1])?.values;
    }
    if (propertyDescription.type === 'collection') {
        nestedDescriptions = propertyDescription.options;
    }
    if (!nestedDescriptions) {
        return validationResult;
    }
    const validationMap = {};
    for (const prop of nestedDescriptions) {
        if (!prop.validateType || prop.ignoreValidationDuringExecution)
            continue;
        validationMap[prop.name] = {
            type: prop.validateType,
            displayName: prop.displayName,
            options: prop.validateType === 'options' ? prop.options : undefined,
        };
    }
    if (!Object.keys(validationMap).length) {
        return validationResult;
    }
    if (validationResult.valid) {
        for (const value of Array.isArray(validationResult.newValue)
            ? validationResult.newValue
            : [validationResult.newValue]) {
            for (const key of Object.keys(value)) {
                if (!validationMap[key])
                    continue;
                const fieldValidationResult = (0, n8n_workflow_1.validateFieldType)(key, value[key], validationMap[key].type, {
                    valueOptions: validationMap[key].options,
                });
                if (!fieldValidationResult.valid) {
                    throw new n8n_workflow_1.ExpressionError(`Invalid input for field '${validationMap[key].displayName}' inside '${propertyDescription.displayName}' in [item ${itemIndex}]`, {
                        description: fieldValidationResult.errorMessage,
                        runIndex,
                        itemIndex,
                        nodeCause: node.name,
                    });
                }
                value[key] = fieldValidationResult.newValue;
            }
        }
    }
    return validationResult;
};
const validateValueAgainstSchema = (node, nodeType, parameterValue, parameterName, runIndex, itemIndex) => {
    const parameterPath = parameterName.split('.');
    const propertyDescription = nodeType.description.properties.find((prop) => parameterPath[0] === prop.name &&
        n8n_workflow_1.NodeHelpers.displayParameter(node.parameters, prop, node, nodeType.description));
    if (!propertyDescription) {
        return parameterValue;
    }
    let validationResult = { valid: true, newValue: parameterValue };
    if (parameterPath.length === 1 &&
        propertyDescription.validateType &&
        !propertyDescription.ignoreValidationDuringExecution) {
        validationResult = (0, n8n_workflow_1.validateFieldType)(parameterName, parameterValue, propertyDescription.validateType);
    }
    else if (propertyDescription.type === 'resourceMapper' &&
        parameterPath[1] === 'value' &&
        typeof parameterValue === 'object') {
        validationResult = validateResourceMapperValue(parameterName, parameterValue, node, propertyDescription.typeOptions?.resourceMapper);
    }
    else if (['fixedCollection', 'collection'].includes(propertyDescription.type)) {
        validationResult = validateCollection(node, runIndex, itemIndex, propertyDescription, parameterPath, validationResult);
    }
    if (!validationResult.valid) {
        throw new n8n_workflow_1.ExpressionError(`Invalid input for '${validationResult.fieldName
            ? String(validationResult.fieldName)
            : propertyDescription.displayName}' [item ${itemIndex}]`, {
            description: validationResult.errorMessage,
            runIndex,
            itemIndex,
            nodeCause: node.name,
        });
    }
    return validationResult.newValue;
};
exports.validateValueAgainstSchema = validateValueAgainstSchema;
//# sourceMappingURL=validate-value-against-schema.js.map