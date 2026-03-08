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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleRegistry = void 0;
const decorators_1 = require("@n8n/decorators");
const di_1 = require("@n8n/di");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const missing_module_error_1 = require("./errors/missing-module.error");
const module_confusion_error_1 = require("./errors/module-confusion.error");
const modules_config_1 = require("./modules.config");
const license_state_1 = require("../license-state");
const logger_1 = require("../logging/logger");
let ModuleRegistry = class ModuleRegistry {
    constructor(moduleMetadata, licenseState, logger, modulesConfig) {
        this.moduleMetadata = moduleMetadata;
        this.licenseState = licenseState;
        this.logger = logger;
        this.modulesConfig = modulesConfig;
        this.entities = [];
        this.loadDirs = [];
        this.settings = new Map();
        this.context = new Map();
        this.defaultModules = [
            'insights',
            'external-secrets',
            'community-packages',
            'data-table',
            'mcp',
            'provisioning',
            'breaking-changes',
        ];
        this.activeModules = [];
    }
    get eligibleModules() {
        const { enabledModules, disabledModules } = this.modulesConfig;
        const doubleListed = enabledModules.filter((m) => disabledModules.includes(m));
        if (doubleListed.length > 0)
            throw new module_confusion_error_1.ModuleConfusionError(doubleListed);
        const defaultPlusEnabled = [...new Set([...this.defaultModules, ...enabledModules])];
        return defaultPlusEnabled.filter((m) => !disabledModules.includes(m));
    }
    async loadModules(modules) {
        let modulesDir;
        try {
            const n8nPackagePath = require.resolve('n8n/package.json');
            const n8nRoot = path_1.default.dirname(n8nPackagePath);
            const srcDirExists = (0, fs_1.existsSync)(path_1.default.join(n8nRoot, 'src'));
            const dir = process.env.NODE_ENV === 'test' && srcDirExists ? 'src' : 'dist';
            modulesDir = path_1.default.join(n8nRoot, dir, 'modules');
        }
        catch {
            modulesDir = path_1.default.resolve(process.argv[1], '../../dist/modules');
        }
        for (const moduleName of modules ?? this.eligibleModules) {
            try {
                await Promise.resolve(`${`${modulesDir}/${moduleName}/${moduleName}.module`}`).then(s => __importStar(require(s)));
            }
            catch {
                try {
                    await Promise.resolve(`${`${modulesDir}/${moduleName}.ee/${moduleName}.module`}`).then(s => __importStar(require(s)));
                }
                catch (error) {
                    throw new missing_module_error_1.MissingModuleError(moduleName, error instanceof Error ? error.message : '');
                }
            }
        }
        for (const ModuleClass of this.moduleMetadata.getClasses()) {
            const entities = await di_1.Container.get(ModuleClass).entities?.();
            if (entities?.length)
                this.entities.push(...entities);
            const loadDir = await di_1.Container.get(ModuleClass).loadDir?.();
            if (loadDir)
                this.loadDirs.push(loadDir);
        }
    }
    async initModules(instanceType) {
        for (const [moduleName, moduleEntry] of this.moduleMetadata.getEntries()) {
            const { licenseFlag, instanceTypes, class: ModuleClass } = moduleEntry;
            if (licenseFlag !== undefined && !this.licenseState.isLicensed(licenseFlag)) {
                this.logger.debug(`Skipped init for unlicensed module "${moduleName}"`);
                continue;
            }
            if (instanceTypes !== undefined && !instanceTypes.includes(instanceType)) {
                this.logger.debug(`Skipped init for module "${moduleName}" (instance type "${instanceType}" not in: ${instanceTypes.join(', ')})`);
                continue;
            }
            await di_1.Container.get(ModuleClass).init?.();
            const moduleSettings = await di_1.Container.get(ModuleClass).settings?.();
            if (moduleSettings)
                this.settings.set(moduleName, moduleSettings);
            const moduleContext = await di_1.Container.get(ModuleClass).context?.();
            if (moduleContext)
                this.context.set(moduleName, moduleContext);
            this.logger.debug(`Initialized module "${moduleName}"`);
            this.activeModules.push(moduleName);
        }
    }
    async refreshModuleSettings(moduleName) {
        const moduleEntry = this.moduleMetadata.get(moduleName);
        if (!moduleEntry) {
            this.logger.debug('Skipping settings refresh for unregistered module', { moduleName });
            return null;
        }
        const moduleSettings = await di_1.Container.get(moduleEntry.class).settings?.();
        if (moduleSettings) {
            this.settings.set(moduleName, moduleSettings);
        }
        else {
            this.settings.delete(moduleName);
        }
        return moduleSettings ?? null;
    }
    async shutdownModule(moduleName) {
        const moduleEntry = this.moduleMetadata.get(moduleName);
        if (!moduleEntry) {
            this.logger.debug('Skipping shutdown for unregistered module', { moduleName });
            return;
        }
        await di_1.Container.get(moduleEntry.class).shutdown?.();
        const index = this.activeModules.indexOf(moduleName);
        if (index > -1)
            this.activeModules.splice(index, 1);
        this.logger.debug(`Shut down module "${moduleName}"`);
    }
    isActive(moduleName) {
        return this.activeModules.includes(moduleName);
    }
    getActiveModules() {
        return this.activeModules;
    }
};
exports.ModuleRegistry = ModuleRegistry;
exports.ModuleRegistry = ModuleRegistry = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [decorators_1.ModuleMetadata,
        license_state_1.LicenseState,
        logger_1.Logger,
        modules_config_1.ModulesConfig])
], ModuleRegistry);
//# sourceMappingURL=module-registry.js.map