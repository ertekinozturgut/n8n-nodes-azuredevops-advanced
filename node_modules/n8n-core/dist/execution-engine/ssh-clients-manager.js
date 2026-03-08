"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSHClientsManager = exports.SSHClientsConfig = void 0;
const backend_common_1 = require("@n8n/backend-common");
const config_1 = require("@n8n/config");
const di_1 = require("@n8n/di");
const node_crypto_1 = require("node:crypto");
const ssh2_1 = require("ssh2");
const zod_1 = require("zod");
let SSHClientsConfig = class SSHClientsConfig {
    constructor() {
        this.idleTimeout = 5 * 60;
    }
};
exports.SSHClientsConfig = SSHClientsConfig;
__decorate([
    (0, config_1.Env)('N8N_SSH_TUNNEL_IDLE_TIMEOUT', zod_1.z
        .string()
        .transform((value) => Number.parseInt(value))
        .superRefine((value, ctx) => {
        if (Number.isNaN(value)) {
            return ctx.addIssue({
                message: 'must be a valid integer',
                code: 'custom',
            });
        }
        if (value <= 0) {
            return ctx.addIssue({
                message: 'must be positive',
                code: 'too_small',
                minimum: 0,
                inclusive: false,
                type: 'number',
            });
        }
    })),
    __metadata("design:type", Number)
], SSHClientsConfig.prototype, "idleTimeout", void 0);
exports.SSHClientsConfig = SSHClientsConfig = __decorate([
    config_1.Config
], SSHClientsConfig);
let SSHClientsManager = class SSHClientsManager {
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
        this.clients = new Map();
        this.clientsReversed = new WeakMap();
        process.on('exit', () => this.onShutdown());
        this.cleanupTimer = setInterval(() => this.cleanupStaleConnections(), 60 * 1000);
        this.logger = logger.scoped('ssh-client');
    }
    updateLastUsed(client) {
        const key = this.clientsReversed.get(client);
        if (key) {
            const registration = this.clients.get(key);
            if (registration) {
                registration.lastUsed = new Date();
            }
        }
        else {
            const metadata = {};
            Error.captureStackTrace(metadata, this.updateLastUsed);
            this.logger.warn('Tried to update `lastUsed` for a client that has been cleaned up already. Probably forgot to subscribe to the AbortController somewhere.', metadata);
        }
    }
    async getClient(credentials, abortController) {
        abortController = abortController ?? new AbortController();
        const { sshAuthenticateWith, sshHost, sshPort, sshUser } = credentials;
        const sshConfig = {
            host: sshHost,
            port: sshPort,
            username: sshUser,
            ...(sshAuthenticateWith === 'password'
                ? { password: credentials.sshPassword }
                : {
                    privateKey: credentials.privateKey,
                    passphrase: credentials.passphrase ?? undefined,
                }),
        };
        const clientHash = (0, node_crypto_1.createHash)('sha1').update(JSON.stringify(sshConfig)).digest('base64');
        const existing = this.clients.get(clientHash);
        if (existing) {
            existing.lastUsed = new Date();
            return await existing.returnPromise;
        }
        const sshClient = this.withCleanupHandler(new ssh2_1.Client(), abortController, clientHash);
        const returnPromise = new Promise((resolve, reject) => {
            sshClient.once('error', reject);
            sshClient.once('ready', () => {
                sshClient.off('error', reject);
                resolve(sshClient);
            });
            sshClient.connect(sshConfig);
        });
        this.clients.set(clientHash, {
            client: sshClient,
            lastUsed: new Date(),
            abortController,
            returnPromise,
        });
        this.clientsReversed.set(sshClient, clientHash);
        return await returnPromise;
    }
    withCleanupHandler(sshClient, abortController, key) {
        sshClient.on('error', (error) => {
            this.logger.error('encountered error, calling cleanup', { error });
            this.cleanupClient(key);
        });
        sshClient.on('end', () => {
            this.logger.debug('socket was disconnected, calling abort signal', {});
            this.cleanupClient(key);
        });
        sshClient.on('close', () => {
            this.logger.debug('socket was closed, calling abort signal', {});
            this.cleanupClient(key);
        });
        abortController.signal.addEventListener('abort', () => {
            this.logger.debug('Got abort signal, cleaning up ssh client.', {
                reason: abortController.signal.reason,
            });
            this.cleanupClient(key);
        });
        return sshClient;
    }
    cleanupClient(key) {
        const registration = this.clients.get(key);
        if (registration) {
            this.clients.delete(key);
            registration.client.end();
            if (!registration.abortController.signal.aborted) {
                registration.abortController.abort();
            }
        }
    }
    onShutdown() {
        this.logger.debug('Shutting down. Cleaning up all clients');
        clearInterval(this.cleanupTimer);
        for (const key of this.clients.keys()) {
            this.cleanupClient(key);
        }
    }
    cleanupStaleConnections() {
        const { clients } = this;
        if (clients.size === 0)
            return;
        const now = Date.now();
        for (const [key, { lastUsed }] of clients.entries()) {
            if (now - lastUsed.getTime() > this.config.idleTimeout * 1000) {
                this.logger.debug('Found stale client. Cleaning it up.');
                this.cleanupClient(key);
            }
        }
    }
};
exports.SSHClientsManager = SSHClientsManager;
exports.SSHClientsManager = SSHClientsManager = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [SSHClientsConfig,
        backend_common_1.Logger])
], SSHClientsManager);
//# sourceMappingURL=ssh-clients-manager.js.map