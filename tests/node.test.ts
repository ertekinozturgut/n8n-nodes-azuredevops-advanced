import { AzureDevOpsAdvanced } from '../nodes/AzureDevOpsAdvanced/AzureDevOpsAdvanced.node';

// ─── Mock factory ──────────────────────────────────────────────────────────────

function buildMockContext(params: Record<string, any>, apiResponses: any[] = []) {
	let callIndex = 0;
	const mockRequest = jest.fn().mockImplementation(() => {
		const resp = apiResponses[callIndex] ?? {};
		callIndex++;
		return Promise.resolve(resp);
	});

	return {
		getInputData: () => [{ json: {} }],
		getNodeParameter: (name: string) => params[name],
		getCredentials: async () => ({ organization: 'myorg', pat: 'mytoken' }),
		continueOnFail: () => false,
		getNode: () => ({ name: 'AzureDevOpsAdvanced' }),
		helpers: { request: mockRequest },
		_mockRequest: mockRequest,
	} as any;
}

// ─── Helper: run node with given context ───────────────────────────────────────

async function runNode(ctx: any) {
	const node = new AzureDevOpsAdvanced();
	return node.execute.call(ctx);
}

// ══════════════════════════════════════════════════════════════════════════════
// GIT
// ══════════════════════════════════════════════════════════════════════════════

describe('Git Resource', () => {
	test('listRepos — returns value array', async () => {
		const repos = [{ id: '1', name: 'repo-a' }, { id: '2', name: 'repo-b' }];
		const ctx = buildMockContext(
			{ resource: 'git', operation: 'listRepos', project: 'MyProject' },
			[{ value: repos }],
		);
		const [[result]] = await runNode(ctx);
		expect(result.json.id).toBe('1');
	});

	test('listRepos — falls back when no value wrapper', async () => {
		const ctx = buildMockContext(
			{ resource: 'git', operation: 'listRepos', project: 'MyProject' },
			[{ id: 'x', name: 'solo-repo' }],
		);
		const [[result]] = await runNode(ctx);
		expect(result.json.id).toBe('x');
	});

	test('getFile — calls correct endpoint', async () => {
		const ctx = buildMockContext(
			{ resource: 'git', operation: 'getFile', project: 'MyProject', repositoryId: 'repo-1', filePath: '/src/app.ts' },
			[{ content: 'file content' }],
		);
		const [[result]] = await runNode(ctx);
		expect(result.json.content).toBe('file content');
		const uri: string = ctx._mockRequest.mock.calls[0][0].uri;
		expect(uri).toContain('scopePath=/src/app.ts');
	});

	test('createBranch — picks objectId from main', async () => {
		const ctx = buildMockContext(
			{ resource: 'git', operation: 'createBranch', project: 'MyProject', repositoryId: 'repo-1', branchName: 'refs/heads/feature-x' },
			[
				{ value: [{ objectId: 'abc123' }] }, // main ref response
				{ value: [{ name: 'refs/heads/feature-x' }] }, // create response
			],
		);
		await runNode(ctx);
		const createCall = ctx._mockRequest.mock.calls[1][0];
		expect(createCall.body[0].newObjectId).toBe('abc123');
		expect(createCall.body[0].oldObjectId).toBe('0000000000000000000000000000000000000000');
	});

	test('createBranch — falls back to master when main not found', async () => {
		const ctx = buildMockContext(
			{ resource: 'git', operation: 'createBranch', project: 'MyProject', repositoryId: 'repo-1', branchName: 'refs/heads/feature-y' },
			[
				{ value: [] },              // main not found
				{ value: [{ objectId: 'def456' }] }, // master ref response
				{ value: [] },              // create response
			],
		);
		await runNode(ctx);
		const createCall = ctx._mockRequest.mock.calls[2][0];
		expect(createCall.body[0].newObjectId).toBe('def456');
	});

	test('createBranch — uses zero id when neither main nor master found', async () => {
		const ctx = buildMockContext(
			{ resource: 'git', operation: 'createBranch', project: 'MyProject', repositoryId: 'repo-1', branchName: 'refs/heads/orphan' },
			[{ value: [] }, { value: [] }, {}],
		);
		await runNode(ctx);
		const createCall = ctx._mockRequest.mock.calls[2][0];
		expect(createCall.body[0].newObjectId).toBe('0000000000000000000000000000000000000000');
	});

	test('pushCommit — builds correct push body with base64 content', async () => {
		const ctx = buildMockContext(
			{
				resource: 'git', operation: 'pushCommit', project: 'MyProject',
				repositoryId: 'repo-1', branchName: 'refs/heads/main',
				commitMessage: 'test commit', pushFilePath: '/src/hello.ts',
				fileContent: 'console.log("hello")', changeType: 'edit',
			},
			[
				{ value: [{ objectId: 'head123' }] }, // branch ref
				{ refUpdates: [] },                    // push response
			],
		);
		await runNode(ctx);
		const pushCall = ctx._mockRequest.mock.calls[1][0];
		const body = pushCall.body;
		expect(body.refUpdates[0].oldObjectId).toBe('head123');
		expect(body.commits[0].comment).toBe('test commit');
		const change = body.commits[0].changes[0];
		expect(change.changeType).toBe('edit');
		expect(change.item.path).toBe('/src/hello.ts');
		expect(change.newContent.contentType).toBe('base64Encoded');
		expect(Buffer.from(change.newContent.content, 'base64').toString()).toBe('console.log("hello")');
	});

	test('pushCommit — prepends slash to file path if missing', async () => {
		const ctx = buildMockContext(
			{
				resource: 'git', operation: 'pushCommit', project: 'MyProject',
				repositoryId: 'repo-1', branchName: 'refs/heads/main',
				commitMessage: 'msg', pushFilePath: 'src/no-slash.ts',
				fileContent: 'x', changeType: 'add',
			},
			[{ value: [] }, {}],
		);
		await runNode(ctx);
		const pushCall = ctx._mockRequest.mock.calls[1][0];
		expect(pushCall.body.commits[0].changes[0].item.path).toBe('/src/no-slash.ts');
	});
});

