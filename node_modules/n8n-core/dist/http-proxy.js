"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHttpProxyAgent = createHttpProxyAgent;
exports.createHttpsProxyAgent = createHttpsProxyAgent;
exports.installGlobalProxyAgent = installGlobalProxyAgent;
exports.uninstallGlobalProxyAgent = uninstallGlobalProxyAgent;
const http_1 = __importDefault(require("http"));
const http_proxy_agent_1 = require("http-proxy-agent");
const https_1 = __importDefault(require("https"));
const https_proxy_agent_1 = require("https-proxy-agent");
const n8n_workflow_1 = require("n8n-workflow");
const proxy_from_env_1 = __importDefault(require("proxy-from-env"));
function buildTargetUrl(hostname, port, protocol) {
    const defaultPort = protocol === 'https' ? 443 : 80;
    const portSuffix = port === defaultPort ? '' : `:${port}`;
    return `${protocol}://${hostname}${portSuffix}`;
}
function extractHostInfo(options, defaultPort) {
    const hostname = options.hostname ?? options.host ?? 'localhost';
    const port = typeof options.port === 'string' ? parseInt(options.port, 10) : (options.port ?? defaultPort);
    return { hostname: String(hostname), port: Number(port) };
}
function getOrCreateProxyAgent(cache, proxyUrl, createAgent) {
    let proxyAgent = cache.get(proxyUrl);
    if (!proxyAgent) {
        proxyAgent = createAgent(proxyUrl);
        cache.set(proxyUrl, proxyAgent);
    }
    return proxyAgent;
}
function createFallbackAgent(agentClass) {
    return new agentClass();
}
class HttpProxyManager extends http_1.default.Agent {
    constructor() {
        super(...arguments);
        this.proxyAgentCache = new Map();
        this.fallbackAgent = createFallbackAgent(http_1.default.Agent);
    }
    addRequest(req, options) {
        const { hostname, port } = extractHostInfo(options, 80);
        const targetUrl = buildTargetUrl(hostname, port, 'http');
        const proxyUrl = proxy_from_env_1.default.getProxyForUrl(targetUrl);
        if (proxyUrl) {
            const proxyAgent = getOrCreateProxyAgent(this.proxyAgentCache, proxyUrl, (url) => new http_proxy_agent_1.HttpProxyAgent(url));
            return proxyAgent.addRequest(req, options);
        }
        return this.fallbackAgent.addRequest(req, options);
    }
}
class HttpsProxyManager extends https_1.default.Agent {
    constructor() {
        super(...arguments);
        this.proxyAgentCache = new Map();
        this.fallbackAgent = createFallbackAgent(https_1.default.Agent);
    }
    addRequest(req, options) {
        const { hostname, port } = extractHostInfo(options, 443);
        const targetUrl = buildTargetUrl(hostname, port, 'https');
        const proxyUrl = proxy_from_env_1.default.getProxyForUrl(targetUrl);
        if (proxyUrl) {
            const proxyAgent = getOrCreateProxyAgent(this.proxyAgentCache, proxyUrl, (url) => new https_proxy_agent_1.HttpsProxyAgent(url));
            return proxyAgent.addRequest(req, options);
        }
        return this.fallbackAgent.addRequest(req, options);
    }
}
function createHttpProxyAgent(customProxyUrl = null, targetUrl, options) {
    const proxyUrl = customProxyUrl ?? proxy_from_env_1.default.getProxyForUrl(targetUrl);
    if (proxyUrl) {
        return new http_proxy_agent_1.HttpProxyAgent(proxyUrl, options);
    }
    return new http_1.default.Agent(options);
}
function createHttpsProxyAgent(customProxyUrl = null, targetUrl, options) {
    const proxyUrl = customProxyUrl ?? proxy_from_env_1.default.getProxyForUrl(targetUrl);
    if (proxyUrl) {
        return new https_proxy_agent_1.HttpsProxyAgent(proxyUrl, options);
    }
    return new https_1.default.Agent(options);
}
function hasProxyEnvironmentVariables() {
    return Boolean(process.env.HTTP_PROXY ?? process.env.HTTPS_PROXY ?? process.env.ALL_PROXY);
}
function installGlobalProxyAgent() {
    if (hasProxyEnvironmentVariables()) {
        n8n_workflow_1.LoggerProxy.debug('Installing global HTTP proxy agents', {
            HTTP_PROXY: process.env.HTTP_PROXY,
            HTTPS_PROXY: process.env.HTTPS_PROXY,
            NO_PROXY: process.env.NO_PROXY,
            ALL_PROXY: process.env.ALL_PROXY,
        });
        http_1.default.globalAgent = new HttpProxyManager();
        https_1.default.globalAgent = new HttpsProxyManager();
    }
}
function uninstallGlobalProxyAgent() {
    http_1.default.globalAgent = new http_1.default.Agent();
    https_1.default.globalAgent = new https_1.default.Agent();
}
//# sourceMappingURL=http-proxy.js.map