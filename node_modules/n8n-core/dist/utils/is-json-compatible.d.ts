export declare function isJsonCompatible(value: unknown, keysToIgnore?: Set<string>): {
    isValid: true;
} | {
    isValid: false;
    errorPath: string;
    errorMessage: string;
};
