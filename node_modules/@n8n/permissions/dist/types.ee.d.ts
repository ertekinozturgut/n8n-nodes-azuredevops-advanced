import type { z } from 'zod';
import type { RESOURCES, API_KEY_RESOURCES } from './constants.ee';
import type { assignableGlobalRoleSchema, credentialSharingRoleSchema, globalRoleSchema, Role, systemProjectRoleSchema, roleNamespaceSchema, teamRoleSchema, workflowSharingRoleSchema, assignableProjectRoleSchema } from './schemas.ee';
export type ScopeInformation = {
    displayName: string;
    description?: string | null;
};
export type Resource = keyof typeof RESOURCES;
type ResourceScope<R extends Resource, Operation extends (typeof RESOURCES)[R][number] = (typeof RESOURCES)[R][number]> = `${R}:${Operation}`;
type WildcardScope = `${Resource}:*` | '*';
type AllScopesObject = {
    [R in Resource]: ResourceScope<R>;
};
export type Scope = AllScopesObject[Resource] | WildcardScope;
export type ScopeLevels = {
    global: Scope[];
    project?: Scope[];
    resource?: Scope[];
};
export type MaskLevels = {
    sharing: Scope[];
};
export type ScopeOptions = {
    mode: 'oneOf' | 'allOf';
};
export type RoleNamespace = z.infer<typeof roleNamespaceSchema>;
export type GlobalRole = z.infer<typeof globalRoleSchema>;
export type AssignableGlobalRole = z.infer<typeof assignableGlobalRoleSchema>;
export type CredentialSharingRole = z.infer<typeof credentialSharingRoleSchema>;
export type WorkflowSharingRole = z.infer<typeof workflowSharingRoleSchema>;
export type TeamProjectRole = z.infer<typeof teamRoleSchema>;
export type ProjectRole = z.infer<typeof systemProjectRoleSchema>;
export type AssignableProjectRole = z.infer<typeof assignableProjectRoleSchema>;
export declare function isAssignableProjectRoleSlug(slug: string): slug is AssignableProjectRole;
export type AllRoleTypes = GlobalRole | ProjectRole | WorkflowSharingRole | CredentialSharingRole;
export type AllRolesMap = {
    global: Role[];
    project: Role[];
    credential: Role[];
    workflow: Role[];
};
export type DbScope = {
    slug: Scope;
};
export type DbRole = {
    slug: string;
    scopes: DbScope[];
};
export type AuthPrincipal = {
    role: DbRole;
};
type PublicApiKeyResources = keyof typeof API_KEY_RESOURCES;
type ApiKeyResourceScope<R extends PublicApiKeyResources, Operation extends (typeof API_KEY_RESOURCES)[R][number] = (typeof API_KEY_RESOURCES)[R][number]> = `${R}:${Operation}`;
type AllApiKeyScopesObject = {
    [R in PublicApiKeyResources]: ApiKeyResourceScope<R>;
};
export type ApiKeyScope = AllApiKeyScopesObject[PublicApiKeyResources];
export declare function isApiKeyScope(scope: Scope): scope is ApiKeyScope;
export {};
