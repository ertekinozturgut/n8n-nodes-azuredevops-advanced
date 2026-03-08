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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliParser = exports.safeJoinPath = exports.isContainedWithin = exports.ModulesConfig = exports.ModuleRegistry = exports.Logger = exports.isObjectLiteral = exports.inTest = exports.inProduction = exports.inDevelopment = void 0;
__exportStar(require("./license-state"), exports);
var environment_1 = require("./environment");
Object.defineProperty(exports, "inDevelopment", { enumerable: true, get: function () { return environment_1.inDevelopment; } });
Object.defineProperty(exports, "inProduction", { enumerable: true, get: function () { return environment_1.inProduction; } });
Object.defineProperty(exports, "inTest", { enumerable: true, get: function () { return environment_1.inTest; } });
var is_object_literal_1 = require("./utils/is-object-literal");
Object.defineProperty(exports, "isObjectLiteral", { enumerable: true, get: function () { return is_object_literal_1.isObjectLiteral; } });
var logger_1 = require("./logging/logger");
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return logger_1.Logger; } });
var module_registry_1 = require("./modules/module-registry");
Object.defineProperty(exports, "ModuleRegistry", { enumerable: true, get: function () { return module_registry_1.ModuleRegistry; } });
var modules_config_1 = require("./modules/modules.config");
Object.defineProperty(exports, "ModulesConfig", { enumerable: true, get: function () { return modules_config_1.ModulesConfig; } });
var path_util_1 = require("./utils/path-util");
Object.defineProperty(exports, "isContainedWithin", { enumerable: true, get: function () { return path_util_1.isContainedWithin; } });
Object.defineProperty(exports, "safeJoinPath", { enumerable: true, get: function () { return path_util_1.safeJoinPath; } });
var cli_parser_1 = require("./cli-parser");
Object.defineProperty(exports, "CliParser", { enumerable: true, get: function () { return cli_parser_1.CliParser; } });
//# sourceMappingURL=index.js.map