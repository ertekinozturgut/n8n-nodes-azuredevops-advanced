"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Redactable = exports.RedactableError = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class RedactableError extends n8n_workflow_1.UnexpectedError {
    constructor(fieldName, args) {
        super(`Failed to find "${fieldName}" property in argument "${args.toString()}". Please set the decorator \`@Redactable()\` only on \`LogStreamingEventRelay\` methods where the argument contains a "${fieldName}" property.`);
    }
}
exports.RedactableError = RedactableError;
function toRedactable(userLike) {
    return {
        userId: userLike.id,
        _email: userLike.email,
        _firstName: userLike.firstName,
        _lastName: userLike.lastName,
        globalRole: userLike.role?.slug,
    };
}
const Redactable = (fieldName = 'user') => (_target, _propertyName, propertyDescriptor) => {
    const originalMethod = propertyDescriptor.value;
    propertyDescriptor.value = function (...args) {
        const index = args.findIndex((arg) => arg[fieldName] !== undefined);
        if (index === -1)
            throw new RedactableError(fieldName, args.toString());
        const userLike = args[index]?.[fieldName];
        if (userLike)
            args[index][fieldName] = toRedactable(userLike);
        return originalMethod.apply(this, args);
    };
    return propertyDescriptor;
};
exports.Redactable = Redactable;
//# sourceMappingURL=redactable.js.map