// ══════════════════════════════════════════════════════════════════════════════
// PIPELINE
// ══════════════════════════════════════════════════════════════════════════════

describe('Pipeline Resource', () => {
	test('list — returns pipeline array', async () => {
		const ctx = buildMockContext(
			{ resource: 'pipeline', operation: 'list', project: 'MyProject' },
			[{ value: [{ id: 1, name: 'Build' }] }],
		);
		const [[result]] = await runNode(ctx);
		expect(result.json.id).toBe(1);
	});

	test('run — POSTs to correct endpoint', async () => {
		const ctx = buildMockContext(
			{ resource: 'pipeline', operation: 'run', project: 'MyProject', pipelineId: 42 },
			[{ id: 100, state: 'inProgress' }],
		);
		const [[result]] = await runNode(ctx);
		expect(result.json.state).toBe('inProgress');
		const uri: string = ctx._mockRequest.mock.calls[0][0].uri;
		expect(uri).toContain('/pipelines/42/runs');
	});

	test('getLogs — extracts logs property', async () => {
		const ctx = buildMockContext(
			{ resource: 'pipeline', operation: 'getLogs', project: 'MyProject', pipelineId: 42, runId: 99 },
			[{ logs: [{ id: 1, url: 'http://log' }] }],
		);
		const [[result]] = await runNode(ctx);
		expect(result.json.id).toBe(1);
	});

	test('cancelRun — sends canceling state and includes pipelineId in URL', async () => {
		const ctx = buildMockContext(
			{ resource: 'pipeline', operation: 'cancelRun', project: 'MyProject', pipelineId: 42, runId: 99 },
			[{ state: 'canceling' }],
		);
		const [[result]] = await runNode(ctx);
		expect(result.json.state).toBe('canceling');
		const call = ctx._mockRequest.mock.calls[0][0];
		expect(call.body.state).toBe('canceling');
		expect(call.uri).toContain('/pipelines/42/runs/99');
	});
});

