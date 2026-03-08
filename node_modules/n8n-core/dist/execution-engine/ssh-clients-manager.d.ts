import { Logger } from '@n8n/backend-common';
import type { SSHCredentials } from 'n8n-workflow';
import { Client } from 'ssh2';
export declare class SSHClientsConfig {
    idleTimeout: number;
}
type Registration = {
    client: Client;
    lastUsed: Date;
    abortController: AbortController;
    returnPromise: Promise<Client>;
};
export declare class SSHClientsManager {
    private readonly config;
    private readonly logger;
    readonly clients: Map<string, Registration>;
    readonly clientsReversed: WeakMap<Client, string>;
    private cleanupTimer;
    constructor(config: SSHClientsConfig, logger: Logger);
    updateLastUsed(client: Client): void;
    getClient(credentials: SSHCredentials, abortController?: AbortController): Promise<Client>;
    private withCleanupHandler;
    private cleanupClient;
    onShutdown(): void;
    cleanupStaleConnections(): void;
}
export {};
