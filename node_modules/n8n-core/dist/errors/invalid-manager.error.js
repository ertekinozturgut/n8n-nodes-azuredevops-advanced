"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidManagerError = void 0;
const binary_data_error_1 = require("./abstract/binary-data.error");
class InvalidManagerError extends binary_data_error_1.BinaryDataError {
    constructor(mode) {
        super(`No binary data manager found for: ${mode}`);
    }
}
exports.InvalidManagerError = InvalidManagerError;
//# sourceMappingURL=invalid-manager.error.js.map