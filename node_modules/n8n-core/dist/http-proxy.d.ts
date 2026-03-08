import http from 'http';
import https from 'https';
export declare function createHttpProxyAgent(customProxyUrl: string | null | undefined, targetUrl: string, options?: http.AgentOptions): http.Agent;
export declare function createHttpsProxyAgent(customProxyUrl: string | null | undefined, targetUrl: string, options?: https.AgentOptions): https.Agent;
export declare function installGlobalProxyAgent(): void;
export declare function uninstallGlobalProxyAgent(): void;
