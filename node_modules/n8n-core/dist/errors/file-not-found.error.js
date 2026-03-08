"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileNotFoundError = void 0;
const filesystem_error_1 = require("./abstract/filesystem.error");
class FileNotFoundError extends filesystem_error_1.FileSystemError {
    constructor(filePath) {
        super('File not found', filePath);
    }
}
exports.FileNotFoundError = FileNotFoundError;
//# sourceMappingURL=file-not-found.error.js.map