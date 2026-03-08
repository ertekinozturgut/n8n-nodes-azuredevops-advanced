"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureType = ensureType;
const n8n_workflow_1 = require("n8n-workflow");
function ensureType(toType, parameterValue, parameterName, errorOptions) {
    let returnData = parameterValue;
    if (returnData === null) {
        throw new n8n_workflow_1.ExpressionError(`Parameter '${parameterName}' must not be null`, errorOptions);
    }
    if (returnData === undefined) {
        throw new n8n_workflow_1.ExpressionError(`Parameter '${parameterName}' could not be 'undefined'`, errorOptions);
    }
    if (['object', 'array', 'json'].includes(toType)) {
        if (typeof returnData !== 'object') {
            if (typeof returnData === 'string' && returnData.length) {
                try {
                    const parsedValue = JSON.parse(returnData);
                    returnData = parsedValue;
                }
                catch (error) {
                    throw new n8n_workflow_1.ExpressionError(`Parameter '${parameterName}' could not be parsed`, {
                        ...errorOptions,
                        description: error.message,
                    });
                }
            }
            else {
                throw new n8n_workflow_1.ExpressionError(`Parameter '${parameterName}' must be an ${toType}, but we got '${String(parameterValue)}'`, errorOptions);
            }
        }
        else if (toType === 'json') {
            try {
                JSON.stringify(returnData);
            }
            catch (error) {
                throw new n8n_workflow_1.ExpressionError(`Parameter '${parameterName}' is not valid JSON`, {
                    ...errorOptions,
                    description: error.message,
                });
            }
        }
        if (toType === 'array' && !Array.isArray(returnData)) {
            throw new n8n_workflow_1.ExpressionError(`Parameter '${parameterName}' must be an array, but we got object`, errorOptions);
        }
    }
    try {
        if (toType === 'string') {
            if (typeof returnData === 'object') {
                returnData = JSON.stringify(returnData);
            }
            else {
                returnData = String(returnData);
            }
        }
        if (toType === 'number') {
            returnData = Number(returnData);
            if (Number.isNaN(returnData)) {
                throw new n8n_workflow_1.ExpressionError(`Parameter '${parameterName}' must be a number, but we got '${parameterValue}'`, errorOptions);
            }
        }
        if (toType === 'boolean') {
            returnData = Boolean(returnData);
        }
    }
    catch (error) {
        if (error instanceof n8n_workflow_1.ExpressionError)
            throw error;
        throw new n8n_workflow_1.ExpressionError(`Parameter '${parameterName}' could not be converted to ${toType}`, {
            ...errorOptions,
            description: error.message,
        });
    }
    return returnData;
}
//# sourceMappingURL=ensure-type.js.map