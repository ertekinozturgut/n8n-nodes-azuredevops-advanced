"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inDevelopment = exports.inProduction = exports.inTest = void 0;
const { NODE_ENV } = process.env;
exports.inTest = NODE_ENV === 'test';
exports.inProduction = NODE_ENV === 'production';
exports.inDevelopment = !NODE_ENV || NODE_ENV === 'development';
//# sourceMappingURL=environment.js.map