// ══════════════════════════════════════════════════════════════════════════════
// WORK ITEMS
// ══════════════════════════════════════════════════════════════════════════════

describe('Work Items Resource', () => {
	test('get — fetches single work item', async () => {
		const ctx = buildMockContext(
			{ resource: 'workItem', operation: 'get', project: 'MyProject', workItemId: 5 },
			[{ id: 5, fields: { 'System.Title': 'Fix bug' } }],
		);
		const [[result]] = await runNode(ctx);
		expect(result.json.id).toBe(5);
	});

	test('listAll — returns empty array when no items exist', async () => {
		const ctx = buildMockContext(
			{ resource: 'workItem', operation: 'listAll', project: 'MyProject' },
			[{ workItems: [] }],
		);
		const [results] = await runNode(ctx);
		expect(results).toHaveLength(0);
	});

	test('listAll — queries IDs then bulk fetches', async () => {
		const ctx = buildMockContext(
			{ resource: 'workItem', operation: 'listAll', project: 'MyProject' },
			[
				{ workItems: [{ id: 1 }, { id: 2 }] },
				{ value: [{ id: 1 }, { id: 2 }] },
			],
		);
		const [results] = await runNode(ctx);
		expect(results).toHaveLength(2);
		const bulkUri: string = ctx._mockRequest.mock.calls[1][0].uri;
		expect(bulkUri).toContain('ids=1,2');
	});

	test('create — builds JSON Patch body with title', async () => {
		const ctx = buildMockContext(
			{
				resource: 'workItem', operation: 'create', project: 'MyProject',
				workItemType: 'Task', title: 'New Task', additionalFields: {},
			},
			[{ id: 10 }],
		);
		const [[result]] = await runNode(ctx);
		expect(result.json.id).toBe(10);
		const call = ctx._mockRequest.mock.calls[0][0];
		expect(call.headers['Content-Type']).toBe('application/json-patch+json');
		expect(call.body[0]).toMatchObject({ op: 'add', path: '/fields/System.Title', value: 'New Task' });
		expect(call.uri).toContain('/$Task');
	});

	test('create — additionalFields null does not crash', async () => {
		const ctx = buildMockContext(
			{
				resource: 'workItem', operation: 'create', project: 'MyProject',
				workItemType: 'Bug', title: 'Crash bug', additionalFields: null,
			},
			[{ id: 11 }],
		);
		await expect(runNode(ctx)).resolves.toBeDefined();
	});

	test('update — sends PATCH with workItemId in URL', async () => {
		const ctx = buildMockContext(
			{
				resource: 'workItem', operation: 'update', project: 'MyProject',
				workItemId: 7, additionalFields: { description: 'Updated desc' },
			},
			[{ id: 7 }],
		);
		const [[result]] = await runNode(ctx);
		expect(result.json.id).toBe(7);
		const call = ctx._mockRequest.mock.calls[0][0];
		expect(call.uri).toContain('/workitems/7');
		const descPatch = call.body.find((p: any) => p.path === '/fields/System.Description');
		expect(descPatch.value).toBe('Updated desc');
	});

	test('listTags — returns tags array', async () => {
		const ctx = buildMockContext(
			{ resource: 'workItem', operation: 'listTags', project: 'MyProject' },
			[{ value: [{ name: 'bug' }, { name: 'urgent' }] }],
		);
		const [results] = await runNode(ctx);
		expect(results).toHaveLength(2);
	});

	test('listUsers — calls vssps endpoint', async () => {
		const ctx = buildMockContext(
			{ resource: 'workItem', operation: 'listUsers', project: 'MyProject' },
			[{ value: [{ principalName: 'user@company.com' }] }],
		);
		const [[result]] = await runNode(ctx);
		expect(result.json.principalName).toBe('user@company.com');
		const uri: string = ctx._mockRequest.mock.calls[0][0].uri;
		expect(uri).toContain('vssps.dev.azure.com');
	});
});

