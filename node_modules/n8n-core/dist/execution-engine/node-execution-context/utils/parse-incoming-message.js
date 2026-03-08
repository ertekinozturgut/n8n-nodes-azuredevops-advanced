"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseContentDisposition = exports.parseContentType = void 0;
exports.parseIncomingMessage = parseIncomingMessage;
function parseHeaderParameters(parameters) {
    return parameters.reduce((acc, param) => {
        const [key, value] = param.split('=');
        let decodedValue = decodeURIComponent(value).trim();
        if (decodedValue.startsWith('"') && decodedValue.endsWith('"')) {
            decodedValue = decodedValue.slice(1, -1);
        }
        acc[key.toLowerCase().trim()] = decodedValue;
        return acc;
    }, {});
}
const parseContentType = (contentType) => {
    if (!contentType) {
        return null;
    }
    const [type, ...parameters] = contentType.split(';');
    return {
        type: type.toLowerCase(),
        parameters: { charset: 'utf-8', ...parseHeaderParameters(parameters) },
    };
};
exports.parseContentType = parseContentType;
const parseContentDisposition = (contentDisposition) => {
    if (!contentDisposition) {
        return null;
    }
    if (!contentDisposition.startsWith('attachment') && !contentDisposition.startsWith('inline')) {
        contentDisposition = `attachment; ${contentDisposition}`;
    }
    const [type, ...parameters] = contentDisposition.split(';');
    const parsedParameters = parseHeaderParameters(parameters);
    let { filename } = parsedParameters;
    const wildcard = parsedParameters['filename*'];
    if (wildcard) {
        const [_encoding, _locale, content] = wildcard?.split("'") ?? [];
        filename = content;
    }
    return { type, filename };
};
exports.parseContentDisposition = parseContentDisposition;
function parseIncomingMessage(message) {
    const contentType = (0, exports.parseContentType)(message.headers['content-type']);
    if (contentType) {
        const { type, parameters } = contentType;
        message.contentType = type;
        message.encoding = parameters.charset.toLowerCase();
    }
    const contentDisposition = (0, exports.parseContentDisposition)(message.headers['content-disposition']);
    if (contentDisposition) {
        message.contentDisposition = contentDisposition;
    }
}
//# sourceMappingURL=parse-incoming-message.js.map