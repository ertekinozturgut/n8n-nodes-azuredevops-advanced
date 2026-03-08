"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnrecognizedCredentialTypeError = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class UnrecognizedCredentialTypeError extends n8n_workflow_1.UserError {
    constructor(credentialType) {
        super(`Unrecognized credential type: ${credentialType}`);
    }
}
exports.UnrecognizedCredentialTypeError = UnrecognizedCredentialTypeError;
//# sourceMappingURL=unrecognized-credential-type.error.js.map