import type { EnsureTypeOptions } from 'n8n-workflow';
export declare function ensureType(toType: EnsureTypeOptions, parameterValue: any, parameterName: string, errorOptions?: {
    itemIndex?: number;
    runIndex?: number;
    nodeCause?: string;
}): string | number | boolean | object;
