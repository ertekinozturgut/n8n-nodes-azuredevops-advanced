"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseState = void 0;
const constants_1 = require("@n8n/constants");
const di_1 = require("@n8n/di");
const n8n_workflow_1 = require("n8n-workflow");
class ProviderNotSetError extends n8n_workflow_1.UnexpectedError {
    constructor() {
        super('Cannot query license state because license provider has not been set');
    }
}
let LicenseState = class LicenseState {
    constructor() {
        this.licenseProvider = null;
    }
    setLicenseProvider(provider) {
        this.licenseProvider = provider;
    }
    assertProvider() {
        if (!this.licenseProvider)
            throw new ProviderNotSetError();
    }
    isLicensed(feature) {
        this.assertProvider();
        if (typeof feature === 'string')
            return this.licenseProvider.isLicensed(feature);
        for (const featureName of feature) {
            if (this.licenseProvider.isLicensed(featureName)) {
                return true;
            }
        }
        return false;
    }
    getValue(feature) {
        this.assertProvider();
        return this.licenseProvider.getValue(feature);
    }
    isCustomRolesLicensed() {
        return this.isLicensed(constants_1.LICENSE_FEATURES.CUSTOM_ROLES);
    }
    isSharingLicensed() {
        return this.isLicensed('feat:sharing');
    }
    isLogStreamingLicensed() {
        return this.isLicensed('feat:logStreaming');
    }
    isLdapLicensed() {
        return this.isLicensed('feat:ldap');
    }
    isSamlLicensed() {
        return this.isLicensed('feat:saml');
    }
    isOidcLicensed() {
        return this.isLicensed('feat:oidc');
    }
    isMFAEnforcementLicensed() {
        return this.isLicensed('feat:mfaEnforcement');
    }
    isApiKeyScopesLicensed() {
        return this.isLicensed('feat:apiKeyScopes');
    }
    isAiAssistantLicensed() {
        return this.isLicensed('feat:aiAssistant');
    }
    isAskAiLicensed() {
        return this.isLicensed('feat:askAi');
    }
    isAiCreditsLicensed() {
        return this.isLicensed('feat:aiCredits');
    }
    isAdvancedExecutionFiltersLicensed() {
        return this.isLicensed('feat:advancedExecutionFilters');
    }
    isAdvancedPermissionsLicensed() {
        return this.isLicensed('feat:advancedPermissions');
    }
    isDebugInEditorLicensed() {
        return this.isLicensed('feat:debugInEditor');
    }
    isBinaryDataS3Licensed() {
        return this.isLicensed('feat:binaryDataS3');
    }
    isMultiMainLicensed() {
        return this.isLicensed('feat:multipleMainInstances');
    }
    isVariablesLicensed() {
        return this.isLicensed('feat:variables');
    }
    isSourceControlLicensed() {
        return this.isLicensed('feat:sourceControl');
    }
    isExternalSecretsLicensed() {
        return this.isLicensed('feat:externalSecrets');
    }
    isAPIDisabled() {
        return this.isLicensed('feat:apiDisabled');
    }
    isWorkerViewLicensed() {
        return this.isLicensed('feat:workerView');
    }
    isProjectRoleAdminLicensed() {
        return this.isLicensed('feat:projectRole:admin');
    }
    isProjectRoleEditorLicensed() {
        return this.isLicensed('feat:projectRole:editor');
    }
    isProjectRoleViewerLicensed() {
        return this.isLicensed('feat:projectRole:viewer');
    }
    isCustomNpmRegistryLicensed() {
        return this.isLicensed('feat:communityNodes:customRegistry');
    }
    isFoldersLicensed() {
        return this.isLicensed('feat:folders');
    }
    isInsightsSummaryLicensed() {
        return this.isLicensed('feat:insights:viewSummary');
    }
    isInsightsDashboardLicensed() {
        return this.isLicensed('feat:insights:viewDashboard');
    }
    isInsightsHourlyDataLicensed() {
        return this.isLicensed('feat:insights:viewHourlyData');
    }
    isWorkflowDiffsLicensed() {
        return this.isLicensed('feat:workflowDiffs');
    }
    isProvisioningLicensed() {
        return this.isLicensed(['feat:saml', 'feat:oidc']);
    }
    getMaxUsers() {
        return this.getValue('quota:users') ?? constants_1.UNLIMITED_LICENSE_QUOTA;
    }
    getMaxActiveWorkflows() {
        return this.getValue('quota:activeWorkflows') ?? constants_1.UNLIMITED_LICENSE_QUOTA;
    }
    getMaxVariables() {
        return this.getValue('quota:maxVariables') ?? constants_1.UNLIMITED_LICENSE_QUOTA;
    }
    getMaxAiCredits() {
        return this.getValue('quota:aiCredits') ?? 0;
    }
    getWorkflowHistoryPruneQuota() {
        return this.getValue('quota:workflowHistoryPrune') ?? constants_1.UNLIMITED_LICENSE_QUOTA;
    }
    getInsightsMaxHistory() {
        return this.getValue('quota:insights:maxHistoryDays') ?? 7;
    }
    getInsightsRetentionMaxAge() {
        return this.getValue('quota:insights:retention:maxAgeDays') ?? 180;
    }
    getInsightsRetentionPruneInterval() {
        return this.getValue('quota:insights:retention:pruneIntervalDays') ?? 24;
    }
    getMaxTeamProjects() {
        return this.getValue('quota:maxTeamProjects') ?? 0;
    }
    getMaxWorkflowsWithEvaluations() {
        return this.getValue('quota:evaluations:maxWorkflows') ?? 0;
    }
};
exports.LicenseState = LicenseState;
exports.LicenseState = LicenseState = __decorate([
    (0, di_1.Service)()
], LicenseState);
//# sourceMappingURL=license-state.js.map