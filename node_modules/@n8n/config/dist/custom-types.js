"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColonSeparatedStringArray = exports.CommaSeparatedStringArray = void 0;
class StringArray extends Array {
    constructor(str, delimiter) {
        super();
        const parsed = str.split(delimiter);
        return parsed.filter((i) => typeof i === 'string' && i.length);
    }
}
class CommaSeparatedStringArray extends StringArray {
    constructor(str) {
        super(str, ',');
    }
}
exports.CommaSeparatedStringArray = CommaSeparatedStringArray;
class ColonSeparatedStringArray extends StringArray {
    constructor(str) {
        super(str, ':');
    }
}
exports.ColonSeparatedStringArray = ColonSeparatedStringArray;
//# sourceMappingURL=custom-types.js.map