// ══════════════════════════════════════════════════════════════════════════════
// PULL REQUESTS
// ══════════════════════════════════════════════════════════════════════════════

describe('Pull Requests Resource', () => {
	const baseParams = { resource: 'pullRequest', project: 'MyProject', repositoryId: 'repo-1' };

	test('get — fetches single PR', async () => {
		const ctx = buildMockContext(
			{ ...baseParams, operation: 'get', pullRequestId: 10 },
			[{ pullRequestId: 10, title: 'My PR' }],
		);
		const [[result]] = await runNode(ctx);
		expect(result.json.pullRequestId).toBe(10);
	});

	test('getComments — uses lowercase pullrequests in endpoint', async () => {
		const ctx = buildMockContext(
			{ ...baseParams, operation: 'getComments', pullRequestId: 10 },
			[{ value: [{ id: 1 }] }],
		);
		await runNode(ctx);
		const uri: string = ctx._mockRequest.mock.calls[0][0].uri;
		expect(uri).toMatch(/pullrequests\/10\/threads/i);
		expect(uri).not.toContain('pullRequests');
	});

	test('list — appends status filter', async () => {
		const ctx = buildMockContext(
			{ ...baseParams, operation: 'list', listOptions: { status: 'active' } },
			[{ value: [{ pullRequestId: 1 }] }],
		);
		await runNode(ctx);
		const uri: string = ctx._mockRequest.mock.calls[0][0].uri;
		expect(uri).toContain('searchCriteria.status=active');
	});

	test('list — no status param when status not set', async () => {
		const ctx = buildMockContext(
			{ ...baseParams, operation: 'list', listOptions: {} },
			[{ value: [] }],
		);
		await runNode(ctx);
		const uri: string = ctx._mockRequest.mock.calls[0][0].uri;
		expect(uri).not.toContain('searchCriteria.status');
	});

	test('create — builds PR body correctly', async () => {
		const ctx = buildMockContext(
			{
				...baseParams, operation: 'create',
				sourceRefName: 'refs/heads/feature', targetRefName: 'refs/heads/main',
				title: 'Add feature', additionalFields: { description: 'desc', reviewers: 'id1,id2' },
			},
			[{ pullRequestId: 99 }],
		);
		const [[result]] = await runNode(ctx);
		expect(result.json.pullRequestId).toBe(99);
		const body = ctx._mockRequest.mock.calls[0][0].body;
		expect(body.sourceRefName).toBe('refs/heads/feature');
		expect(body.reviewers).toEqual([{ id: 'id1' }, { id: 'id2' }]);
	});

	test('update — builds completion options with squash', async () => {
		const ctx = buildMockContext(
			{
				...baseParams, operation: 'update', pullRequestId: 10,
				updateFields: { status: 'completed', mergeStrategy: 'squash', deleteSourceBranch: true },
			},
			[{ pullRequestId: 10 }],
		);
		await runNode(ctx);
		const body = ctx._mockRequest.mock.calls[0][0].body;
		expect(body.status).toBe('completed');
		expect(body.completionOptions.squashMerge).toBe(true);
		expect(body.completionOptions.deleteSourceBranch).toBe(true);
	});
});

// ══════════════════════════════════════════════════════════════════════════════
// TEST PLANS
// ══════════════════════════════════════════════════════════════════════════════

