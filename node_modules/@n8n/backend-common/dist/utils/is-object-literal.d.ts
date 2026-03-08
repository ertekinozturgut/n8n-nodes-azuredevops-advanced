type ObjectLiteral = {
    [key: string | symbol]: unknown;
};
export declare function isObjectLiteral(candidate: unknown): candidate is ObjectLiteral;
export {};
