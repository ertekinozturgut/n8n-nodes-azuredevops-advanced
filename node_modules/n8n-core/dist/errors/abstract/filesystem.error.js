"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemError = void 0;
const errors_1 = require("@n8n/errors");
class FileSystemError extends errors_1.ApplicationError {
    constructor(message, filePath) {
        super(message, { extra: { filePath } });
    }
}
exports.FileSystemError = FileSystemError;
//# sourceMappingURL=filesystem.error.js.map