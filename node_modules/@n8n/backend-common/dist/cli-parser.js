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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliParser = void 0;
const di_1 = require("@n8n/di");
const yargs_parser_1 = __importDefault(require("yargs-parser"));
const logging_1 = require("./logging");
let CliParser = class CliParser {
    constructor(logger) {
        this.logger = logger;
    }
    parse(input) {
        const { _: rest, ...rawFlags } = (0, yargs_parser_1.default)(input.argv, { string: ['id'] });
        let flags = {};
        if (input.flagsSchema) {
            for (const key in input.flagsSchema.shape) {
                const flagSchema = input.flagsSchema.shape[key];
                let schemaDef = flagSchema._def;
                if (schemaDef.typeName === 'ZodOptional' && schemaDef.innerType) {
                    schemaDef = schemaDef.innerType._def;
                }
                const alias = schemaDef._alias;
                if (alias?.length && !(key in rawFlags) && rawFlags[alias]) {
                    rawFlags[key] = rawFlags[alias];
                }
            }
            flags = input.flagsSchema.parse(rawFlags);
        }
        const args = rest.map(String).slice(2);
        this.logger.debug('Received CLI command', {
            execPath: rest[0],
            scriptPath: rest[1],
            args,
            flags,
        });
        return { flags, args };
    }
};
exports.CliParser = CliParser;
exports.CliParser = CliParser = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [logging_1.Logger])
], CliParser);
//# sourceMappingURL=cli-parser.js.map