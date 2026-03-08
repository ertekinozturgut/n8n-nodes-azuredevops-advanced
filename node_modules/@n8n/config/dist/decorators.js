"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = exports.Nested = exports.Config = void 0;
require("reflect-metadata");
const di_1 = require("@n8n/di");
const fs_1 = require("fs");
const zod_1 = require("zod");
const globalMetadata = new Map();
const readEnv = (envName) => {
    if (envName in process.env)
        return process.env[envName];
    const filePath = process.env[`${envName}_FILE`];
    if (filePath)
        return (0, fs_1.readFileSync)(filePath, 'utf8');
    return undefined;
};
const Config = (ConfigClass) => {
    const factory = function (...args) {
        const config = new ConfigClass(...args);
        const classMetadata = globalMetadata.get(ConfigClass);
        if (!classMetadata) {
            throw new Error('Invalid config class: ' + ConfigClass.name);
        }
        for (const [key, { type, envName, schema }] of classMetadata) {
            if (typeof type === 'function' && globalMetadata.has(type)) {
                config[key] = di_1.Container.get(type);
            }
            else if (envName) {
                const value = readEnv(envName);
                if (value === undefined)
                    continue;
                if (schema) {
                    const result = schema.safeParse(value);
                    if (result.error) {
                        console.warn(`Invalid value for ${envName} - ${result.error.issues[0].message}. Falling back to default value.`);
                        continue;
                    }
                    config[key] = result.data;
                }
                else if (type === Number) {
                    const parsed = Number(value);
                    if (isNaN(parsed)) {
                        console.warn(`Invalid number value for ${envName}: ${value}`);
                    }
                    else {
                        config[key] = parsed;
                    }
                }
                else if (type === Boolean) {
                    if (['true', '1'].includes(value.toLowerCase())) {
                        config[key] = true;
                    }
                    else if (['false', '0'].includes(value.toLowerCase())) {
                        config[key] = false;
                    }
                    else {
                        console.warn(`Invalid boolean value for ${envName}: ${value}`);
                    }
                }
                else if (type === Date) {
                    const timestamp = Date.parse(value);
                    if (isNaN(timestamp)) {
                        console.warn(`Invalid timestamp value for ${envName}: ${value}`);
                    }
                    else {
                        config[key] = new Date(timestamp);
                    }
                }
                else if (type === String) {
                    config[key] = value.trim().replace(/^(['"])(.*)\1$/, '$2');
                }
                else {
                    config[key] = new type(value);
                }
            }
        }
        if (typeof config.sanitize === 'function')
            config.sanitize();
        return config;
    };
    return (0, di_1.Service)({ factory })(ConfigClass);
};
exports.Config = Config;
const Nested = (target, key) => {
    const ConfigClass = target.constructor;
    const classMetadata = globalMetadata.get(ConfigClass) ?? new Map();
    const type = Reflect.getMetadata('design:type', target, key);
    classMetadata.set(key, { type });
    globalMetadata.set(ConfigClass, classMetadata);
};
exports.Nested = Nested;
const Env = (envName, schema) => (target, key) => {
    const ConfigClass = target.constructor;
    const classMetadata = globalMetadata.get(ConfigClass) ?? new Map();
    const type = Reflect.getMetadata('design:type', target, key);
    const isZodSchema = schema instanceof zod_1.z.ZodType;
    if (type === Object && !isZodSchema) {
        throw new Error(`Invalid decorator metadata on key "${key}" on ${ConfigClass.name}\n Please use explicit typing on all config fields`);
    }
    classMetadata.set(key, { type, envName, schema });
    globalMetadata.set(ConfigClass, classMetadata);
};
exports.Env = Env;
//# sourceMappingURL=decorators.js.map