describe('Test Plans Resource', () => {
	test('listPlans — returns plans', async () => {
		const ctx = buildMockContext(
			{ resource: 'testPlan', operation: 'listPlans', project: 'MyProject' },
			[{ value: [{ id: 1, name: 'Sprint 1' }] }],
		);
		const [[result]] = await runNode(ctx);
		expect(result.json.name).toBe('Sprint 1');
	});

	test('listSuites — calls correct plan endpoint', async () => {
		const ctx = buildMockContext(
			{ resource: 'testPlan', operation: 'listSuites', project: 'MyProject', planId: 5 },
			[{ value: [{ id: 10 }] }],
		);
		await runNode(ctx);
		const uri: string = ctx._mockRequest.mock.calls[0][0].uri;
		expect(uri).toContain('/Plans/5/suites');
	});

	test('listCases — calls correct suite endpoint', async () => {
		const ctx = buildMockContext(
			{ resource: 'testPlan', operation: 'listCases', project: 'MyProject', planId: 5, suiteId: 10 },
			[{ value: [{ id: 20 }] }],
		);
		await runNode(ctx);
		const uri: string = ctx._mockRequest.mock.calls[0][0].uri;
		expect(uri).toContain('/Plans/5/Suites/10/TestCase');
	});

	test('listRuns — returns runs', async () => {
		const ctx = buildMockContext(
			{ resource: 'testPlan', operation: 'listRuns', project: 'MyProject' },
			[{ value: [{ id: 1, name: 'Run 1' }] }],
		);
		const [[result]] = await runNode(ctx);
		expect(result.json.name).toBe('Run 1');
	});
});

// ══════════════════════════════════════════════════════════════════════════════
// BOARDS
// ══════════════════════════════════════════════════════════════════════════════

describe('Boards Resource', () => {
	const baseParams = { resource: 'boards', project: 'MyProject', team: 'MyProject Team' };

	test('listBoards — returns boards', async () => {
		const ctx = buildMockContext(
			{ ...baseParams, operation: 'listBoards' },
			[{ value: [{ id: 'Stories', name: 'Stories' }] }],
		);
		const [[result]] = await runNode(ctx);
		expect(result.json.name).toBe('Stories');
	});

	test('listColumns — includes boardId in URL', async () => {
		const ctx = buildMockContext(
			{ ...baseParams, operation: 'listColumns', boardId: 'Stories' },
			[{ value: [{ name: 'To Do' }] }],
		);
		await runNode(ctx);
		const uri: string = ctx._mockRequest.mock.calls[0][0].uri;
		expect(uri).toContain('/boards/Stories/columns');
	});

	test('listIterations — calls iterations endpoint', async () => {
		const ctx = buildMockContext(
			{ ...baseParams, operation: 'listIterations' },
			[{ value: [{ name: 'Sprint 1' }] }],
		);
		const [[result]] = await runNode(ctx);
		expect(result.json.name).toBe('Sprint 1');
		const uri: string = ctx._mockRequest.mock.calls[0][0].uri;
		expect(uri).toContain('teamsettings/iterations');
	});
});

// ══════════════════════════════════════════════════════════════════════════════
// WIKI
// ══════════════════════════════════════════════════════════════════════════════

describe('Wiki Resource', () => {
	const baseParams = { resource: 'wiki', project: 'MyProject', wikiIdentifier: 'MyProject.wiki', pagePath: '/Docs/Guide' };

	test('list — returns wikis', async () => {
		const ctx = buildMockContext(
			{ resource: 'wiki', operation: 'list', project: 'MyProject' },
			[{ value: [{ id: 'w1', name: 'project wiki' }] }],
		);
		const [[result]] = await runNode(ctx);
		expect(result.json.name).toBe('project wiki');
	});

	test('getPage — fetches wiki page', async () => {
		const ctx = buildMockContext(
			{ ...baseParams, operation: 'getPage' },
			[{ content: '# Guide' }],
		);
		const [[result]] = await runNode(ctx);
		expect(result.json.content).toBe('# Guide');
	});

	test('createPage — throws on root path', async () => {
		const ctx = buildMockContext(
			{ ...baseParams, operation: 'createPage', pagePath: '/', content: 'x' },
			[],
		);
		ctx.continueOnFail = () => false;
		await expect(runNode(ctx)).rejects.toThrow();
	});

	test('createPage — sends PUT with content body', async () => {
		const ctx = buildMockContext(
			{ ...baseParams, operation: 'createPage', content: '# New Page' },
			[{ path: '/Docs/Guide' }],
		);
		await runNode(ctx);
		const call = ctx._mockRequest.mock.calls[0][0];
		expect(call.method).toBe('PUT');
		expect(call.body.content).toBe('# New Page');
		expect(call.uri).toContain('path=/Docs/Guide');
	});

	test('updatePage — performs GET for ETag then PUT with If-Match', async () => {
		const ctx = buildMockContext(
			{ ...baseParams, operation: 'updatePage', content: '# Updated' },
			[{ headers: { etag: '"42"' }, body: {} }, { path: '/Docs/Guide' }],
		);
		ctx.helpers.request = jest.fn()
			.mockResolvedValueOnce({ headers: { etag: '"42"' } })
			.mockResolvedValueOnce({ path: '/Docs/Guide' });

		await runNode(ctx);
		const putCall = ctx.helpers.request.mock.calls[1][0];
		expect(putCall.headers['If-Match']).toBe('"42"');
		expect(putCall.body.content).toBe('# Updated');
	});
});

