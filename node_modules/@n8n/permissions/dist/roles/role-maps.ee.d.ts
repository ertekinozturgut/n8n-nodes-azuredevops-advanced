import type { CredentialSharingRole, GlobalRole, ProjectRole, Scope, WorkflowSharingRole } from '../types.ee';
export declare const GLOBAL_SCOPE_MAP: Record<GlobalRole, Scope[]>;
export declare const PROJECT_SCOPE_MAP: Record<ProjectRole, Scope[]>;
export declare const CREDENTIALS_SHARING_SCOPE_MAP: Record<CredentialSharingRole, Scope[]>;
export declare const WORKFLOW_SHARING_SCOPE_MAP: Record<WorkflowSharingRole, Scope[]>;
export declare const ALL_ROLE_MAPS: {
    readonly global: Record<"global:owner" | "global:admin" | "global:member", Scope[]>;
    readonly project: Record<"project:personalOwner" | "project:admin" | "project:editor" | "project:viewer", Scope[]>;
    readonly credential: Record<"credential:owner" | "credential:user", Scope[]>;
    readonly workflow: Record<"workflow:owner" | "workflow:editor", Scope[]>;
};
