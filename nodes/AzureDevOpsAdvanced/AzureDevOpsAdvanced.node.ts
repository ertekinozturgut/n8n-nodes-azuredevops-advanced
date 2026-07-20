import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, NodeApiError } from 'n8n-workflow';
import { azureApiRequest } from './GenericFunctions';
import { gitOperations, gitFields } from './descriptions/GitDescription';
import { pipelineOperations, pipelineFields } from './descriptions/PipelineDescription';
import { workItemOperations, workItemFields } from './descriptions/WorkItemDescription';
import { pullRequestOperations, pullRequestFields } from './descriptions/PullRequestDescription';
import { tfvcOperations, tfvcFields } from './descriptions/TfvcDescription';
import { testPlanOperations, testPlanFields } from './descriptions/TestPlanDescription';
import { serviceHookOperations, serviceHookFields } from './descriptions/ServiceHookDescription';
import { wikiOperations, wikiFields } from './descriptions/WikiDescription';
import { artifactsOperations, artifactsFields } from './descriptions/ArtifactsDescription';
import { boardOperations, boardFields } from './descriptions/BoardDescription';

export class AzureDevOpsAdvanced implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Azure DevOps Advanced',
        name: 'azureDevOpsAdvanced',
        icon: 'file:azureDevOps.svg', // Icon expected here if deployed directly, maybe fallback to text/color if none provided.
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Comprehensive Azure DevOps integration node',
        defaults: { name: 'Azure DevOps Advanced' },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            { name: 'azureDevOpsAdvancedApi', required: true }
        ],
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    { name: 'Git Repositories', value: 'git' },
                    { name: 'TFVC Repositories', value: 'tfvc' },
                    { name: 'Pipelines (CI/CD)', value: 'pipeline' },
                    { name: 'Work Items (Boards)', value: 'workItem' },
                    { name: 'Pull Requests', value: 'pullRequest' },
                    { name: 'Test Plans (QA)', value: 'testPlan' },
                    { name: 'Service Hooks (Webhooks)', value: 'serviceHook' },
                    { name: 'Wiki', value: 'wiki' },
                    { name: 'Artifacts', value: 'artifacts' },
                    { name: 'Boards & Iterations', value: 'boards' },
                ],
                default: 'git',
            },
            ...gitOperations,
            ...gitFields,
            ...pipelineOperations,
            ...pipelineFields,
            ...workItemOperations,
            ...workItemFields,
            ...pullRequestOperations,
            ...pullRequestFields,
            ...testPlanOperations,
            ...testPlanFields,
            ...serviceHookOperations,
            ...serviceHookFields,
            ...wikiOperations,
            ...wikiFields,
            ...artifactsOperations,
            ...artifactsFields,
            ...boardOperations,
            ...boardFields,
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];
        const resource = this.getNodeParameter('resource', 0) as string;
        const operation = this.getNodeParameter('operation', 0) as string;

        for (let i = 0; i < items.length; i++) {
            try {
                const project = this.getNodeParameter('project', i) as string;
                let responseData;

                // ===== GIT RESOURCE =====
                if (resource === 'git') {
                    if (operation === 'listRepos') {
                        const endpoint = `${project}/_apis/git/repositories?api-version=7.1`;
                        responseData = await azureApiRequest.call(this, 'GET', endpoint);
                        responseData = responseData?.value || responseData;
                    }
                    else if (operation === 'getFile') {
                        const repoId = this.getNodeParameter('repositoryId', i) as string;
                        const filePath = this.getNodeParameter('filePath', i) as string;
                        const endpoint = `${project}/_apis/git/repositories/${repoId}/items?path=${filePath}&includeContent=true&api-version=7.1`;
                        responseData = await azureApiRequest.call(this, 'GET', endpoint);
                    }
                    else if (operation === 'createBranch') {
                        const repoId = this.getNodeParameter('repositoryId', i) as string;
                        const branchName = this.getNodeParameter('branchName', i) as string;

                        // Try main first, fall back to master
                        let oldObjectId = '0000000000000000000000000000000000000000';
                        for (const baseBranch of ['main', 'master']) {
                            const refResponse = await azureApiRequest.call(this, 'GET', `${project}/_apis/git/repositories/${repoId}/refs?filter=heads/${baseBranch}&api-version=7.1`);
                            if (refResponse?.value?.[0]?.objectId) {
                                oldObjectId = refResponse.value[0].objectId;
                                break;
                            }
                        }

                        const createEndpoint = `${project}/_apis/git/repositories/${repoId}/refs?api-version=7.1`;
                        const body = [{ name: branchName, newObjectId: oldObjectId, oldObjectId: '0000000000000000000000000000000000000000' }];
                        responseData = await azureApiRequest.call(this, 'POST', createEndpoint, body);
                        responseData = responseData?.value || responseData;
                    }
                    else if (operation === 'pushCommit') {
                        const repoId = this.getNodeParameter('repositoryId', i) as string;
                        const branchName = this.getNodeParameter('branchName', i) as string;
                        const commitMessage = this.getNodeParameter('commitMessage', i) as string;
                        const pushFilePath = this.getNodeParameter('pushFilePath', i) as string;
                        const fileContent = this.getNodeParameter('fileContent', i) as string;
                        const changeType = this.getNodeParameter('changeType', i) as string;

                        // Get current branch HEAD to use as oldObjectId
                        const branchFilter = branchName.replace('refs/heads/', '');
                        const refResponse = await azureApiRequest.call(this, 'GET', `${project}/_apis/git/repositories/${repoId}/refs?filter=heads/${branchFilter}&api-version=7.1`);
                        const oldObjectId = refResponse?.value?.[0]?.objectId || '0000000000000000000000000000000000000000';

                        const endpoint = `${project}/_apis/git/repositories/${repoId}/pushes?api-version=7.1`;
                        const body = {
                            refUpdates: [{ name: branchName, oldObjectId }],
                            commits: [{
                                comment: commitMessage,
                                changes: [{
                                    changeType,
                                    item: { path: pushFilePath.startsWith('/') ? pushFilePath : `/${pushFilePath}` },
                                    newContent: {
                                        content: Buffer.from(fileContent).toString('base64'),
                                        contentType: 'base64Encoded',
                                    },
                                }],
                            }],
                        };
                        responseData = await azureApiRequest.call(this, 'POST', endpoint, body);
                    }
                }

                // ===== PIPELINE RESOURCE =====
                else if (resource === 'pipeline') {
                    if (operation === 'list') {
                        const endpoint = `${project}/_apis/pipelines?api-version=7.1-preview.1`;
                        responseData = await azureApiRequest.call(this, 'GET', endpoint);
                        responseData = responseData?.value || responseData;
                    }
                    else if (operation === 'run') {
                        const pipelineId = this.getNodeParameter('pipelineId', i) as number;
                        const endpoint = `${project}/_apis/pipelines/${pipelineId}/runs?api-version=7.1-preview.1`;
                        responseData = await azureApiRequest.call(this, 'POST', endpoint, {});
                    }
                    else if (operation === 'getLogs') {
                        const pipelineId = this.getNodeParameter('pipelineId', i) as number;
                        const runId = this.getNodeParameter('runId', i) as number;
                        const endpoint = `${project}/_apis/pipelines/${pipelineId}/runs/${runId}/logs?api-version=7.1-preview.1`;
                        responseData = await azureApiRequest.call(this, 'GET', endpoint);
                        responseData = responseData?.logs || responseData?.value || responseData;
                    }
                    else if (operation === 'cancelRun') {
                        const pipelineId = this.getNodeParameter('pipelineId', i) as number;
                        const runId = this.getNodeParameter('runId', i) as number;
                        const endpoint = `${project}/_apis/pipelines/${pipelineId}/runs/${runId}?api-version=7.1-preview.1`;
                        const body = { state: "canceling" };
                        responseData = await azureApiRequest.call(this, 'PATCH', endpoint, body);
                    }
                }

                // ===== TFVC RESOURCE =====
                else if (resource === 'tfvc') {
                    if (operation === 'listRepos') {
                        const endpoint = `${project}/_apis/tfvc/branches?api-version=7.1`;
                        responseData = await azureApiRequest.call(this, 'GET', endpoint);
                        responseData = responseData?.value || responseData;
                    }
                    else if (operation === 'getFile') {
                        const filePath = this.getNodeParameter('filePath', i) as string;
                        const endpoint = `${project}/_apis/tfvc/items?path=${filePath}&api-version=7.1`;
                        responseData = await azureApiRequest.call(this, 'GET', endpoint);
                    }
                }

                // ===== WORK ITEM RESOURCE =====
                else if (resource === 'workItem') {
                    if (operation === 'get') {
                        const workItemId = this.getNodeParameter('workItemId', i) as number;
                        const endpoint = `${project}/_apis/wit/workitems/${workItemId}?api-version=7.1`;
                        responseData = await azureApiRequest.call(this, 'GET', endpoint);
                    }
                    else if (operation === 'listAll') {
                        const endpoint = `${project}/_apis/wit/wiql?api-version=7.1`;
                        const wiqlQuery = { query: `Select [System.Id], [System.Title], [System.State] From WorkItems Where [System.TeamProject] = '${project}'` };

                        const idsResponse = await azureApiRequest.call(this, 'POST', endpoint, wiqlQuery);
                        const idsArray = idsResponse?.workItems?.map((wi: any) => wi.id);

                        if (idsArray && idsArray.length > 0) {
                            const workItemIds = idsArray.join(',');
                            const bulkEndpoint = `${project}/_apis/wit/workitems?ids=${workItemIds}&api-version=7.1`;
                            responseData = await azureApiRequest.call(this, 'GET', bulkEndpoint);
                            responseData = responseData?.value || responseData;
                        } else {
                            responseData = [];
                        }
                    }
                    else if (operation === 'create' || operation === 'update') {
                        const isUpdate = operation === 'update';
                        const endpoint = isUpdate
                            ? `${project}/_apis/wit/workitems/${this.getNodeParameter('workItemId', i)}?api-version=7.1`
                            : `${project}/_apis/wit/workitems/$${this.getNodeParameter('workItemType', i)}?api-version=7.1`;

                        // Azure DevOps API expects JSON Patch format application/json-patch+json
                        const bodyData: any[] = [];

                        const mapPropertyToPatch = (path: string, value: any) => {
                            if (value !== undefined && value !== '') {
                                bodyData.push({ op: "add", path: `/fields/${path}`, value: value });
                            }
                        };

                        if (!isUpdate) {
                            mapPropertyToPatch('System.Title', this.getNodeParameter('title', i));
                        }

                        const additionalFields = this.getNodeParameter('additionalFields', i, {}) as any;
                        if (additionalFields && Object.keys(additionalFields).length) {
                            mapPropertyToPatch('System.Description', additionalFields.description);
                            mapPropertyToPatch('System.AssignedTo', additionalFields.assignedTo);
                            mapPropertyToPatch('System.State', additionalFields.state);
                            mapPropertyToPatch('Microsoft.VSTS.Common.Priority', additionalFields.priority);
                            mapPropertyToPatch('System.Tags', additionalFields.tags);

                            if (additionalFields.customFieldsUi?.customFieldsValues) {
                                for (const customField of additionalFields.customFieldsUi.customFieldsValues) {
                                    mapPropertyToPatch(customField.fieldId, customField.fieldValue);
                                }
                            }
                        }

                        const credentials = await this.getCredentials('azureDevOpsAdvancedApi');
                        const token = Buffer.from(`:${(credentials as any).pat}`).toString('base64');
                        const baseUrl = `https://dev.azure.com/${(credentials as any).organization}`;

                        responseData = await this.helpers.request({
                            method: isUpdate ? 'PATCH' : 'POST',
                            uri: `${baseUrl}/${endpoint}`,
                            body: bodyData,
                            headers: {
                                'Content-Type': 'application/json-patch+json',
                                Authorization: `Basic ${token}`,
                            },
                            json: true,
                        });
                    }
                    else if (operation === 'listUsers') {
                        // Users are fetched via the Azure Graph API (vssps endpoint)
                        const endpoint = `_apis/graph/users?api-version=7.1-preview.1`;
                        const credentials = await this.getCredentials('azureDevOpsAdvancedApi');
                        const baseUrl = `https://vssps.dev.azure.com/${(credentials as any).organization}`;
                        const token = Buffer.from(`:${(credentials as any).pat}`).toString('base64');

                        responseData = await this.helpers.request({
                            method: 'GET',
                            uri: `${baseUrl}/${endpoint}`,
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Basic ${token}`,
                            },
                            json: true,
                        });
                        responseData = responseData?.value || responseData;
                    }
                    else if (operation === 'listTags') {
                        // Retrieve all work item tags scoped to the project
                        const endpoint = `${project}/_apis/wit/tags?api-version=7.1-preview.1`;
                        responseData = await azureApiRequest.call(this, 'GET', endpoint);
                        responseData = responseData?.value || responseData;
                    }
                }

                // ===== PULL REQUEST RESOURCE =====
                else if (resource === 'pullRequest') {
                    const repositoryId = this.getNodeParameter('repositoryId', i) as string;

                    if (operation === 'get') {
                        const pullRequestId = this.getNodeParameter('pullRequestId', i) as number;
                        const endpoint = `${project}/_apis/git/repositories/${repositoryId}/pullrequests/${pullRequestId}?api-version=7.1`;
                        responseData = await azureApiRequest.call(this, 'GET', endpoint);
                    }
                    else if (operation === 'getComments') {
                        const pullRequestId = this.getNodeParameter('pullRequestId', i) as number;
                        const endpoint = `${project}/_apis/git/repositories/${repositoryId}/pullrequests/${pullRequestId}/threads?api-version=7.1`;
                        responseData = await azureApiRequest.call(this, 'GET', endpoint);
                        responseData = responseData?.value || responseData;
                    }
                    else if (operation === 'list') {
                        const listOptions = this.getNodeParameter('listOptions', i) as any;
                        let endpoint = `${project}/_apis/git/repositories/${repositoryId}/pullrequests?api-version=7.1`;

                        if (listOptions) {
                            if (listOptions.status) {
                                endpoint += `&searchCriteria.status=${listOptions.status}`;
                            }
                            if (listOptions.creatorId) endpoint += `&searchCriteria.creatorId=${listOptions.creatorId}`;
                            if (listOptions.reviewerId) endpoint += `&searchCriteria.reviewerId=${listOptions.reviewerId}`;
                            if (listOptions.sourceRefName) endpoint += `&searchCriteria.sourceRefName=${listOptions.sourceRefName}`;
                            if (listOptions.targetRefName) endpoint += `&searchCriteria.targetRefName=${listOptions.targetRefName}`;
                            if (listOptions.top) endpoint += `&$top=${listOptions.top}`;
                        }

                        responseData = await azureApiRequest.call(this, 'GET', endpoint);
                        responseData = responseData?.value || responseData;
                    }
                    else if (operation === 'create') {
                        const sourceRefName = this.getNodeParameter('sourceRefName', i) as string;
                        const targetRefName = this.getNodeParameter('targetRefName', i) as string;
                        const title = this.getNodeParameter('title', i) as string;
                        const additionalFields = this.getNodeParameter('additionalFields', i) as any;

                        const body: any = {
                            sourceRefName,
                            targetRefName,
                            title,
                        };

                        if (additionalFields) {
                            if (additionalFields.description) body.description = additionalFields.description;
                            if (additionalFields.isDraft) body.isDraft = additionalFields.isDraft;
                            if (additionalFields.reviewers) {
                                body.reviewers = additionalFields.reviewers.split(',').map((id: string) => ({ id: id.trim() }));
                            }
                            if (additionalFields.workItemIds) {
                                body.workItems = additionalFields.workItemIds.split(',').map((id: string) => ({ id: id.trim() }));
                            }
                        }

                        const endpoint = `${project}/_apis/git/repositories/${repositoryId}/pullrequests?api-version=7.1`;
                        responseData = await azureApiRequest.call(this, 'POST', endpoint, body);
                    }
                    else if (operation === 'update') {
                        const pullRequestId = this.getNodeParameter('pullRequestId', i) as number;
                        const updateFields = this.getNodeParameter('updateFields', i) as any;

                        const body: any = {};
                        if (updateFields) {
                            if (updateFields.title) body.title = updateFields.title;
                            if (updateFields.description) body.description = updateFields.description;
                            if (updateFields.status) body.status = updateFields.status;

                            // check if there are completion options
                            const hasCompletionOption = updateFields.mergeStrategy || updateFields.deleteSourceBranch !== undefined || updateFields.transitionWorkItems !== undefined || updateFields.bypassPolicy !== undefined || updateFields.bypassReason || updateFields.mergeCommitMessage;
                            if (hasCompletionOption) {
                                body.completionOptions = {};
                                if (updateFields.bypassPolicy !== undefined) body.completionOptions.bypassPolicy = updateFields.bypassPolicy;
                                if (updateFields.bypassReason) body.completionOptions.bypassReason = updateFields.bypassReason;
                                if (updateFields.deleteSourceBranch !== undefined) body.completionOptions.deleteSourceBranch = updateFields.deleteSourceBranch;
                                if (updateFields.mergeCommitMessage) body.completionOptions.mergeCommitMessage = updateFields.mergeCommitMessage;
                                if (updateFields.mergeStrategy && updateFields.mergeStrategy !== 'squash') body.completionOptions.squashMerge = false;
                                else if (updateFields.mergeStrategy === 'squash') body.completionOptions.squashMerge = true;
                                if (updateFields.transitionWorkItems !== undefined) body.completionOptions.transitionWorkItems = updateFields.transitionWorkItems;
                                if (updateFields.mergeStrategy) body.completionOptions.mergeStrategy = updateFields.mergeStrategy;
                            }
                        }

                        const endpoint = `${project}/_apis/git/repositories/${repositoryId}/pullrequests/${pullRequestId}?api-version=7.1`;
                        responseData = await azureApiRequest.call(this, 'PATCH', endpoint, body);
                    }
                }

                // ===== TEST PLANS RESOURCE =====
                else if (resource === 'testPlan') {
                    if (operation === 'listPlans') {
                        const endpoint = `${project}/_apis/testplan/plans?api-version=7.1-preview.1`;
                        responseData = await azureApiRequest.call(this, 'GET', endpoint);
                        responseData = responseData?.value || responseData;
                    }
                    else if (operation === 'listSuites') {
                        const planId = this.getNodeParameter('planId', i) as number;
                        const endpoint = `${project}/_apis/testplan/Plans/${planId}/suites?api-version=7.1-preview.1`;
                        responseData = await azureApiRequest.call(this, 'GET', endpoint);
                        responseData = responseData?.value || responseData;
                    }
                    else if (operation === 'listCases') {
                        const planId = this.getNodeParameter('planId', i) as number;
                        const suiteId = this.getNodeParameter('suiteId', i) as number;
                        const endpoint = `${project}/_apis/testplan/Plans/${planId}/Suites/${suiteId}/TestCase?api-version=7.1-preview.2`;
                        responseData = await azureApiRequest.call(this, 'GET', endpoint);
                        responseData = responseData?.value || responseData;
                    }
                    else if (operation === 'listRuns') {
                        const endpoint = `${project}/_apis/test/runs?api-version=7.1`;
                        responseData = await azureApiRequest.call(this, 'GET', endpoint);
                        responseData = responseData?.value || responseData;
                    }
                }

                // ===== BOARDS RESOURCE =====
                else if (resource === 'boards') {
                    const team = this.getNodeParameter('team', i) as string;
                    if (operation === 'listBoards') {
                        const endpoint = `${project}/${team}/_apis/work/boards?api-version=7.1`;
                        responseData = await azureApiRequest.call(this, 'GET', endpoint);
                        responseData = responseData?.value || responseData;
                    }
                    else if (operation === 'listColumns') {
                        const boardId = this.getNodeParameter('boardId', i) as string;
                        const endpoint = `${project}/${team}/_apis/work/boards/${boardId}/columns?api-version=7.1`;
                        responseData = await azureApiRequest.call(this, 'GET', endpoint);
                        responseData = responseData?.value || responseData;
                    }
                    else if (operation === 'listIterations') {
                        const endpoint = `${project}/${team}/_apis/work/teamsettings/iterations?api-version=7.1`;
                        responseData = await azureApiRequest.call(this, 'GET', endpoint);
                        responseData = responseData?.value || responseData;
                    }
                }

                // ===== WIKI RESOURCE =====
                else if (resource === 'wiki') {
                    if (operation === 'list') {
                        const endpoint = `${project}/_apis/wiki/wikis?api-version=7.1`;
                        responseData = await azureApiRequest.call(this, 'GET', endpoint);
                        responseData = responseData?.value || responseData;
                    }
                    else if (operation === 'getPage' || operation === 'createPage' || operation === 'updatePage') {
                        const wikiIdentifier = this.getNodeParameter('wikiIdentifier', i) as string;
                        let pagePath = this.getNodeParameter('pagePath', i) as string;

                        // Prevent root path failure
                        if ((operation === 'createPage' || operation === 'updatePage') && (pagePath === '/' || !pagePath)) {
                            throw new NodeApiError(this.getNode(), { message: "The provided path value is either null, empty or wiki root. Please provide a valid page path like /MyNewPage" } as any);
                        }

                        // Ensure slash prefix
                        if (!pagePath.startsWith('/')) pagePath = '/' + pagePath;

                        const endpoint = `${project}/_apis/wiki/wikis/${wikiIdentifier}/pages?path=${pagePath}&api-version=7.1`;

                        if (operation === 'getPage') {
                            responseData = await azureApiRequest.call(this, 'GET', endpoint);
                        } else if (operation === 'createPage') {
                            const content = this.getNodeParameter('content', i) as string;
                            const body = { content };
                            responseData = await azureApiRequest.call(this, 'PUT', endpoint, body);
                        } else if (operation === 'updatePage') {
                            const content = this.getNodeParameter('content', i) as string;

                            const credentials = await this.getCredentials('azureDevOpsAdvancedApi');
                            const baseUrl = `https://dev.azure.com/${(credentials as any).organization}`;
                            const token = Buffer.from(`:${(credentials as any).pat}`).toString('base64');

                            // Get ETag first to satisfy Azure DevOps Update requirements
                            const getResponse = await this.helpers.request({
                                method: 'GET',
                                uri: `${baseUrl}/${endpoint}`,
                                headers: { Authorization: `Basic ${token}` },
                                json: true,
                                resolveWithFullResponse: true,
                            });

                            const eTag = getResponse.headers.etag;

                            // Update with ETag
                            responseData = await this.helpers.request({
                                method: 'PUT',
                                uri: `${baseUrl}/${endpoint}`,
                                body: { content },
                                headers: {
                                    'Content-Type': 'application/json',
                                    'If-Match': eTag,
                                    Authorization: `Basic ${token}`
                                },
                                json: true,
                            });
                        }
                    }
                }

                // ===== ARTIFACTS RESOURCE =====
                else if (resource === 'artifacts') {
                    if (operation === 'listFeeds') {
                        const endpoint = `${project}/_apis/packaging/feeds?api-version=7.1-preview.1`;
                        responseData = await azureApiRequest.call(this, 'GET', endpoint);
                        responseData = responseData?.value || responseData;
                    }
                    else if (operation === 'listPackages') {
                        const feedId = this.getNodeParameter('feedId', i) as string;
                        const endpoint = `${project}/_apis/packaging/Feeds/${feedId}/packages?api-version=7.1-preview.1`;
                        responseData = await azureApiRequest.call(this, 'GET', endpoint);
                        responseData = responseData?.value || responseData;
                    }
                }

                // ===== SERVICE HOOKS RESOURCE =====
                else if (resource === 'serviceHook') {
                    if (operation === 'list') {
                        const endpoint = `_apis/hooks/subscriptions?api-version=7.1-preview.1`; // Collection level API
                        const credentials = await this.getCredentials('azureDevOpsAdvancedApi');
                        const baseUrl = `https://dev.azure.com/${(credentials as any).organization}`;
                        const token = Buffer.from(`:${(credentials as any).pat}`).toString('base64');
                        responseData = await this.helpers.request({
                            method: 'GET',
                            uri: `${baseUrl}/${endpoint}`,
                            headers: { 'Content-Type': 'application/json', Authorization: `Basic ${token}` },
                            json: true,
                        });
                        responseData = responseData?.value || responseData;
                    }
                    else if (operation === 'create') {
                        const eventType = this.getNodeParameter('eventType', i) as string;
                        const consumerUrl = this.getNodeParameter('consumerUrl', i) as string;
                        const endpoint = `_apis/hooks/subscriptions?api-version=7.1-preview.1`;
                        const body = {
                            publisherId: "tfs",
                            eventType: eventType,
                            resourceVersion: "1.0",
                            consumerId: "webHooks",
                            consumerActionId: "httpRequest",
                            publisherInputs: {
                                projectId: project  // Using project name/id to scope the webhook
                            },
                            consumerInputs: {
                                url: consumerUrl
                            }
                        };
                        const credentials = await this.getCredentials('azureDevOpsAdvancedApi');
                        const baseUrl = `https://dev.azure.com/${(credentials as any).organization}`;
                        const token = Buffer.from(`:${(credentials as any).pat}`).toString('base64');
                        responseData = await this.helpers.request({
                            method: 'POST',
                            uri: `${baseUrl}/${endpoint}`,
                            body: body,
                            headers: { 'Content-Type': 'application/json', Authorization: `Basic ${token}` },
                            json: true,
                        });
                    }
                }

                // Process and return results
                if (Array.isArray(responseData)) {
                    returnData.push.apply(returnData, responseData.map(item => ({ json: item })));
                } else {
                    if (responseData) {
                        returnData.push({ json: responseData });
                    }
                }
            } catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ json: { error: error.message } });
                    continue;
                }
                throw new NodeApiError(this.getNode(), error);
            }
        }

        return [returnData];
    }
}
