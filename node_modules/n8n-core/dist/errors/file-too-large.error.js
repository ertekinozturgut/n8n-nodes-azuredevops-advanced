"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileTooLargeError = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class FileTooLargeError extends n8n_workflow_1.UserError {
    constructor({ fileSizeMb, maxFileSizeMb, fileId, fileName, }) {
        const id = fileName ? `"${fileName}" (${fileId})` : fileId;
        const roundedSize = Math.round(fileSizeMb * 100) / 100;
        super(`Failed to write binary file ${id} because its size of ${roundedSize} MB exceeds the max size limit of ${maxFileSizeMb} MB set for \`database\` mode. Consider increasing \`N8N_BINARY_DATA_DATABASE_MAX_FILE_SIZE\` up to 1 GB, or using S3 storage mode if you require writes larger than 1 GB.`);
    }
}
exports.FileTooLargeError = FileTooLargeError;
//# sourceMappingURL=file-too-large.error.js.map