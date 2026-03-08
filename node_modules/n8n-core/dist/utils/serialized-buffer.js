"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBuffer = toBuffer;
exports.isSerializedBuffer = isSerializedBuffer;
const backend_common_1 = require("@n8n/backend-common");
function toBuffer(serializedBuffer) {
    return Buffer.from(serializedBuffer.data);
}
function isSerializedBuffer(candidate) {
    return ((0, backend_common_1.isObjectLiteral)(candidate) &&
        'type' in candidate &&
        'data' in candidate &&
        candidate.type === 'Buffer' &&
        Array.isArray(candidate.data));
}
//# sourceMappingURL=serialized-buffer.js.map