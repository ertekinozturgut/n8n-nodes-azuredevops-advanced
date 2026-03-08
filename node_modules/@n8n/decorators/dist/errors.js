"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonMethodError = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class NonMethodError extends n8n_workflow_1.UnexpectedError {
    constructor(name) {
        super(`${name} must be a method on a class to use this decorator`);
    }
}
exports.NonMethodError = NonMethodError;
//# sourceMappingURL=errors.js.map