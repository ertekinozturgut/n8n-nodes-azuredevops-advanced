import type { BooleanLicenseFeature, NumericLicenseFeature } from '@n8n/constants';
export type FeatureReturnType = Partial<{
    planName: string;
} & {
    [K in NumericLicenseFeature]: number;
} & {
    [K in BooleanLicenseFeature]: boolean;
}>;
export interface LicenseProvider {
    isLicensed(feature: BooleanLicenseFeature): boolean;
    getValue<T extends keyof FeatureReturnType>(feature: T): FeatureReturnType[T];
}
