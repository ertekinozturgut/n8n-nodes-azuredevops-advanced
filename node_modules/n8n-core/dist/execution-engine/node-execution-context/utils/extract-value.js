"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractValue = extractValue;
const get_1 = __importDefault(require("lodash/get"));
const n8n_workflow_1 = require("n8n-workflow");
function findPropertyFromParameterName(parameterName, nodeType, node, nodeParameters) {
    let property;
    const paramParts = parameterName.split('.');
    let currentParamPath = '';
    const findProp = (name, options) => {
        return options.find((i) => i.name === name &&
            n8n_workflow_1.NodeHelpers.displayParameterPath(nodeParameters, i, currentParamPath, node, nodeType.description));
    };
    for (const p of paramParts) {
        const param = p.split('[')[0];
        if (!property) {
            property = findProp(param, nodeType.description.properties);
        }
        else if ('options' in property && property.options) {
            property = findProp(param, property.options);
            currentParamPath += `.${param}`;
        }
        else if ('values' in property) {
            property = findProp(param, property.values);
            currentParamPath += `.${param}`;
        }
        else {
            throw new n8n_workflow_1.ApplicationError('Could not find property', { extra: { parameterName } });
        }
        if (!property) {
            throw new n8n_workflow_1.ApplicationError('Could not find property', { extra: { parameterName } });
        }
    }
    if (!property) {
        throw new n8n_workflow_1.ApplicationError('Could not find property', { extra: { parameterName } });
    }
    return property;
}
function executeRegexExtractValue(value, regex, parameterName, parameterDisplayName) {
    const extracted = regex.exec(value);
    if (!extracted) {
        throw new n8n_workflow_1.WorkflowOperationError(`ERROR: ${parameterDisplayName} parameter's value is invalid. This is likely because the URL entered is incorrect`);
    }
    if (extracted.length < 2 || extracted.length > 2) {
        throw new n8n_workflow_1.WorkflowOperationError(`Property "${parameterName}" has an invalid extractValue regex "${regex.source}". extractValue expects exactly one group to be returned.`);
    }
    return extracted[1];
}
function extractValueRLC(value, property, parameterName) {
    if (typeof value !== 'object' || !value || !('mode' in value) || !('value' in value)) {
        return value;
    }
    const modeProp = (property.modes ?? []).find((i) => i.name === value.mode);
    if (!modeProp) {
        return value.value;
    }
    if (!('extractValue' in modeProp) || !modeProp.extractValue) {
        return value.value;
    }
    if (typeof value.value !== 'string') {
        let typeName = value.value?.constructor.name;
        if (value.value === null) {
            typeName = 'null';
        }
        else if (typeName === undefined) {
            typeName = 'undefined';
        }
        n8n_workflow_1.LoggerProxy.error(`Only strings can be passed to extractValue. Parameter "${parameterName}" passed "${typeName}"`);
        throw new n8n_workflow_1.ApplicationError("ERROR: This parameter's value is invalid. Please enter a valid mode.", { extra: { parameter: property.displayName, modeProp: modeProp.displayName } });
    }
    if (modeProp.extractValue.type !== 'regex') {
        throw new n8n_workflow_1.ApplicationError('Property with unknown `extractValue`', {
            extra: { parameter: parameterName, extractValueType: modeProp.extractValue.type },
        });
    }
    const regex = new RegExp(modeProp.extractValue.regex);
    return executeRegexExtractValue(value.value, regex, parameterName, property.displayName);
}
function extractValueFilter(value, property, parameterName, itemIndex) {
    if (!(0, n8n_workflow_1.isFilterValue)(value)) {
        return value;
    }
    if (property.extractValue?.type) {
        throw new n8n_workflow_1.ApplicationError(`Property "${parameterName}" has an invalid extractValue type. Filter parameters only support extractValue: true`, { extra: { parameter: parameterName } });
    }
    return (0, n8n_workflow_1.executeFilter)(value, { itemIndex });
}
function extractValueOther(value, property, parameterName) {
    if (!('extractValue' in property) || !property.extractValue) {
        return value;
    }
    if (typeof value !== 'string') {
        let typeName = value?.constructor.name;
        if (value === null) {
            typeName = 'null';
        }
        else if (typeName === undefined) {
            typeName = 'undefined';
        }
        n8n_workflow_1.LoggerProxy.error(`Only strings can be passed to extractValue. Parameter "${parameterName}" passed "${typeName}"`);
        throw new n8n_workflow_1.ApplicationError("This parameter's value is invalid", {
            extra: { parameter: property.displayName },
        });
    }
    if (property.extractValue.type !== 'regex') {
        throw new n8n_workflow_1.ApplicationError('Property with unknown `extractValue`', {
            extra: { parameter: parameterName, extractValueType: property.extractValue.type },
        });
    }
    const regex = new RegExp(property.extractValue.regex);
    return executeRegexExtractValue(value, regex, parameterName, property.displayName);
}
function extractValue(value, parameterName, node, nodeType, itemIndex = 0) {
    let property;
    try {
        property = findPropertyFromParameterName(parameterName, nodeType, node, node.parameters);
        if (!('type' in property)) {
            return value;
        }
        if (property.type === 'resourceLocator') {
            return extractValueRLC(value, property, parameterName);
        }
        else if (property.type === 'filter') {
            return extractValueFilter(value, property, parameterName, itemIndex);
        }
        return extractValueOther(value, property, parameterName);
    }
    catch (error) {
        throw new n8n_workflow_1.NodeOperationError(node, error, { description: (0, get_1.default)(error, 'description') });
    }
}
//# sourceMappingURL=extract-value.js.map