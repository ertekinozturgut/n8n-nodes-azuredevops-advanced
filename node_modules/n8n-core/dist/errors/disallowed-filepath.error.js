"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisallowedFilepathError = void 0;
const filesystem_error_1 = require("./abstract/filesystem.error");
class DisallowedFilepathError extends filesystem_error_1.FileSystemError {
    constructor(filePath) {
        super('Disallowed path detected', filePath);
    }
}
exports.DisallowedFilepathError = DisallowedFilepathError;
//# sourceMappingURL=disallowed-filepath.error.js.map