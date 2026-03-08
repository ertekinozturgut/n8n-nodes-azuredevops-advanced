"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = void 0;
exports.Time = {
    milliseconds: {
        toMinutes: 1 / (60 * 1000),
        toSeconds: 1 / 1000,
    },
    seconds: {
        toMilliseconds: 1000,
    },
    minutes: {
        toMilliseconds: 60 * 1000,
    },
    hours: {
        toMilliseconds: 60 * 60 * 1000,
        toSeconds: 60 * 60,
    },
    days: {
        toSeconds: 24 * 60 * 60,
        toMilliseconds: 24 * 60 * 60 * 1000,
    },
};
//# sourceMappingURL=time.js.map