// ══════════════════════════════════════════════════════════════════════════════
// SERVICE HOOKS
// ══════════════════════════════════════════════════════════════════════════════

describe('Service Hooks Resource', () => {
	test('list — calls collection-level endpoint', async () => {
		const ctx = buildMockContext(
			{ resource: 'serviceHook', operation: 'list', project: 'MyProject' },
			[{ value: [{ id: 'hook-1' }] }],
		);
		const [[result]] = await runNode(ctx);
		expect(result.json.id).toBe('hook-1');
		const uri: string = ctx._mockRequest.mock.calls[0][0].uri;
		expect(uri).toContain('_apis/hooks/subscriptions');
		expect(uri).not.toContain('/MyProject/');
	});

	test('create — builds correct subscription body', async () => {
		const ctx = buildMockContext(
			{ resource: 'serviceHook', operation: 'create', project: 'MyProject', eventType: 'git.push', consumerUrl: 'https://hook.example.com' },
			[{ id: 'new-hook' }],
		);
		const [[result]] = await runNode(ctx);
		expect(result.json.id).toBe('new-hook');
		const body = ctx._mockRequest.mock.calls[0][0].body;
		expect(body.publisherId).toBe('tfs');
		expect(body.eventType).toBe('git.push');
		expect(body.consumerInputs.url).toBe('https://hook.example.com');
		expect(body.publisherInputs.projectId).toBe('MyProject');
	});
});

// ══════════════════════════════════════════════════════════════════════════════
// TFVC
// ══════════════════════════════════════════════════════════════════════════════

describe('TFVC Resource', () => {
	test('listRepos — returns branches', async () => {
		const ctx = buildMockContext(
			{ resource: 'tfvc', operation: 'listRepos', project: 'MyProject' },
			[{ value: [{ path: '$/MyProject' }] }],
		);
		const [[result]] = await runNode(ctx);
		expect(result.json.path).toBe('$/MyProject');
	});

	test('getFile — includes path in query', async () => {
		const ctx = buildMockContext(
			{ resource: 'tfvc', operation: 'getFile', project: 'MyProject', filePath: '$/MyProject/src/Main.cs' },
			[{ content: 'class Main {}' }],
		);
		const [[result]] = await runNode(ctx);
		expect(result.json.content).toBe('class Main {}');
		const uri: string = ctx._mockRequest.mock.calls[0][0].uri;
		expect(uri).toContain('path=$/MyProject/src/Main.cs');
	});
});

// ══════════════════════════════════════════════════════════════════════════════
// ARTIFACTS
// ══════════════════════════════════════════════════════════════════════════════

