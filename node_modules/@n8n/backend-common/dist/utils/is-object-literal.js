"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObjectLiteral = isObjectLiteral;
function isObjectLiteral(candidate) {
    return (typeof candidate === 'object' &&
        candidate !== null &&
        !Array.isArray(candidate) &&
        Object.getPrototypeOf(candidate)?.constructor?.name === 'Object');
}
//# sourceMappingURL=is-object-literal.js.map