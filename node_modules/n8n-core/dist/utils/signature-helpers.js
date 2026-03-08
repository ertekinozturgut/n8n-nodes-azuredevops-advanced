"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUrlSignature = generateUrlSignature;
exports.prepareUrlForSigning = prepareUrlForSigning;
const crypto_1 = __importDefault(require("crypto"));
function generateUrlSignature(url, secret) {
    const token = crypto_1.default.createHmac('sha256', secret).update(url).digest('hex');
    return token;
}
function prepareUrlForSigning(url) {
    return `${url.host}${url.pathname}${url.search}`;
}
//# sourceMappingURL=signature-helpers.js.map