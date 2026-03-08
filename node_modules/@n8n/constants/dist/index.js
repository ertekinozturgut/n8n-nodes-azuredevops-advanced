"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_PASSWORD_CHAR_LENGTH = exports.MIN_PASSWORD_CHAR_LENGTH = exports.Time = exports.LDAP_DEFAULT_CONFIGURATION = exports.LDAP_FEATURE_NAME = exports.DEFAULT_WORKFLOW_HISTORY_PRUNE_LIMIT = exports.UNLIMITED_LICENSE_QUOTA = exports.LICENSE_QUOTAS = exports.LICENSE_FEATURES = void 0;
__exportStar(require("./api"), exports);
__exportStar(require("./browser"), exports);
__exportStar(require("./community-nodes"), exports);
__exportStar(require("./instance"), exports);
__exportStar(require("./execution"), exports);
__exportStar(require("./logstreaming"), exports);
exports.LICENSE_FEATURES = {
    SHARING: 'feat:sharing',
    LDAP: 'feat:ldap',
    SAML: 'feat:saml',
    OIDC: 'feat:oidc',
    MFA_ENFORCEMENT: 'feat:mfaEnforcement',
    LOG_STREAMING: 'feat:logStreaming',
    ADVANCED_EXECUTION_FILTERS: 'feat:advancedExecutionFilters',
    VARIABLES: 'feat:variables',
    SOURCE_CONTROL: 'feat:sourceControl',
    API_DISABLED: 'feat:apiDisabled',
    EXTERNAL_SECRETS: 'feat:externalSecrets',
    SHOW_NON_PROD_BANNER: 'feat:showNonProdBanner',
    DEBUG_IN_EDITOR: 'feat:debugInEditor',
    BINARY_DATA_S3: 'feat:binaryDataS3',
    MULTIPLE_MAIN_INSTANCES: 'feat:multipleMainInstances',
    WORKER_VIEW: 'feat:workerView',
    ADVANCED_PERMISSIONS: 'feat:advancedPermissions',
    PROJECT_ROLE_ADMIN: 'feat:projectRole:admin',
    PROJECT_ROLE_EDITOR: 'feat:projectRole:editor',
    PROJECT_ROLE_VIEWER: 'feat:projectRole:viewer',
    AI_ASSISTANT: 'feat:aiAssistant',
    ASK_AI: 'feat:askAi',
    COMMUNITY_NODES_CUSTOM_REGISTRY: 'feat:communityNodes:customRegistry',
    AI_CREDITS: 'feat:aiCredits',
    FOLDERS: 'feat:folders',
    INSIGHTS_VIEW_SUMMARY: 'feat:insights:viewSummary',
    INSIGHTS_VIEW_DASHBOARD: 'feat:insights:viewDashboard',
    INSIGHTS_VIEW_HOURLY_DATA: 'feat:insights:viewHourlyData',
    API_KEY_SCOPES: 'feat:apiKeyScopes',
    WORKFLOW_DIFFS: 'feat:workflowDiffs',
    CUSTOM_ROLES: 'feat:customRoles',
    AI_BUILDER: 'feat:aiBuilder',
};
exports.LICENSE_QUOTAS = {
    TRIGGER_LIMIT: 'quota:activeWorkflows',
    VARIABLES_LIMIT: 'quota:maxVariables',
    USERS_LIMIT: 'quota:users',
    WORKFLOW_HISTORY_PRUNE_LIMIT: 'quota:workflowHistoryPrune',
    TEAM_PROJECT_LIMIT: 'quota:maxTeamProjects',
    AI_CREDITS: 'quota:aiCredits',
    INSIGHTS_MAX_HISTORY_DAYS: 'quota:insights:maxHistoryDays',
    INSIGHTS_RETENTION_MAX_AGE_DAYS: 'quota:insights:retention:maxAgeDays',
    INSIGHTS_RETENTION_PRUNE_INTERVAL_DAYS: 'quota:insights:retention:pruneIntervalDays',
    WORKFLOWS_WITH_EVALUATION_LIMIT: 'quota:evaluations:maxWorkflows',
};
exports.UNLIMITED_LICENSE_QUOTA = -1;
exports.DEFAULT_WORKFLOW_HISTORY_PRUNE_LIMIT = 24;
exports.LDAP_FEATURE_NAME = 'features.ldap';
exports.LDAP_DEFAULT_CONFIGURATION = {
    loginEnabled: false,
    loginLabel: '',
    connectionUrl: '',
    allowUnauthorizedCerts: false,
    connectionSecurity: 'none',
    connectionPort: 389,
    baseDn: '',
    bindingAdminDn: '',
    bindingAdminPassword: '',
    firstNameAttribute: '',
    lastNameAttribute: '',
    emailAttribute: '',
    loginIdAttribute: '',
    ldapIdAttribute: '',
    userFilter: '',
    synchronizationEnabled: false,
    synchronizationInterval: 60,
    searchPageSize: 0,
    searchTimeout: 60,
    enforceEmailUniqueness: true,
};
var time_1 = require("./time");
Object.defineProperty(exports, "Time", { enumerable: true, get: function () { return time_1.Time; } });
exports.MIN_PASSWORD_CHAR_LENGTH = 8;
exports.MAX_PASSWORD_CHAR_LENGTH = 64;
//# sourceMappingURL=index.js.map