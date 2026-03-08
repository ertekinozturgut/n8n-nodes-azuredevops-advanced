export declare const INSTANCE_ID_HEADER = "n8n-instance-id";
export declare const INSTANCE_VERSION_HEADER = "n8n-version";
export declare const INSTANCE_TYPES: readonly ["main", "webhook", "worker"];
export type InstanceType = (typeof INSTANCE_TYPES)[number];
export declare const INSTANCE_ROLES: readonly ["unset", "leader", "follower"];
export type InstanceRole = (typeof INSTANCE_ROLES)[number];
