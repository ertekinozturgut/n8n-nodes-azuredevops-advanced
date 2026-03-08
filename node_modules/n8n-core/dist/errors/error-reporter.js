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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorReporter = void 0;
const backend_common_1 = require("@n8n/backend-common");
const di_1 = require("@n8n/di");
const axios_1 = require("axios");
const n8n_workflow_1 = require("n8n-workflow");
const node_crypto_1 = require("node:crypto");
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const SIX_WEEKS_IN_MS = 6 * 7 * ONE_DAY_IN_MS;
const RELEASE_EXPIRATION_WARNING = 'Error tracking disabled because this release is older than 6 weeks.';
let ErrorReporter = class ErrorReporter {
    constructor(logger) {
        this.logger = logger;
        this.seenErrors = new Set();
        this.report = this.defaultReport;
    }
    defaultReport(error, options) {
        if (error instanceof Error) {
            let e = error;
            const { executionId } = options ?? {};
            const context = executionId ? ` (execution ${executionId})` : '';
            do {
                let stack = '';
                let meta = undefined;
                if (e instanceof n8n_workflow_1.ApplicationError || e instanceof n8n_workflow_1.BaseError) {
                    if (e.level === 'error' && e.stack) {
                        stack = `\n${e.stack}\n`;
                    }
                    meta = e.extra;
                }
                const msg = [e.message + context, stack].join('');
                if (options?.shouldBeLogged ?? true) {
                    this.logger.error(msg, meta);
                }
                e = e.cause;
            } while (e);
        }
    }
    async shutdown(timeoutInMs = 1000) {
        clearTimeout(this.expirationTimer);
        const { close } = await Promise.resolve().then(() => __importStar(require('@sentry/node')));
        await close(timeoutInMs);
    }
    async init({ beforeSendFilter, dsn, serverType, release, environment, serverName, releaseDate, withEventLoopBlockDetection, }) {
        if (backend_common_1.inTest)
            return;
        process.on('uncaughtException', (error) => {
            this.error(error);
        });
        if (releaseDate) {
            const releaseExpiresAtMs = releaseDate.getTime() + SIX_WEEKS_IN_MS;
            const releaseExpiresInMs = () => releaseExpiresAtMs - Date.now();
            if (releaseExpiresInMs() <= 0) {
                this.logger.warn(RELEASE_EXPIRATION_WARNING);
                return;
            }
            const checkForExpiration = () => {
                if (releaseExpiresInMs() <= 0) {
                    this.logger.warn(RELEASE_EXPIRATION_WARNING);
                    this.report = this.defaultReport;
                }
                else {
                    this.expirationTimer = setTimeout(checkForExpiration, ONE_DAY_IN_MS);
                }
            };
            checkForExpiration();
        }
        if (!dsn)
            return;
        Error.stackTraceLimit = 50;
        const { init, captureException, setTag } = await Promise.resolve().then(() => __importStar(require('@sentry/node')));
        const { requestDataIntegration, rewriteFramesIntegration } = await Promise.resolve().then(() => __importStar(require('@sentry/node')));
        const enabledIntegrations = [
            'InboundFilters',
            'FunctionToString',
            'LinkedErrors',
            'OnUnhandledRejection',
            'ContextLines',
        ];
        const eventLoopBlockIntegration = withEventLoopBlockDetection
            ?
                await this.getEventLoopBlockIntegration({
                    server_name: serverName,
                    server_type: serverType,
                })
            : [];
        init({
            dsn,
            release,
            environment,
            tracesSampleRate: backend_common_1.inProduction ? 0.01 : 0,
            serverName,
            beforeBreadcrumb: () => null,
            beforeSend: this.beforeSend.bind(this),
            integrations: (integrations) => [
                ...integrations.filter(({ name }) => enabledIntegrations.includes(name)),
                rewriteFramesIntegration({ root: '/' }),
                requestDataIntegration({
                    include: {
                        cookies: false,
                        data: false,
                        headers: false,
                        query_string: false,
                        url: true,
                    },
                }),
                ...eventLoopBlockIntegration,
            ],
        });
        setTag('server_type', serverType);
        this.report = (error, options) => captureException(error, options);
        this.beforeSendFilter = beforeSendFilter;
    }
    async beforeSend(event, hint) {
        let { originalException } = hint;
        if (!originalException)
            return null;
        if (originalException instanceof Promise) {
            originalException = await originalException.catch((error) => error);
        }
        if (this.beforeSendFilter?.(event, {
            ...hint,
            originalException,
        })) {
            return null;
        }
        if (originalException instanceof axios_1.AxiosError)
            return null;
        if (originalException instanceof n8n_workflow_1.BaseError) {
            if (!originalException.shouldReport)
                return null;
            this.extractEventDetailsFromN8nError(event, originalException);
        }
        if (this.isIgnoredSqliteError(originalException))
            return null;
        if (originalException instanceof n8n_workflow_1.ApplicationError || originalException instanceof n8n_workflow_1.BaseError) {
            if (this.isIgnoredN8nError(originalException))
                return null;
            this.extractEventDetailsFromN8nError(event, originalException);
        }
        if (originalException instanceof Error &&
            'cause' in originalException &&
            originalException.cause instanceof Error &&
            'level' in originalException.cause &&
            (originalException.cause.level === 'warning' || originalException.cause.level === 'info')) {
            return null;
        }
        if (originalException instanceof Error && originalException.stack) {
            const eventHash = (0, node_crypto_1.createHash)('sha1').update(originalException.stack).digest('base64');
            if (this.seenErrors.has(eventHash))
                return null;
            this.seenErrors.add(eventHash);
        }
        return event;
    }
    error(e, options) {
        if (e instanceof n8n_workflow_1.ExecutionCancelledError)
            return;
        const toReport = this.wrap(e);
        if (toReport)
            this.report(toReport, options);
    }
    warn(warning, options) {
        this.error(warning, { ...options, level: 'warning' });
    }
    info(msg, options) {
        this.report(msg, { ...options, level: 'info' });
    }
    wrap(e) {
        if (e instanceof Error)
            return e;
        if (typeof e === 'string')
            return new n8n_workflow_1.ApplicationError(e);
        return;
    }
    isIgnoredSqliteError(error) {
        return (error instanceof Error &&
            error.name === 'QueryFailedError' &&
            typeof error.message === 'string' &&
            ['SQLITE_FULL', 'SQLITE_IOERR'].some((errMsg) => error.message.includes(errMsg)));
    }
    isIgnoredN8nError(error) {
        return error.level === 'warning' || error.level === 'info';
    }
    extractEventDetailsFromN8nError(event, originalException) {
        const { level, extra, tags } = originalException;
        event.level = level;
        if (extra)
            event.extra = { ...event.extra, ...extra };
        if (tags)
            event.tags = { ...event.tags, ...tags };
    }
    async getEventLoopBlockIntegration(tags) {
        try {
            const { eventLoopBlockIntegration } = await Promise.resolve().then(() => __importStar(require('@sentry/node-native')));
            return [
                eventLoopBlockIntegration({
                    staticTags: tags,
                }),
            ];
        }
        catch {
            this.logger.debug("Sentry's event loop block integration is disabled, because the native binary for `@sentry/node-native` was not found");
            return [];
        }
    }
};
exports.ErrorReporter = ErrorReporter;
exports.ErrorReporter = ErrorReporter = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [backend_common_1.Logger])
], ErrorReporter);
//# sourceMappingURL=error-reporter.js.map