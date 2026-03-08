"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debounce = void 0;
const debounce_1 = __importDefault(require("lodash/debounce"));
const Debounce = (waitMs) => (_, methodName, originalDescriptor) => ({
    configurable: true,
    get() {
        const debouncedFn = (0, debounce_1.default)(originalDescriptor.value, waitMs);
        Object.defineProperty(this, methodName, {
            configurable: false,
            value: debouncedFn,
        });
        return debouncedFn;
    },
});
exports.Debounce = Debounce;
//# sourceMappingURL=debounce.js.map