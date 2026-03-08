declare class PostHogConfig {
    apiKey: string;
    apiHost: string;
}
export declare class DiagnosticsConfig {
    enabled: boolean;
    frontendConfig: string;
    backendConfig: string;
    posthogConfig: PostHogConfig;
}
export {};