describe('Artifacts Resource', () => {
	test('listFeeds — returns feeds', async () => {
		const ctx = buildMockContext(
			{ resource: 'artifacts', operation: 'listFeeds', project: 'MyProject' },
			[{ value: [{ id: 'feed-1', name: 'nuget' }] }],
		);
		const [[result]] = await runNode(ctx);
		expect(result.json.name).toBe('nuget');
	});

	test('listPackages — calls correct feed endpoint', async () => {
		const ctx = buildMockContext(
			{ resource: 'artifacts', operation: 'listPackages', project: 'MyProject', feedId: 'nuget-feed' },
			[{ value: [{ id: 'pkg-1', name: 'Newtonsoft.Json' }] }],
		);
		const [[result]] = await runNode(ctx);
		expect(result.json.name).toBe('Newtonsoft.Json');
		const uri: string = ctx._mockRequest.mock.calls[0][0].uri;
		expect(uri).toContain('/Feeds/nuget-feed/packages');
	});
});

// ══════════════════════════════════════════════════════════════════════════════
// ERROR HANDLING
// ══════════════════════════════════════════════════════════════════════════════

describe('Error Handling', () => {
	test('continueOnFail — returns error json instead of throwing', async () => {
		const ctx = buildMockContext(
			{ resource: 'git', operation: 'listRepos', project: 'MyProject' },
			[],
		);
		ctx.helpers.request = jest.fn().mockRejectedValue(new Error('Network error'));
		ctx.continueOnFail = () => true;
		const [[result]] = await runNode(ctx);
		expect(result.json.error).toBe('Network error');
	});

	test('continueOnFail false — rethrows error', async () => {
		const ctx = buildMockContext(
			{ resource: 'git', operation: 'listRepos', project: 'MyProject' },
			[],
		);
		ctx.helpers.request = jest.fn().mockRejectedValue(new Error('API down'));
		ctx.continueOnFail = () => false;
		await expect(runNode(ctx)).rejects.toThrow();
	});
});

// ══════════════════════════════════════════════════════════════════════════════
// GENERIC FUNCTIONS
// ══════════════════════════════════════════════════════════════════════════════

describe('GenericFunctions — azureApiRequest', () => {
	const { azureApiRequest } = require('../nodes/AzureDevOpsAdvanced/GenericFunctions');

	function buildGenericCtx(response: any) {
		const mockRequest = jest.fn().mockResolvedValue(response);
		return {
			getCredentials: async () => ({ organization: 'myorg', pat: 'secret' }),
			helpers: { request: mockRequest },
			_mock: mockRequest,
		};
	}

	test('sets Authorization Basic header', async () => {
		const ctx = buildGenericCtx({ ok: true });
		await azureApiRequest.call(ctx, 'GET', 'proj/_apis/git/repositories');
		const opts = ctx._mock.mock.calls[0][0];
		expect(opts.headers.Authorization).toMatch(/^Basic /);
		const decoded = Buffer.from(opts.headers.Authorization.replace('Basic ', ''), 'base64').toString();
		expect(decoded).toBe(':secret');
	});

	test('removes body for GET requests (empty object)', async () => {
		const ctx = buildGenericCtx({});
		await azureApiRequest.call(ctx, 'GET', 'proj/_apis/test');
		const opts = ctx._mock.mock.calls[0][0];
		expect(opts.body).toBeUndefined();
	});

	test('keeps array body intact', async () => {
		const ctx = buildGenericCtx({});
		const arrBody = [{ op: 'add', path: '/fields/System.Title', value: 'Test' }];
		await azureApiRequest.call(ctx, 'POST', 'proj/_apis/wit/workitems/$Task', arrBody);
		const opts = ctx._mock.mock.calls[0][0];
		expect(Array.isArray(opts.body)).toBe(true);
		expect(opts.body).toHaveLength(1);
	});

	test('keeps non-empty object body', async () => {
		const ctx = buildGenericCtx({});
		await azureApiRequest.call(ctx, 'POST', 'endpoint', { state: 'canceling' });
		const opts = ctx._mock.mock.calls[0][0];
		expect(opts.body).toEqual({ state: 'canceling' });
	});

	test('builds correct base URL from organization', async () => {
		const ctx = buildGenericCtx({});
		await azureApiRequest.call(ctx, 'GET', 'proj/_apis/test');
		const opts = ctx._mock.mock.calls[0][0];
		expect(opts.uri).toContain('dev.azure.com/myorg');
	});
});
