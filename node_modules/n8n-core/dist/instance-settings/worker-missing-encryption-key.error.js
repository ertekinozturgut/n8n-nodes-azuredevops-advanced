"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerMissingEncryptionKey = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class WorkerMissingEncryptionKey extends n8n_workflow_1.UserError {
    constructor() {
        super([
            'Failed to start worker because of missing encryption key.',
            'Please set the `N8N_ENCRYPTION_KEY` env var when starting the worker.',
            'See: https://docs.n8n.io/hosting/configuration/configuration-examples/encryption-key/',
        ].join(' '));
    }
}
exports.WorkerMissingEncryptionKey = WorkerMissingEncryptionKey;
//# sourceMappingURL=worker-missing-encryption-key.error.js.map