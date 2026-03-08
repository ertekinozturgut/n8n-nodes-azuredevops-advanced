"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestHelperFunctions = exports.removeEmptyBody = exports.createFormDataObject = void 0;
exports.invokeAxios = invokeAxios;
exports.parseRequestObject = parseRequestObject;
exports.proxyRequestToAxios = proxyRequestToAxios;
exports.convertN8nRequestToAxios = convertN8nRequestToAxios;
exports.httpRequest = httpRequest;
exports.applyPaginationRequestData = applyPaginationRequestData;
exports.requestOAuth2 = requestOAuth2;
exports.requestOAuth1 = requestOAuth1;
exports.refreshOAuth2Token = refreshOAuth2Token;
exports.httpRequestWithAuthentication = httpRequestWithAuthentication;
exports.requestWithAuthentication = requestWithAuthentication;
const backend_common_1 = require("@n8n/backend-common");
const client_oauth2_1 = require("@n8n/client-oauth2");
const di_1 = require("@n8n/di");
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importStar(require("crypto"));
const form_data_1 = __importDefault(require("form-data"));
const http_1 = require("http");
const get_1 = __importDefault(require("lodash/get"));
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const merge_1 = __importDefault(require("lodash/merge"));
const pick_1 = __importDefault(require("lodash/pick"));
const n8n_workflow_1 = require("n8n-workflow");
const oauth_1_0a_1 = __importDefault(require("oauth-1.0a"));
const qs_1 = require("qs");
const stream_1 = require("stream");
const http_proxy_1 = require("../../../http-proxy");
const binary_helper_functions_1 = require("./binary-helper-functions");
const parse_incoming_message_1 = require("./parse-incoming-message");
axios_1.default.defaults.timeout = 300000;
axios_1.default.defaults.headers.post = {};
axios_1.default.defaults.headers.put = {};
axios_1.default.defaults.headers.patch = {};
axios_1.default.defaults.paramsSerializer = (params) => {
    if (params instanceof URLSearchParams) {
        return params.toString();
    }
    return (0, qs_1.stringify)(params, { arrayFormat: 'indices' });
};
axios_1.default.defaults.proxy = false;
function validateUrl(url) {
    if (!url)
        return false;
    try {
        new URL(url);
        return true;
    }
    catch {
        return false;
    }
}
function getUrlFromProxyConfig(proxyConfig) {
    if (typeof proxyConfig === 'string') {
        return validateUrl(proxyConfig) ? proxyConfig : null;
    }
    if (!proxyConfig?.host)
        return null;
    const { protocol, host, port, auth } = proxyConfig;
    const safeProtocol = protocol?.endsWith(':') ? protocol.slice(0, -1) : (protocol ?? 'http');
    try {
        const url = new URL(`${safeProtocol}://${host}`);
        if (port !== undefined)
            url.port = String(port);
        if (auth?.username) {
            url.username = auth.username;
            url.password = auth.password ?? '';
        }
        return url.href;
    }
    catch {
        return null;
    }
}
function buildTargetUrl(url, baseURL) {
    if (!url)
        return undefined;
    try {
        return baseURL ? new URL(url, baseURL).href : url;
    }
    catch {
        return undefined;
    }
}
function setAxiosAgents(config, agentOptions, proxyConfig) {
    if (config.httpAgent || config.httpsAgent)
        return;
    const customProxyUrl = getUrlFromProxyConfig(proxyConfig);
    const targetUrl = buildTargetUrl(config.url, config.baseURL);
    if (!targetUrl)
        return;
    config.httpAgent = (0, http_proxy_1.createHttpProxyAgent)(customProxyUrl, targetUrl, agentOptions);
    config.httpsAgent = (0, http_proxy_1.createHttpsProxyAgent)(customProxyUrl, targetUrl, agentOptions);
}
axios_1.default.interceptors.request.use((config) => {
    if (config.data === undefined) {
        config.headers.setContentType(false, false);
    }
    setAxiosAgents(config);
    return config;
});
function searchForHeader(config, headerName) {
    if (config.headers === undefined) {
        return undefined;
    }
    const headerNames = Object.keys(config.headers);
    headerName = headerName.toLowerCase();
    return headerNames.find((thisHeader) => thisHeader.toLowerCase() === headerName);
}
const getHostFromRequestObject = (requestObject) => {
    try {
        const url = (requestObject.url ?? requestObject.uri);
        return new URL(url, requestObject.baseURL).hostname;
    }
    catch (error) {
        return null;
    }
};
const getBeforeRedirectFn = (agentOptions, axiosConfig, proxyConfig) => (redirectedRequest) => {
    const redirectAgentOptions = {
        ...agentOptions,
        servername: redirectedRequest.hostname,
    };
    const customProxyUrl = getUrlFromProxyConfig(proxyConfig);
    const targetUrl = redirectedRequest.href;
    const httpAgent = (0, http_proxy_1.createHttpProxyAgent)(customProxyUrl, targetUrl, redirectAgentOptions);
    const httpsAgent = (0, http_proxy_1.createHttpsProxyAgent)(customProxyUrl, targetUrl, redirectAgentOptions);
    redirectedRequest.agent = redirectedRequest.href.startsWith('https://')
        ? httpsAgent
        : httpAgent;
    redirectedRequest.agents = { http: httpAgent, https: httpsAgent };
    if (axiosConfig.headers?.Authorization) {
        redirectedRequest.headers.Authorization = axiosConfig.headers.Authorization;
    }
    if (axiosConfig.auth) {
        redirectedRequest.auth = `${axiosConfig.auth.username}:${axiosConfig.auth.password}`;
    }
};
function digestAuthAxiosConfig(axiosConfig, response, auth) {
    const authDetails = response.headers['www-authenticate']
        .split(',')
        .map((v) => v.split('='));
    if (authDetails) {
        const nonceCount = '000000001';
        const cnonce = crypto_1.default.randomBytes(24).toString('hex');
        const realm = authDetails
            .find((el) => el[0].toLowerCase().indexOf('realm') > -1)[1]
            .replace(/"/g, '');
        const opaqueKV = authDetails.find((el) => el[0].toLowerCase().indexOf('opaque') > -1);
        const opaque = opaqueKV ? opaqueKV[1].replace(/"/g, '') : undefined;
        const nonce = authDetails
            .find((el) => el[0].toLowerCase().indexOf('nonce') > -1)[1]
            .replace(/"/g, '');
        const ha1 = crypto_1.default
            .createHash('md5')
            .update(`${auth?.username}:${realm}:${auth?.password}`)
            .digest('hex');
        const url = new URL(axios_1.default.getUri(axiosConfig));
        const path = url.pathname + url.search;
        const ha2 = crypto_1.default
            .createHash('md5')
            .update(`${axiosConfig.method ?? 'GET'}:${path}`)
            .digest('hex');
        const response = crypto_1.default
            .createHash('md5')
            .update(`${ha1}:${nonce}:${nonceCount}:${cnonce}:auth:${ha2}`)
            .digest('hex');
        let authorization = `Digest username="${auth?.username}",realm="${realm}",` +
            `nonce="${nonce}",uri="${path}",qop="auth",algorithm="MD5",` +
            `response="${response}",nc="${nonceCount}",cnonce="${cnonce}"`;
        if (opaque) {
            authorization += `,opaque="${opaque}"`;
        }
        if (axiosConfig.headers) {
            axiosConfig.headers.authorization = authorization;
        }
        else {
            axiosConfig.headers = { authorization };
        }
    }
    return axiosConfig;
}
async function invokeAxios(axiosConfig, authOptions = {}) {
    try {
        return await (0, axios_1.default)(axiosConfig);
    }
    catch (error) {
        if (authOptions.sendImmediately !== false || !(error instanceof axios_1.default.AxiosError))
            throw error;
        const { response } = error;
        if (response?.status !== 401 || !response.headers['www-authenticate']?.includes('nonce')) {
            throw error;
        }
        const { auth } = axiosConfig;
        delete axiosConfig.auth;
        axiosConfig = digestAuthAxiosConfig(axiosConfig, response, auth);
        return await (0, axios_1.default)(axiosConfig);
    }
}
const pushFormDataValue = (form, key, value) => {
    if (value?.hasOwnProperty('value') && value.hasOwnProperty('options')) {
        form.append(key, value.value, value.options);
    }
    else {
        form.append(key, value);
    }
};
const createFormDataObject = (data) => {
    const formData = new form_data_1.default();
    const keys = Object.keys(data);
    keys.forEach((key) => {
        const formField = data[key];
        if (formField instanceof Array) {
            formField.forEach((item) => {
                pushFormDataValue(formData, key, item);
            });
        }
        else {
            pushFormDataValue(formData, key, formField);
        }
    });
    return formData;
};
exports.createFormDataObject = createFormDataObject;
async function generateContentLengthHeader(config) {
    if (!(config.data instanceof form_data_1.default)) {
        return;
    }
    try {
        const length = await new Promise((res, rej) => {
            config.data.getLength((error, dataLength) => {
                if (error)
                    rej(error);
                else
                    res(dataLength);
            });
        });
        config.headers = {
            ...config.headers,
            'content-length': length,
        };
    }
    catch (error) {
        di_1.Container.get(backend_common_1.Logger).error('Unable to calculate form data length', { error });
    }
}
async function parseRequestObject(requestObject) {
    const axiosConfig = {};
    if (requestObject.headers !== undefined) {
        axiosConfig.headers = requestObject.headers;
    }
    const contentTypeHeaderKeyName = axiosConfig.headers &&
        Object.keys(axiosConfig.headers).find((headerName) => headerName.toLowerCase() === 'content-type');
    const contentType = contentTypeHeaderKeyName &&
        axiosConfig.headers?.[contentTypeHeaderKeyName];
    if (contentType === 'application/x-www-form-urlencoded' && requestObject.formData === undefined) {
        if (typeof requestObject.body === 'string') {
            axiosConfig.data = requestObject.body;
        }
        else {
            const allData = Object.assign(requestObject.body || {}, requestObject.form || {});
            if (requestObject.useQuerystring === true) {
                axiosConfig.data = (0, qs_1.stringify)(allData, { arrayFormat: 'repeat' });
            }
            else {
                axiosConfig.data = (0, qs_1.stringify)(allData);
            }
        }
    }
    else if (contentType?.includes('multipart/form-data')) {
        if (requestObject.formData !== undefined && requestObject.formData instanceof form_data_1.default) {
            axiosConfig.data = requestObject.formData;
        }
        else {
            const allData = {
                ...requestObject.body,
                ...requestObject.formData,
            };
            axiosConfig.data = (0, exports.createFormDataObject)(allData);
        }
        delete axiosConfig.headers?.[contentTypeHeaderKeyName];
        const headers = axiosConfig.data.getHeaders();
        axiosConfig.headers = Object.assign(axiosConfig.headers || {}, headers);
        await generateContentLengthHeader(axiosConfig);
    }
    else {
        if (requestObject.form !== undefined && requestObject.body === undefined) {
            axiosConfig.data =
                typeof requestObject.form === 'string'
                    ? (0, qs_1.stringify)(requestObject.form, { format: 'RFC3986' })
                    : (0, qs_1.stringify)(requestObject.form).toString();
            if (axiosConfig.headers !== undefined) {
                const headerName = searchForHeader(axiosConfig, 'content-type');
                if (headerName) {
                    delete axiosConfig.headers[headerName];
                }
                axiosConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            }
            else {
                axiosConfig.headers = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                };
            }
        }
        else if (requestObject.formData !== undefined) {
            if (axiosConfig.headers !== undefined) {
                const headers = Object.keys(axiosConfig.headers);
                headers.forEach((header) => {
                    if (header.toLowerCase() === 'content-type') {
                        delete axiosConfig.headers?.[header];
                    }
                });
            }
            if (requestObject.formData instanceof form_data_1.default) {
                axiosConfig.data = requestObject.formData;
            }
            else {
                axiosConfig.data = (0, exports.createFormDataObject)(requestObject.formData);
            }
            const headers = axiosConfig.data.getHeaders();
            axiosConfig.headers = Object.assign(axiosConfig.headers || {}, headers);
            await generateContentLengthHeader(axiosConfig);
        }
        else if (requestObject.body !== undefined) {
            if (requestObject.form !== undefined && requestObject.body) {
                requestObject.body = Object.assign(requestObject.body, requestObject.form);
            }
            axiosConfig.data = requestObject.body;
        }
    }
    if (requestObject.uri !== undefined) {
        axiosConfig.url = requestObject.uri?.toString();
    }
    if (requestObject.url !== undefined) {
        axiosConfig.url = requestObject.url?.toString();
    }
    if (requestObject.baseURL !== undefined) {
        axiosConfig.baseURL = requestObject.baseURL?.toString();
    }
    if (requestObject.method !== undefined) {
        axiosConfig.method = requestObject.method;
    }
    if (requestObject.qs !== undefined && Object.keys(requestObject.qs).length > 0) {
        axiosConfig.params = requestObject.qs;
    }
    function hasArrayFormatOptions(arg) {
        if (typeof arg.qsStringifyOptions === 'object' &&
            arg.qsStringifyOptions !== null &&
            !Array.isArray(arg.qsStringifyOptions) &&
            'arrayFormat' in arg.qsStringifyOptions) {
            return true;
        }
        return false;
    }
    if (requestObject.useQuerystring === true ||
        (hasArrayFormatOptions(requestObject) &&
            requestObject.qsStringifyOptions.arrayFormat === 'repeat')) {
        axiosConfig.paramsSerializer = (params) => {
            return (0, qs_1.stringify)(params, { arrayFormat: 'repeat' });
        };
    }
    else if (requestObject.useQuerystring === false) {
        axiosConfig.paramsSerializer = (params) => {
            return (0, qs_1.stringify)(params, { arrayFormat: 'indices' });
        };
    }
    if (hasArrayFormatOptions(requestObject) &&
        requestObject.qsStringifyOptions.arrayFormat === 'brackets') {
        axiosConfig.paramsSerializer = (params) => {
            return (0, qs_1.stringify)(params, { arrayFormat: 'brackets' });
        };
    }
    if (requestObject.auth !== undefined) {
        if (requestObject.auth.bearer !== undefined) {
            axiosConfig.headers = Object.assign(axiosConfig.headers || {}, {
                Authorization: `Bearer ${requestObject.auth.bearer}`,
            });
        }
        else {
            const authObj = requestObject.auth;
            axiosConfig.auth = {
                username: (authObj.user || authObj.username),
                password: (authObj.password || authObj.pass),
            };
        }
    }
    if (requestObject.json === true) {
        const acceptHeaderExists = axiosConfig.headers === undefined
            ? false
            : Object.keys(axiosConfig.headers)
                .map((headerKey) => headerKey.toLowerCase())
                .includes('accept');
        if (!acceptHeaderExists) {
            axiosConfig.headers = Object.assign(axiosConfig.headers || {}, {
                Accept: 'application/json',
            });
        }
    }
    if (requestObject.json === false || requestObject.json === undefined) {
        axiosConfig.transformResponse = (res) => res;
    }
    const { method } = requestObject;
    if ((requestObject.followRedirect !== false &&
        (!method || method === 'GET' || method === 'HEAD')) ||
        requestObject.followAllRedirects) {
        axiosConfig.maxRedirects = requestObject.maxRedirects;
    }
    else {
        axiosConfig.maxRedirects = 0;
    }
    const host = getHostFromRequestObject(requestObject);
    const agentOptions = { ...requestObject.agentOptions };
    if (host) {
        agentOptions.servername = host;
    }
    if (requestObject.rejectUnauthorized === false) {
        agentOptions.rejectUnauthorized = false;
        agentOptions.secureOptions = crypto_1.default.constants.SSL_OP_LEGACY_SERVER_CONNECT;
    }
    if (requestObject.timeout !== undefined) {
        axiosConfig.timeout = requestObject.timeout;
    }
    setAxiosAgents(axiosConfig, agentOptions, requestObject.proxy);
    axiosConfig.beforeRedirect = getBeforeRedirectFn(agentOptions, axiosConfig, requestObject.proxy);
    if (requestObject.useStream) {
        axiosConfig.responseType = 'stream';
    }
    else if (requestObject.encoding === null) {
        axiosConfig.responseType = 'arraybuffer';
    }
    const allHeaders = axiosConfig.headers ? Object.keys(axiosConfig.headers) : [];
    if (!allHeaders.some((headerKey) => headerKey.toLowerCase() === 'accept')) {
        axiosConfig.headers = Object.assign(axiosConfig.headers || {}, { accept: '*/*' });
    }
    if (requestObject.json !== false &&
        axiosConfig.data !== undefined &&
        axiosConfig.data !== '' &&
        !(axiosConfig.data instanceof Buffer) &&
        !allHeaders.some((headerKey) => headerKey.toLowerCase() === 'content-type')) {
        axiosConfig.headers = Object.assign(axiosConfig.headers || {}, {
            'content-type': 'application/json',
        });
    }
    if (requestObject.simple === false) {
        axiosConfig.validateStatus = () => true;
    }
    return axiosConfig;
}
async function proxyRequestToAxios(workflow, additionalData, node, uriOrObject, options) {
    let axiosConfig = {
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
    };
    let configObject;
    if (typeof uriOrObject === 'string') {
        configObject = { uri: uriOrObject, ...options };
    }
    else {
        configObject = uriOrObject ?? {};
    }
    axiosConfig = Object.assign(axiosConfig, await parseRequestObject(configObject));
    try {
        const response = await invokeAxios(axiosConfig, configObject.auth);
        let body = response.data;
        if (body instanceof http_1.IncomingMessage && axiosConfig.responseType === 'stream') {
            (0, parse_incoming_message_1.parseIncomingMessage)(body);
        }
        else if (body === '') {
            body = axiosConfig.responseType === 'arraybuffer' ? Buffer.alloc(0) : undefined;
        }
        await additionalData?.hooks?.runHook('nodeFetchedData', [workflow?.id, node]);
        return configObject.resolveWithFullResponse
            ? {
                body,
                headers: { ...response.headers },
                statusCode: response.status,
                statusMessage: response.statusText,
                request: response.request,
            }
            : body;
    }
    catch (error) {
        const { config, response } = error;
        if (error.isAxiosError) {
            error.config = error.request = undefined;
            error.options = (0, pick_1.default)(config ?? {}, ['url', 'method', 'data', 'headers']);
            if (response) {
                di_1.Container.get(backend_common_1.Logger).debug('Request proxied to Axios failed', { status: response.status });
                let responseData = response.data;
                if (Buffer.isBuffer(responseData) || responseData instanceof stream_1.Readable) {
                    responseData = await (0, binary_helper_functions_1.binaryToString)(responseData);
                }
                if (configObject.simple === false) {
                    if (configObject.resolveWithFullResponse) {
                        return {
                            body: responseData,
                            headers: response.headers,
                            statusCode: response.status,
                            statusMessage: response.statusText,
                        };
                    }
                    else {
                        return responseData;
                    }
                }
                error.message = `${response.status} - ${JSON.stringify(responseData)}`;
                throw Object.assign(error, {
                    statusCode: response.status,
                    status: response.status,
                    error: responseData,
                    response: (0, pick_1.default)(response, ['headers', 'status', 'statusText']),
                });
            }
            else if ('rejectUnauthorized' in configObject && error.code?.includes('CERT')) {
                throw new n8n_workflow_1.NodeSslError(error);
            }
        }
        throw error;
    }
}
function convertN8nRequestToAxios(n8nRequest) {
    const { headers, method, timeout, auth, proxy, url } = n8nRequest;
    const axiosRequest = {
        headers: headers ?? {},
        method,
        timeout,
        auth,
        url,
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
    };
    axiosRequest.params = n8nRequest.qs;
    if (n8nRequest.abortSignal) {
        axiosRequest.signal = n8nRequest.abortSignal;
    }
    if (n8nRequest.baseURL !== undefined) {
        axiosRequest.baseURL = n8nRequest.baseURL;
    }
    if (n8nRequest.disableFollowRedirect === true) {
        axiosRequest.maxRedirects = 0;
    }
    if (n8nRequest.encoding !== undefined) {
        axiosRequest.responseType = n8nRequest.encoding;
    }
    const host = getHostFromRequestObject(n8nRequest);
    const agentOptions = {};
    if (host) {
        agentOptions.servername = host;
    }
    if (n8nRequest.skipSslCertificateValidation === true) {
        agentOptions.rejectUnauthorized = false;
    }
    setAxiosAgents(axiosRequest, agentOptions, proxy);
    axiosRequest.beforeRedirect = getBeforeRedirectFn(agentOptions, axiosRequest, n8nRequest.proxy);
    if (n8nRequest.arrayFormat !== undefined) {
        axiosRequest.paramsSerializer = (params) => {
            return (0, qs_1.stringify)(params, { arrayFormat: n8nRequest.arrayFormat });
        };
    }
    const { body } = n8nRequest;
    if (body) {
        const existingContentTypeHeaderKey = searchForHeader(axiosRequest, 'content-type');
        if (existingContentTypeHeaderKey === undefined) {
            axiosRequest.headers = axiosRequest.headers || {};
            if (body instanceof form_data_1.default) {
                axiosRequest.headers = {
                    ...axiosRequest.headers,
                    ...body.getHeaders(),
                };
            }
            else if (body instanceof URLSearchParams) {
                axiosRequest.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            }
        }
        else if (axiosRequest.headers?.[existingContentTypeHeaderKey] === 'application/x-www-form-urlencoded') {
            axiosRequest.data = new URLSearchParams(n8nRequest.body);
        }
        if (typeof body === 'string' || (typeof body === 'object' && !(0, n8n_workflow_1.isObjectEmpty)(body))) {
            axiosRequest.data = body;
        }
    }
    if (n8nRequest.json) {
        const key = searchForHeader(axiosRequest, 'accept');
        if (!key) {
            axiosRequest.headers = {
                ...axiosRequest.headers,
                Accept: 'application/json',
            };
        }
    }
    const userAgentHeader = searchForHeader(axiosRequest, 'user-agent');
    if (!userAgentHeader) {
        axiosRequest.headers = {
            ...axiosRequest.headers,
            'User-Agent': 'n8n',
        };
    }
    if (n8nRequest.ignoreHttpStatusErrors) {
        axiosRequest.validateStatus = () => true;
    }
    return axiosRequest;
}
const NoBodyHttpMethods = ['GET', 'HEAD', 'OPTIONS'];
const removeEmptyBody = (requestOptions) => {
    const method = requestOptions.method || 'GET';
    if (NoBodyHttpMethods.includes(method) && (0, isEmpty_1.default)(requestOptions.body)) {
        delete requestOptions.body;
    }
};
exports.removeEmptyBody = removeEmptyBody;
async function httpRequest(requestOptions) {
    (0, exports.removeEmptyBody)(requestOptions);
    const axiosRequest = convertN8nRequestToAxios(requestOptions);
    if (axiosRequest.data === undefined ||
        (axiosRequest.method !== undefined && axiosRequest.method.toUpperCase() === 'GET')) {
        delete axiosRequest.data;
    }
    const result = await invokeAxios(axiosRequest, requestOptions.auth);
    if (requestOptions.returnFullResponse) {
        return {
            body: result.data,
            headers: result.headers,
            statusCode: result.status,
            statusMessage: result.statusText,
        };
    }
    return result.data;
}
function applyPaginationRequestData(requestData, paginationRequestData) {
    const preparedPaginationData = {
        ...paginationRequestData,
        uri: paginationRequestData.url,
    };
    if ('formData' in requestData) {
        preparedPaginationData.formData = paginationRequestData.body;
        delete preparedPaginationData.body;
    }
    else if ('form' in requestData) {
        preparedPaginationData.form = paginationRequestData.body;
        delete preparedPaginationData.body;
    }
    return (0, merge_1.default)({}, requestData, preparedPaginationData);
}
function createOAuth2Client(credentials) {
    return new client_oauth2_1.ClientOAuth2({
        clientId: credentials.clientId,
        clientSecret: credentials.clientSecret,
        accessTokenUri: credentials.accessTokenUrl,
        scopes: (credentials.scope ?? '').split(' '),
        ignoreSSLIssues: credentials.ignoreSSLIssues,
        authentication: credentials.authentication ?? 'header',
        ...(credentials.additionalBodyProperties && {
            additionalBodyProperties: (0, n8n_workflow_1.jsonParse)(credentials.additionalBodyProperties, {
                fallbackValue: {},
            }),
        }),
    });
}
async function requestOAuth2(credentialsType, requestOptions, node, additionalData, oAuth2Options, isN8nRequest = false) {
    (0, exports.removeEmptyBody)(requestOptions);
    const credentials = (await this.getCredentials(credentialsType));
    if (credentials.grantType === 'authorizationCode' && credentials.oauthTokenData === undefined) {
        throw new n8n_workflow_1.ApplicationError('OAuth credentials not connected');
    }
    const oAuthClient = createOAuth2Client(credentials);
    let oauthTokenData = credentials.oauthTokenData;
    if (credentials.grantType === 'clientCredentials' &&
        (oauthTokenData === undefined ||
            Object.keys(oauthTokenData).length === 0 ||
            oauthTokenData.access_token === '')) {
        const { data } = await oAuthClient.credentials.getToken();
        if (!node.credentials?.[credentialsType]) {
            throw new n8n_workflow_1.ApplicationError('Node does not have credential type', {
                extra: { nodeName: node.name },
                tags: { credentialType: credentialsType },
            });
        }
        const nodeCredentials = node.credentials[credentialsType];
        credentials.oauthTokenData = data;
        await additionalData.credentialsHelper.updateCredentialsOauthTokenData(nodeCredentials, credentialsType, credentials);
        oauthTokenData = data;
    }
    const accessToken = (0, get_1.default)(oauthTokenData, oAuth2Options?.property) || oauthTokenData.accessToken;
    const refreshToken = oauthTokenData.refreshToken;
    const token = oAuthClient.createToken({
        ...oauthTokenData,
        ...(accessToken ? { access_token: accessToken } : {}),
        ...(refreshToken ? { refresh_token: refreshToken } : {}),
    }, oAuth2Options?.tokenType || oauthTokenData.tokenType);
    requestOptions.rejectUnauthorized = !credentials.ignoreSSLIssues;
    const newRequestOptions = token.sign(requestOptions);
    const newRequestHeaders = (newRequestOptions.headers = newRequestOptions.headers ?? {});
    if (oAuth2Options?.keepBearer === false && typeof newRequestHeaders.Authorization === 'string') {
        newRequestHeaders.Authorization = newRequestHeaders.Authorization.split(' ')[1];
    }
    if (oAuth2Options?.keyToIncludeInAccessTokenHeader) {
        Object.assign(newRequestHeaders, {
            [oAuth2Options.keyToIncludeInAccessTokenHeader]: token.accessToken,
        });
    }
    if (isN8nRequest) {
        return await this.helpers.httpRequest(newRequestOptions).catch(async (error) => {
            if (error.response?.status === 401) {
                this.logger.debug(`OAuth2 token for "${credentialsType}" used by node "${node.name}" expired. Should revalidate.`);
                const tokenRefreshOptions = {};
                if (oAuth2Options?.includeCredentialsOnRefreshOnBody) {
                    const body = {
                        client_id: credentials.clientId,
                        ...(credentials.grantType === 'authorizationCode' && {
                            client_secret: credentials.clientSecret,
                        }),
                    };
                    tokenRefreshOptions.body = body;
                    tokenRefreshOptions.headers = {
                        Authorization: '',
                    };
                }
                let newToken;
                this.logger.debug(`OAuth2 token for "${credentialsType}" used by node "${node.name}" has been renewed.`);
                if (credentials.grantType === 'clientCredentials') {
                    newToken = await token.client.credentials.getToken();
                }
                else {
                    newToken = await token.refresh(tokenRefreshOptions);
                }
                this.logger.debug(`OAuth2 token for "${credentialsType}" used by node "${node.name}" has been renewed.`);
                credentials.oauthTokenData = newToken.data;
                if (!node.credentials?.[credentialsType]) {
                    throw new n8n_workflow_1.ApplicationError('Node does not have credential type', {
                        extra: { nodeName: node.name, credentialType: credentialsType },
                    });
                }
                const nodeCredentials = node.credentials[credentialsType];
                await additionalData.credentialsHelper.updateCredentialsOauthTokenData(nodeCredentials, credentialsType, credentials);
                const refreshedRequestOption = newToken.sign(requestOptions);
                if (oAuth2Options?.keyToIncludeInAccessTokenHeader) {
                    Object.assign(newRequestHeaders, {
                        [oAuth2Options.keyToIncludeInAccessTokenHeader]: token.accessToken,
                    });
                }
                return await this.helpers.httpRequest(refreshedRequestOption);
            }
            throw error;
        });
    }
    const tokenExpiredStatusCode = oAuth2Options?.tokenExpiredStatusCode === undefined
        ? 401
        : oAuth2Options?.tokenExpiredStatusCode;
    return await this.helpers
        .request(newRequestOptions)
        .then((response) => {
        const requestOptions = newRequestOptions;
        if (requestOptions.resolveWithFullResponse === true &&
            requestOptions.simple === false &&
            response.statusCode === tokenExpiredStatusCode) {
            throw response;
        }
        return response;
    })
        .catch(async (error) => {
        if (error.statusCode === tokenExpiredStatusCode) {
            const tokenRefreshOptions = {};
            if (oAuth2Options?.includeCredentialsOnRefreshOnBody) {
                const body = {
                    client_id: credentials.clientId,
                    client_secret: credentials.clientSecret,
                };
                tokenRefreshOptions.body = body;
                tokenRefreshOptions.headers = {
                    Authorization: '',
                };
            }
            this.logger.debug(`OAuth2 token for "${credentialsType}" used by node "${node.name}" expired. Should revalidate.`);
            let newToken;
            if (credentials.grantType === 'clientCredentials') {
                newToken = await token.client.credentials.getToken();
            }
            else {
                newToken = await token.refresh(tokenRefreshOptions);
            }
            this.logger.debug(`OAuth2 token for "${credentialsType}" used by node "${node.name}" has been renewed.`);
            credentials.oauthTokenData = newToken.data;
            if (!node.credentials?.[credentialsType]) {
                throw new n8n_workflow_1.ApplicationError('Node does not have credential type', {
                    tags: { credentialType: credentialsType },
                    extra: { nodeName: node.name },
                });
            }
            const nodeCredentials = node.credentials[credentialsType];
            await additionalData.credentialsHelper.updateCredentialsOauthTokenData(nodeCredentials, credentialsType, credentials);
            this.logger.debug(`OAuth2 token for "${credentialsType}" used by node "${node.name}" has been saved to database successfully.`);
            const newRequestOptions = newToken.sign(requestOptions);
            newRequestOptions.headers = newRequestOptions.headers ?? {};
            if (oAuth2Options?.keyToIncludeInAccessTokenHeader) {
                Object.assign(newRequestOptions.headers, {
                    [oAuth2Options.keyToIncludeInAccessTokenHeader]: token.accessToken,
                });
            }
            return await this.helpers.request(newRequestOptions);
        }
        throw error;
    });
}
async function requestOAuth1(credentialsType, requestOptions, isN8nRequest = false) {
    (0, exports.removeEmptyBody)(requestOptions);
    const credentials = await this.getCredentials(credentialsType);
    if (credentials === undefined) {
        throw new n8n_workflow_1.ApplicationError('No credentials were returned');
    }
    if (credentials.oauthTokenData === undefined) {
        throw new n8n_workflow_1.ApplicationError('OAuth credentials not connected');
    }
    const oauth = new oauth_1_0a_1.default({
        consumer: {
            key: credentials.consumerKey,
            secret: credentials.consumerSecret,
        },
        signature_method: credentials.signatureMethod,
        hash_function(base, key) {
            let algorithm;
            switch (credentials.signatureMethod) {
                case 'HMAC-SHA256':
                    algorithm = 'sha256';
                    break;
                case 'HMAC-SHA512':
                    algorithm = 'sha512';
                    break;
                default:
                    algorithm = 'sha1';
                    break;
            }
            return (0, crypto_1.createHmac)(algorithm, key).update(base).digest('base64');
        },
    });
    const oauthTokenData = credentials.oauthTokenData;
    const token = {
        key: oauthTokenData.oauth_token,
        secret: oauthTokenData.oauth_token_secret,
    };
    requestOptions.data = { ...requestOptions.qs, ...requestOptions.form };
    if ('uri' in requestOptions && !requestOptions.url) {
        requestOptions.url = requestOptions.uri;
        delete requestOptions.uri;
    }
    requestOptions.headers = oauth.toHeader(oauth.authorize(requestOptions, token));
    if (isN8nRequest) {
        return await this.helpers.httpRequest(requestOptions);
    }
    return await this.helpers
        .request(requestOptions)
        .catch(async (error) => {
        throw error;
    });
}
async function refreshOAuth2Token(credentialsType, node, additionalData, oAuth2Options) {
    const credentials = (await this.getCredentials(credentialsType));
    if (credentials.grantType === 'authorizationCode' && credentials.oauthTokenData === undefined) {
        throw new n8n_workflow_1.ApplicationError('OAuth credentials not connected');
    }
    const oAuthClient = createOAuth2Client(credentials);
    const oauthTokenData = credentials.oauthTokenData;
    const accessToken = (0, get_1.default)(oauthTokenData, oAuth2Options?.property) || oauthTokenData.accessToken;
    const refreshToken = oauthTokenData.refreshToken;
    const token = oAuthClient.createToken({
        ...oauthTokenData,
        ...(accessToken ? { access_token: accessToken } : {}),
        ...(refreshToken ? { refresh_token: refreshToken } : {}),
    }, oAuth2Options?.tokenType || oauthTokenData.tokenType);
    const tokenRefreshOptions = {};
    if (oAuth2Options?.includeCredentialsOnRefreshOnBody) {
        const body = {
            client_id: credentials.clientId,
            ...(credentials.grantType === 'authorizationCode' && {
                client_secret: credentials.clientSecret,
            }),
        };
        tokenRefreshOptions.body = body;
        tokenRefreshOptions.headers = {
            Authorization: '',
        };
    }
    this.logger.debug(`Refreshing the OAuth2 token for "${credentialsType}" used by node "${node.name}".`);
    let newToken;
    if (credentials.grantType === 'clientCredentials') {
        newToken = await token.client.credentials.getToken();
    }
    else {
        newToken = await token.refresh(tokenRefreshOptions);
    }
    this.logger.debug(`OAuth2 token for "${credentialsType}" used by node "${node.name}" has been renewed.`);
    credentials.oauthTokenData = newToken.data;
    if (!node.credentials?.[credentialsType]) {
        throw new n8n_workflow_1.ApplicationError('Node does not have credential type', {
            extra: { nodeName: node.name, credentialType: credentialsType },
        });
    }
    const nodeCredentials = node.credentials[credentialsType];
    await additionalData.credentialsHelper.updateCredentialsOauthTokenData(nodeCredentials, credentialsType, credentials);
    this.logger.debug(`OAuth2 token for "${credentialsType}" used by node "${node.name}" has been saved to database successfully.`);
    return newToken.data;
}
async function httpRequestWithAuthentication(credentialsType, requestOptions, workflow, node, additionalData, additionalCredentialOptions) {
    (0, exports.removeEmptyBody)(requestOptions);
    if ('getExecutionCancelSignal' in this) {
        requestOptions.abortSignal = this.getExecutionCancelSignal();
    }
    let credentialsDecrypted;
    try {
        const parentTypes = additionalData.credentialsHelper.getParentTypes(credentialsType);
        if (parentTypes.includes('oAuth1Api')) {
            return await requestOAuth1.call(this, credentialsType, requestOptions, true);
        }
        if (parentTypes.includes('oAuth2Api')) {
            return await requestOAuth2.call(this, credentialsType, requestOptions, node, additionalData, additionalCredentialOptions?.oauth2, true);
        }
        if (additionalCredentialOptions?.credentialsDecrypted) {
            credentialsDecrypted = additionalCredentialOptions.credentialsDecrypted.data;
        }
        else {
            credentialsDecrypted =
                await this.getCredentials(credentialsType);
        }
        if (credentialsDecrypted === undefined) {
            throw new n8n_workflow_1.NodeOperationError(node, `Node "${node.name}" does not have any credentials of type "${credentialsType}" set`, { level: 'warning' });
        }
        const data = await additionalData.credentialsHelper.preAuthentication({ helpers: this.helpers }, credentialsDecrypted, credentialsType, node, false);
        if (data) {
            Object.assign(credentialsDecrypted, data);
        }
        requestOptions = await additionalData.credentialsHelper.authenticate(credentialsDecrypted, credentialsType, requestOptions, workflow, node);
        return await httpRequest(requestOptions);
    }
    catch (error) {
        if (error.response?.status === 401 &&
            additionalData.credentialsHelper.preAuthentication !== undefined) {
            try {
                if (credentialsDecrypted !== undefined) {
                    const data = await additionalData.credentialsHelper.preAuthentication({ helpers: this.helpers }, credentialsDecrypted, credentialsType, node, true);
                    if (data) {
                        Object.assign(credentialsDecrypted, data);
                    }
                    requestOptions = await additionalData.credentialsHelper.authenticate(credentialsDecrypted, credentialsType, requestOptions, workflow, node);
                }
                return await httpRequest(requestOptions);
            }
            catch (error) {
                throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
            }
        }
        throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
    }
}
async function requestWithAuthentication(credentialsType, requestOptions, workflow, node, additionalData, additionalCredentialOptions, itemIndex) {
    (0, exports.removeEmptyBody)(requestOptions);
    let credentialsDecrypted;
    try {
        const parentTypes = additionalData.credentialsHelper.getParentTypes(credentialsType);
        if (credentialsType === 'oAuth1Api' || parentTypes.includes('oAuth1Api')) {
            return await requestOAuth1.call(this, credentialsType, requestOptions, false);
        }
        if (credentialsType === 'oAuth2Api' || parentTypes.includes('oAuth2Api')) {
            return await requestOAuth2.call(this, credentialsType, requestOptions, node, additionalData, additionalCredentialOptions?.oauth2, false);
        }
        if (additionalCredentialOptions?.credentialsDecrypted) {
            credentialsDecrypted = additionalCredentialOptions.credentialsDecrypted.data;
        }
        else {
            credentialsDecrypted = await this.getCredentials(credentialsType, itemIndex);
        }
        if (credentialsDecrypted === undefined) {
            throw new n8n_workflow_1.NodeOperationError(node, `Node "${node.name}" does not have any credentials of type "${credentialsType}" set`, { level: 'warning' });
        }
        const data = await additionalData.credentialsHelper.preAuthentication({ helpers: this.helpers }, credentialsDecrypted, credentialsType, node, false);
        if (data) {
            Object.assign(credentialsDecrypted, data);
        }
        requestOptions = (await additionalData.credentialsHelper.authenticate(credentialsDecrypted, credentialsType, requestOptions, workflow, node));
        return await proxyRequestToAxios(workflow, additionalData, node, requestOptions);
    }
    catch (error) {
        try {
            if (credentialsDecrypted !== undefined) {
                const data = await additionalData.credentialsHelper.preAuthentication({ helpers: this.helpers }, credentialsDecrypted, credentialsType, node, true);
                if (data) {
                    Object.assign(credentialsDecrypted, data);
                    requestOptions = (await additionalData.credentialsHelper.authenticate(credentialsDecrypted, credentialsType, requestOptions, workflow, node));
                    return await proxyRequestToAxios(workflow, additionalData, node, requestOptions);
                }
            }
            throw error;
        }
        catch (error) {
            if (error instanceof n8n_workflow_1.ExecutionBaseError)
                throw error;
            throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
        }
    }
}
const getRequestHelperFunctions = (workflow, node, additionalData, runExecutionData = null, connectionInputData = []) => {
    const getResolvedValue = (parameterValue, itemIndex, runIndex, executeData, additionalKeys, returnObjectAsString = false) => {
        const mode = 'internal';
        if (typeof parameterValue === 'object' ||
            (typeof parameterValue === 'string' && parameterValue.charAt(0) === '=')) {
            return workflow.expression.getParameterValue(parameterValue, runExecutionData, runIndex, itemIndex, node.name, connectionInputData, mode, additionalKeys ?? {}, executeData, returnObjectAsString);
        }
        return parameterValue;
    };
    async function requestWithAuthenticationPaginated(requestOptions, itemIndex, paginationOptions, credentialsType, additionalCredentialOptions) {
        const responseData = [];
        if (!requestOptions.qs) {
            requestOptions.qs = {};
        }
        requestOptions.resolveWithFullResponse = true;
        requestOptions.simple = false;
        let tempResponseData;
        let makeAdditionalRequest;
        let paginateRequestData;
        const runIndex = 0;
        const additionalKeys = {
            $request: requestOptions,
            $response: {},
            $version: node.typeVersion,
            $pageCount: 0,
        };
        const executeData = {
            data: {},
            node,
            source: null,
        };
        const hashData = {
            identicalCount: 0,
            previousLength: 0,
            previousHash: '',
        };
        do {
            paginateRequestData = getResolvedValue(paginationOptions.request, itemIndex, runIndex, executeData, additionalKeys, false);
            const tempRequestOptions = applyPaginationRequestData(requestOptions, paginateRequestData);
            if (!validateUrl(tempRequestOptions.uri)) {
                throw new n8n_workflow_1.NodeOperationError(node, `'${paginateRequestData.url}' is not a valid URL.`, {
                    itemIndex,
                    runIndex,
                    type: 'invalid_url',
                });
            }
            if (credentialsType) {
                tempResponseData = await this.helpers.requestWithAuthentication.call(this, credentialsType, tempRequestOptions, additionalCredentialOptions);
            }
            else {
                tempResponseData = await this.helpers.request(tempRequestOptions);
            }
            const newResponse = Object.assign({
                body: {},
                headers: {},
                statusCode: 0,
            }, (0, pick_1.default)(tempResponseData, ['body', 'headers', 'statusCode']));
            let contentBody;
            if (newResponse.body instanceof stream_1.Readable && paginationOptions.binaryResult !== true) {
                contentBody = await (0, binary_helper_functions_1.binaryToString)(newResponse.body);
                const responseContentType = newResponse.headers['content-type']?.toString() ?? '';
                if (responseContentType.includes('application/json')) {
                    newResponse.body = (0, n8n_workflow_1.jsonParse)(contentBody, { fallbackValue: {} });
                }
                else {
                    newResponse.body = contentBody;
                }
                tempResponseData.__bodyResolved = true;
                tempResponseData.body = newResponse.body;
            }
            else {
                contentBody = newResponse.body;
            }
            if (paginationOptions.binaryResult !== true || tempResponseData.headers.etag) {
                let contentLength = 0;
                if ('content-length' in tempResponseData.headers) {
                    contentLength = parseInt(tempResponseData.headers['content-length']) || 0;
                }
                if (hashData.previousLength === contentLength) {
                    let hash;
                    if (tempResponseData.headers.etag) {
                        hash = tempResponseData.headers.etag;
                    }
                    else {
                        if (typeof contentBody !== 'string') {
                            contentBody = JSON.stringify(contentBody);
                        }
                        hash = crypto_1.default.createHash('md5').update(contentBody).digest('base64');
                    }
                    if (hashData.previousHash === hash) {
                        hashData.identicalCount += 1;
                        if (hashData.identicalCount > 2) {
                            throw new n8n_workflow_1.NodeOperationError(node, 'The returned response was identical 5x, so requests got stopped', {
                                itemIndex,
                                description: 'Check if "Pagination Completed When" has been configured correctly.',
                            });
                        }
                    }
                    else {
                        hashData.identicalCount = 0;
                    }
                    hashData.previousHash = hash;
                }
                else {
                    hashData.identicalCount = 0;
                }
                hashData.previousLength = contentLength;
            }
            responseData.push(tempResponseData);
            additionalKeys.$response = newResponse;
            additionalKeys.$pageCount = (additionalKeys.$pageCount ?? 0) + 1;
            const maxRequests = getResolvedValue(paginationOptions.maxRequests, itemIndex, runIndex, executeData, additionalKeys, false);
            if (maxRequests && additionalKeys.$pageCount >= maxRequests) {
                break;
            }
            makeAdditionalRequest = getResolvedValue(paginationOptions.continue, itemIndex, runIndex, executeData, additionalKeys, false);
            if (makeAdditionalRequest) {
                if (paginationOptions.requestInterval) {
                    const requestInterval = getResolvedValue(paginationOptions.requestInterval, itemIndex, runIndex, executeData, additionalKeys, false);
                    await (0, n8n_workflow_1.sleep)(requestInterval);
                }
                if (tempResponseData.statusCode < 200 || tempResponseData.statusCode >= 300) {
                    let data = tempResponseData.body;
                    if (data instanceof stream_1.Readable && paginationOptions.binaryResult !== true) {
                        data = await (0, binary_helper_functions_1.binaryToString)(data);
                    }
                    else if (typeof data === 'object') {
                        data = JSON.stringify(data);
                    }
                    throw Object.assign(new Error(`${tempResponseData.statusCode} - "${data?.toString()}"`), {
                        statusCode: tempResponseData.statusCode,
                        error: data,
                        isAxiosError: true,
                        response: {
                            headers: tempResponseData.headers,
                            status: tempResponseData.statusCode,
                            statusText: tempResponseData.statusMessage,
                        },
                    });
                }
            }
        } while (makeAdditionalRequest);
        return responseData;
    }
    return {
        httpRequest,
        requestWithAuthenticationPaginated,
        async httpRequestWithAuthentication(credentialsType, requestOptions, additionalCredentialOptions) {
            return await httpRequestWithAuthentication.call(this, credentialsType, requestOptions, workflow, node, additionalData, additionalCredentialOptions);
        },
        async refreshOAuth2Token(credentialsType, oAuth2Options) {
            return await refreshOAuth2Token.call(this, credentialsType, node, additionalData, oAuth2Options);
        },
        request: async (uriOrObject, options) => await proxyRequestToAxios(workflow, additionalData, node, uriOrObject, options),
        async requestWithAuthentication(credentialsType, requestOptions, additionalCredentialOptions, itemIndex) {
            return await requestWithAuthentication.call(this, credentialsType, requestOptions, workflow, node, additionalData, additionalCredentialOptions, itemIndex);
        },
        async requestOAuth1(credentialsType, requestOptions) {
            return await requestOAuth1.call(this, credentialsType, requestOptions);
        },
        async requestOAuth2(credentialsType, requestOptions, oAuth2Options) {
            return await requestOAuth2.call(this, credentialsType, requestOptions, node, additionalData, oAuth2Options);
        },
    };
};
exports.getRequestHelperFunctions = getRequestHelperFunctions;
//# sourceMappingURL=request-helper-functions.js.map