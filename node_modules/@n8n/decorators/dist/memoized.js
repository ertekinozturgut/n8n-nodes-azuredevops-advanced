"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Memoized = Memoized;
const node_assert_1 = __importDefault(require("node:assert"));
function Memoized(target, propertyKey, descriptor) {
    const originalGetter = descriptor?.get;
    (0, node_assert_1.default)(originalGetter, '@Memoized can only be used on getters');
    descriptor.get = function () {
        const value = originalGetter.call(this);
        Object.defineProperty(this, propertyKey, {
            value,
            configurable: false,
            enumerable: false,
            writable: false,
        });
        return value;
    };
    return descriptor;
}
//# sourceMappingURL=memoized.js.map