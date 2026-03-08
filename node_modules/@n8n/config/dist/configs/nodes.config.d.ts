declare class JsonStringArray extends Array<string> {
    constructor(str: string);
}
export declare class NodesConfig {
    include: JsonStringArray;
    exclude: JsonStringArray;
    errorTriggerType: string;
    pythonEnabled: boolean;
}
export {};
