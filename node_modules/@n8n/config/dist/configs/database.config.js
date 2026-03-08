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
exports.DatabaseConfig = exports.SqliteConfig = void 0;
const zod_1 = require("zod");
const decorators_1 = require("../decorators");
const dbLoggingOptionsSchema = zod_1.z.enum(['query', 'error', 'schema', 'warn', 'info', 'log', 'all']);
let LoggingConfig = class LoggingConfig {
    constructor() {
        this.enabled = false;
        this.options = 'error';
        this.maxQueryExecutionTime = 0;
    }
};
__decorate([
    (0, decorators_1.Env)('DB_LOGGING_ENABLED'),
    __metadata("design:type", Boolean)
], LoggingConfig.prototype, "enabled", void 0);
__decorate([
    (0, decorators_1.Env)('DB_LOGGING_OPTIONS', dbLoggingOptionsSchema),
    __metadata("design:type", String)
], LoggingConfig.prototype, "options", void 0);
__decorate([
    (0, decorators_1.Env)('DB_LOGGING_MAX_EXECUTION_TIME'),
    __metadata("design:type", Number)
], LoggingConfig.prototype, "maxQueryExecutionTime", void 0);
LoggingConfig = __decorate([
    decorators_1.Config
], LoggingConfig);
let PostgresSSLConfig = class PostgresSSLConfig {
    constructor() {
        this.enabled = false;
        this.ca = '';
        this.cert = '';
        this.key = '';
        this.rejectUnauthorized = true;
    }
};
__decorate([
    (0, decorators_1.Env)('DB_POSTGRESDB_SSL_ENABLED'),
    __metadata("design:type", Boolean)
], PostgresSSLConfig.prototype, "enabled", void 0);
__decorate([
    (0, decorators_1.Env)('DB_POSTGRESDB_SSL_CA'),
    __metadata("design:type", String)
], PostgresSSLConfig.prototype, "ca", void 0);
__decorate([
    (0, decorators_1.Env)('DB_POSTGRESDB_SSL_CERT'),
    __metadata("design:type", String)
], PostgresSSLConfig.prototype, "cert", void 0);
__decorate([
    (0, decorators_1.Env)('DB_POSTGRESDB_SSL_KEY'),
    __metadata("design:type", String)
], PostgresSSLConfig.prototype, "key", void 0);
__decorate([
    (0, decorators_1.Env)('DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED'),
    __metadata("design:type", Boolean)
], PostgresSSLConfig.prototype, "rejectUnauthorized", void 0);
PostgresSSLConfig = __decorate([
    decorators_1.Config
], PostgresSSLConfig);
let PostgresConfig = class PostgresConfig {
    constructor() {
        this.database = 'n8n';
        this.host = 'localhost';
        this.password = '';
        this.port = 5432;
        this.user = 'postgres';
        this.schema = 'public';
        this.poolSize = 2;
        this.connectionTimeoutMs = 20_000;
        this.idleTimeoutMs = 30_000;
    }
};
__decorate([
    (0, decorators_1.Env)('DB_POSTGRESDB_DATABASE'),
    __metadata("design:type", String)
], PostgresConfig.prototype, "database", void 0);
__decorate([
    (0, decorators_1.Env)('DB_POSTGRESDB_HOST'),
    __metadata("design:type", String)
], PostgresConfig.prototype, "host", void 0);
__decorate([
    (0, decorators_1.Env)('DB_POSTGRESDB_PASSWORD'),
    __metadata("design:type", String)
], PostgresConfig.prototype, "password", void 0);
__decorate([
    (0, decorators_1.Env)('DB_POSTGRESDB_PORT'),
    __metadata("design:type", Number)
], PostgresConfig.prototype, "port", void 0);
__decorate([
    (0, decorators_1.Env)('DB_POSTGRESDB_USER'),
    __metadata("design:type", String)
], PostgresConfig.prototype, "user", void 0);
__decorate([
    (0, decorators_1.Env)('DB_POSTGRESDB_SCHEMA'),
    __metadata("design:type", String)
], PostgresConfig.prototype, "schema", void 0);
__decorate([
    (0, decorators_1.Env)('DB_POSTGRESDB_POOL_SIZE'),
    __metadata("design:type", Number)
], PostgresConfig.prototype, "poolSize", void 0);
__decorate([
    (0, decorators_1.Env)('DB_POSTGRESDB_CONNECTION_TIMEOUT'),
    __metadata("design:type", Number)
], PostgresConfig.prototype, "connectionTimeoutMs", void 0);
__decorate([
    (0, decorators_1.Env)('DB_POSTGRESDB_IDLE_CONNECTION_TIMEOUT'),
    __metadata("design:type", Number)
], PostgresConfig.prototype, "idleTimeoutMs", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", PostgresSSLConfig)
], PostgresConfig.prototype, "ssl", void 0);
PostgresConfig = __decorate([
    decorators_1.Config
], PostgresConfig);
let MysqlConfig = class MysqlConfig {
    constructor() {
        this.database = 'n8n';
        this.host = 'localhost';
        this.password = '';
        this.port = 3306;
        this.user = 'root';
        this.poolSize = 10;
    }
};
__decorate([
    (0, decorators_1.Env)('DB_MYSQLDB_DATABASE'),
    __metadata("design:type", String)
], MysqlConfig.prototype, "database", void 0);
__decorate([
    (0, decorators_1.Env)('DB_MYSQLDB_HOST'),
    __metadata("design:type", String)
], MysqlConfig.prototype, "host", void 0);
__decorate([
    (0, decorators_1.Env)('DB_MYSQLDB_PASSWORD'),
    __metadata("design:type", String)
], MysqlConfig.prototype, "password", void 0);
__decorate([
    (0, decorators_1.Env)('DB_MYSQLDB_PORT'),
    __metadata("design:type", Number)
], MysqlConfig.prototype, "port", void 0);
__decorate([
    (0, decorators_1.Env)('DB_MYSQLDB_USER'),
    __metadata("design:type", String)
], MysqlConfig.prototype, "user", void 0);
__decorate([
    (0, decorators_1.Env)('DB_MYSQLDB_POOL_SIZE'),
    __metadata("design:type", Number)
], MysqlConfig.prototype, "poolSize", void 0);
MysqlConfig = __decorate([
    decorators_1.Config
], MysqlConfig);
let SqliteConfig = class SqliteConfig {
    constructor() {
        this.database = 'database.sqlite';
        this.poolSize = 0;
        this.enableWAL = this.poolSize > 1;
        this.executeVacuumOnStartup = false;
    }
};
exports.SqliteConfig = SqliteConfig;
__decorate([
    (0, decorators_1.Env)('DB_SQLITE_DATABASE'),
    __metadata("design:type", String)
], SqliteConfig.prototype, "database", void 0);
__decorate([
    (0, decorators_1.Env)('DB_SQLITE_POOL_SIZE'),
    __metadata("design:type", Number)
], SqliteConfig.prototype, "poolSize", void 0);
__decorate([
    (0, decorators_1.Env)('DB_SQLITE_ENABLE_WAL'),
    __metadata("design:type", Boolean)
], SqliteConfig.prototype, "enableWAL", void 0);
__decorate([
    (0, decorators_1.Env)('DB_SQLITE_VACUUM_ON_STARTUP'),
    __metadata("design:type", Boolean)
], SqliteConfig.prototype, "executeVacuumOnStartup", void 0);
exports.SqliteConfig = SqliteConfig = __decorate([
    decorators_1.Config
], SqliteConfig);
const dbTypeSchema = zod_1.z.enum(['sqlite', 'mariadb', 'mysqldb', 'postgresdb']);
let DatabaseConfig = class DatabaseConfig {
    constructor() {
        this.type = 'sqlite';
        this.tablePrefix = '';
        this.pingIntervalSeconds = 2;
    }
    get isLegacySqlite() {
        return this.type === 'sqlite' && this.sqlite.poolSize === 0;
    }
};
exports.DatabaseConfig = DatabaseConfig;
__decorate([
    (0, decorators_1.Env)('DB_TYPE', dbTypeSchema),
    __metadata("design:type", String)
], DatabaseConfig.prototype, "type", void 0);
__decorate([
    (0, decorators_1.Env)('DB_TABLE_PREFIX'),
    __metadata("design:type", String)
], DatabaseConfig.prototype, "tablePrefix", void 0);
__decorate([
    (0, decorators_1.Env)('DB_PING_INTERVAL_SECONDS'),
    __metadata("design:type", Number)
], DatabaseConfig.prototype, "pingIntervalSeconds", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", LoggingConfig)
], DatabaseConfig.prototype, "logging", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", PostgresConfig)
], DatabaseConfig.prototype, "postgresdb", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", MysqlConfig)
], DatabaseConfig.prototype, "mysqldb", void 0);
__decorate([
    decorators_1.Nested,
    __metadata("design:type", SqliteConfig)
], DatabaseConfig.prototype, "sqlite", void 0);
exports.DatabaseConfig = DatabaseConfig = __decorate([
    decorators_1.Config
], DatabaseConfig);
//# sourceMappingURL=database.config.js.map