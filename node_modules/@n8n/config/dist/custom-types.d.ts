declare abstract class StringArray<T extends string> extends Array<T> {
    constructor(str: string, delimiter: string);
}
export declare class CommaSeparatedStringArray<T extends string> extends StringArray<T> {
    constructor(str: string);
}
export declare class ColonSeparatedStringArray<T extends string = string> extends StringArray<T> {
    constructor(str: string);
}
export {};
