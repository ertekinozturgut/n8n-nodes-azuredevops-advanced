# n8n-nodes-azuredevops-advanced

[![npm version](https://img.shields.io/npm/v/n8n-nodes-azuredevops-advanced.svg)](https://www.npmjs.com/package/n8n-nodes-azuredevops-advanced)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-azuredevops-advanced.svg)](https://www.npmjs.com/package/n8n-nodes-azuredevops-advanced)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n community node](https://img.shields.io/badge/n8n-community%20node-orange)](https://docs.n8n.io/integrations/community-nodes/)

A comprehensive n8n community node package for Azure DevOps integration. Manage Git, Pipelines, Work Items, Pull Requests, Test Plans, Boards, Wiki, Service Hooks, TFVC, and Artifacts — all from a single node.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Credential Configuration](#credential-configuration)
- [Resources & Operations](#resources--operations)
  - [Git Repositories](#1-git-repositories)
  - [Pipeline (CI/CD)](#2-pipeline-cicd)
  - [Work Items](#3-work-items)
  - [Pull Requests](#4-pull-requests)
  - [Test Plans](#5-test-plans)
  - [Boards](#6-boards)
  - [Wiki](#7-wiki)
  - [Service Hooks](#8-service-hooks)
  - [TFVC](#9-tfvc)
  - [Artifacts](#10-artifacts)
- [Usage Examples](#usage-examples)
- [Requirements](#requirements)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **10 Azure DevOps resources** managed through a single node
- **40+ operations** for comprehensive automation
- Azure DevOps REST API **v7.1** support
- Secure authentication via Personal Access Token (PAT)
- Full support for n8n error handling and **continueOnFail**
- Built with TypeScript for complete type safety

### Supported Resources

| Resource | Operations | Description |
|----------|-----------|-------------|
| Git Repositories | 4 | List repos, read files, create branches, push commits |
| Pipeline (CI/CD) | 4 | List, run, get logs, cancel pipelines |
| Work Items | 6 | Create, update, list work items; manage users and tags |
| Pull Requests | 5 | Create, update, list PRs, read comments |
| Test Plans | 4 | List test plans, suites, cases, and runs |
| Boards | 3 | List boards, columns, and iterations (sprints) |
| Wiki | 4 | Read, create, and update wiki pages |
| Service Hooks | 2 | List and create webhook subscriptions |
| TFVC | 2 | List TFVC branches and read files |
| Artifacts | 2 | List feeds and packages |

---

## Installation

### Via n8n UI (Recommended)

1. In n8n, go to **Settings → Community Nodes**
2. Click **Install**
3. Enter the package name: `n8n-nodes-azuredevops-advanced`
4. Click **Install** and confirm the restart

### Manual Installation via npm

For self-hosted n8n environments:

```bash
npm install n8n-nodes-azuredevops-advanced
```

If you're running Docker, add it to the `n8n-custom-extensions` folder or build a custom Docker image:

```dockerfile
FROM n8nio/n8n
RUN cd /usr/local/lib/node_modules/n8n && npm install n8n-nodes-azuredevops-advanced
```

---

## Credential Configuration

### Creating an Azure DevOps Personal Access Token (PAT)

1. Go to [dev.azure.com](https://dev.azure.com) and sign in
2. Click your user icon in the top right → **Personal access tokens**
3. Click **New Token**
4. Give the token a name (e.g. `n8n-integration`)
5. Set an **Expiration** date
6. Under **Scopes**, select the permissions you need:

| Scope | Permission | Used For |
|-------|-----------|----------|
| Code | Read & Write | Git, Pull Requests |
| Build | Read & Execute | Pipeline |
| Work Items | Read & Write | Work Items, Boards |
| Test Management | Read & Write | Test Plans |
| Wiki | Read & Write | Wiki |
| Service Hooks | Read, Write & Manage | Service Hooks |
| Packaging | Read | Artifacts |

7. Click **Create** and copy the token (it won't be shown again!)

### Creating a Credential in n8n

1. In n8n, go to **Credentials → Add Credential**
2. Select **Azure DevOps Advanced API**
3. Fill in the following fields:

| Field | Description | Example |
|-------|-------------|---------|
| Organization | Your Azure DevOps organization name | `mycompany` |
| Personal Access Token | The PAT you created above | `xxxxxxxxxxxxxxxxxxxx` |

4. Click **Save**

> **Note:** You can find your organization name in the URL: `dev.azure.com/{organization}`

---

## Resources & Operations

### 1. Git Repositories

Manage Azure DevOps Git repositories.

#### Operations

| Operation | Description | Required Parameters |
|-----------|-------------|-------------------|
| **List Repositories** | List all Git repos in a project | Project |
| **Get File Content** | Retrieve the content of a file | Project, Repository ID, File Path |
| **Create Branch** | Create a new branch (from main) | Project, Repository ID, Branch Name |
| **Push Commit** | Commit a file change | Project, Repository ID, Branch Name, Commit Message |

#### Example: Get File Content

```
Resource: Git Repositories
Operation: Get File Content
Project: MyProject
Repository ID: my-repo
File Path: /src/app.ts
```

#### Example: Create Branch

```
Resource: Git Repositories
Operation: Create Branch
Project: MyProject
Repository ID: my-repo
Branch Name: refs/heads/feature/new-feature
```

---

### 2. Pipeline (CI/CD)

Automate Azure DevOps build and release pipelines.

#### Operations

| Operation | Description | Required Parameters |
|-----------|-------------|-------------------|
| **List Pipelines** | List all pipelines | Project |
| **Run Pipeline** | Trigger a pipeline | Project, Pipeline ID |
| **Get Build Logs** | Retrieve logs for a specific run | Project, Pipeline ID, Run ID |
| **Cancel Run** | Cancel an active pipeline run | Project, Pipeline ID, Run ID |

#### Example: Trigger a Pipeline

```
Resource: Pipeline
Operation: Run Pipeline
Project: MyProject
Pipeline ID: 42
```

#### Example: Get Build Logs

```
Resource: Pipeline
Operation: Get Build Logs
Project: MyProject
Pipeline ID: 42
Run ID: 1234
```

---

### 3. Work Items

Manage Azure DevOps work items (Task, Bug, Epic, Feature, User Story).

#### Operations

| Operation | Description | Required Parameters |
|-----------|-------------|-------------------|
| **Get Work Item** | Fetch a single work item | Project, Work Item ID |
| **List All Work Items** | List all work items via WIQL query | Project |
| **Create Work Item** | Create a new work item | Project, Work Item Type, Title |
| **Update Work Item** | Update an existing work item | Project, Work Item ID |
| **List Users** | List organization users | — |
| **List Tags** | List all tags in a project | Project |

#### Supported Work Item Types

- Task
- Bug
- Epic
- Feature
- User Story
- Issue
- Test Case

#### Supported Work Item States

- New / To Do
- Active / Doing
- Resolved
- Closed / Done
- Removed

#### Additional Fields (Optional)

Extra fields available when creating or updating a work item:

| Field Name | Description |
|-----------|-------------|
| `System.Description` | Work item description (HTML supported) |
| `System.AssignedTo` | Assigned user name or email |
| `System.State` | State (New, Active, Resolved, Closed) |
| `Microsoft.VSTS.Common.Priority` | Priority (1=Highest, 4=Lowest) |
| `System.Tags` | Tags (semicolon-separated) |
| `Custom.FieldName` | Any custom field |

#### Example: Create a Bug

```
Resource: Work Items
Operation: Create Work Item
Project: MyProject
Work Item Type: Bug
Title: Login button not working
Additional Fields:
  - System.Description: Steps to reproduce...
  - System.AssignedTo: john.doe@company.com
  - Microsoft.VSTS.Common.Priority: 1
```

---

### 4. Pull Requests

Automate Git pull request workflows.

#### Operations

| Operation | Description | Required Parameters |
|-----------|-------------|-------------------|
| **Get Pull Request** | Fetch a single PR | Project, Repository ID, PR ID |
| **List Pull Requests** | List PRs with filters | Project, Repository ID |
| **Create Pull Request** | Open a new PR | Project, Repository ID, Source Branch, Target Branch, Title |
| **Update Pull Request** | Update or merge a PR | Project, Repository ID, PR ID |
| **Get Comments** | Fetch PR review threads | Project, Repository ID, PR ID |

#### PR Listing Filters

| Filter | Options |
|--------|---------|
| Status | active, abandoned, completed, all |
| Source Branch | Source branch name |
| Target Branch | Target branch name |
| Limit | Maximum number of results |

#### Merge Strategies

Merge strategies available when completing a PR:

| Strategy | Description |
|----------|-------------|
| `noFastForward` | Create a merge commit |
| `rebase` | Rebase onto target branch |
| `rebaseMerge` | Rebase and create a merge commit |
| `squash` | Squash all commits into one |

#### Example: Create a Pull Request

```
Resource: Pull Requests
Operation: Create Pull Request
Project: MyProject
Repository ID: my-repo
Source Branch: refs/heads/feature/new-feature
Target Branch: refs/heads/main
Title: Add new authentication feature
Additional Fields:
  - Description: This PR adds OAuth2 support
  - isDraft: false
  - Reviewers: user-id-1,user-id-2
```

---

### 5. Test Plans

Automate Azure DevOps test management.

#### Operations

| Operation | Description | Required Parameters |
|-----------|-------------|-------------------|
| **List Test Plans** | List all test plans | Project |
| **List Test Suites** | List suites within a plan | Project, Plan ID |
| **List Test Cases** | List test cases within a suite | Project, Plan ID, Suite ID |
| **List Test Runs** | List all test runs | Project |

#### Example: List Test Cases

```
Resource: Test Plans
Operation: List Test Cases
Project: MyProject
Plan ID: 10
Suite ID: 25
```

---

### 6. Boards

Agile board and sprint management.

#### Operations

| Operation | Description | Required Parameters |
|-----------|-------------|-------------------|
| **List Boards** | List team boards | Project, Team |
| **List Board Columns** | List columns in a board | Project, Team, Board ID |
| **List Iterations** | Get sprint/iteration list | Project, Team |

#### Example: Get Sprint List

```
Resource: Boards
Operation: List Iterations
Project: MyProject
Team: MyProject Team
```

#### Common Board IDs

- `Epics`
- `Features`
- `Stories`
- `Backlog items`

---

### 7. Wiki

Manage Azure DevOps wiki pages.

#### Operations

| Operation | Description | Required Parameters |
|-----------|-------------|-------------------|
| **List Wikis** | List all wikis in a project | Project |
| **Get Page** | Fetch a wiki page | Project, Wiki Identifier, Page Path |
| **Create Page** | Create a new wiki page | Project, Wiki Identifier, Page Path, Content |
| **Update Page** | Update an existing wiki page | Project, Wiki Identifier, Page Path, Content |

#### Example: Create a Wiki Page

```
Resource: Wiki
Operation: Create Page
Project: MyProject
Wiki Identifier: MyProject.wiki
Page Path: /Documentation/API-Guide
Content: # API Guide\n\nThis page contains the API reference...
```

> **Note:** The Content field supports Markdown format.

---

### 8. Service Hooks

Manage webhook subscriptions for Azure DevOps events.

#### Operations

| Operation | Description | Required Parameters |
|-----------|-------------|-------------------|
| **List Subscriptions** | List all webhook subscriptions | — |
| **Create Subscription** | Create a new webhook subscription | Project, Event Type, Consumer URL |

#### Supported Event Types

| Event Type | Description |
|-----------|-------------|
| `build.complete` | Build completed |
| `git.push` | Code pushed |
| `git.pullrequest.created` | Pull request created |
| `git.pullrequest.merged` | Pull request merged |
| `workitem.created` | Work item created |
| `workitem.updated` | Work item updated |
| `ms.vss-release.release-created-event` | Release created |

#### Example: Create a Webhook Subscription

```
Resource: Service Hooks
Operation: Create Subscription
Project: MyProject
Event Type: git.push
Consumer URL: https://your-n8n-instance.com/webhook/xyz
```

> **Tip:** Use your n8n Webhook node's URL as the Consumer URL to connect Azure DevOps events directly to n8n workflows.

---

### 9. TFVC

Support for Team Foundation Version Control (legacy source control).

#### Operations

| Operation | Description | Required Parameters |
|-----------|-------------|-------------------|
| **List Branches** | List TFVC branches and folders | Project |
| **Get File Content** | Read a file from TFVC | Project, File Path |

#### Example: Read a TFVC File

```
Resource: TFVC
Operation: Get File Content
Project: MyProject
File Path: $/MyProject/src/main.cs
```

> **Note:** TFVC paths start with `$/`.

---

### 10. Artifacts

Azure Artifacts package feed management.

#### Operations

| Operation | Description | Required Parameters |
|-----------|-------------|-------------------|
| **List Feeds** | List all artifact feeds | Project |
| **List Packages** | List packages in a feed | Project, Feed ID |

#### Example: List Packages

```
Resource: Artifacts
Operation: List Packages
Project: MyProject
Feed ID: my-nuget-feed
```

---

## Usage Examples

### Example 1: Automated PR Creation Workflow

This workflow automatically creates a PR in Azure DevOps in response to an external event:

1. **Webhook Trigger** → Receives a GitHub push event
2. **Azure DevOps Advanced** (Git: Create Branch) → Creates a new branch
3. **Azure DevOps Advanced** (Pull Requests: Create) → Opens a PR
4. **Slack** → Sends a notification to the team

### Example 2: Work Item Automation

Synchronize issues from Jira to Azure DevOps:

1. **Schedule Trigger** → Runs every hour
2. **Jira** → Lists new issues
3. **IF** → Filters out items already in Azure DevOps
4. **Azure DevOps Advanced** (Work Items: Create) → Creates a Task
5. **Jira** → Updates the original issue

### Example 3: Build Monitoring

Send an alert when a pipeline fails:

1. **Azure DevOps Advanced** (Service Hooks: Create Subscription) → Subscribes to build events
2. **Webhook** → Receives the build complete event
3. **IF** → Checks whether the build failed
4. **Azure DevOps Advanced** (Pipeline: Get Build Logs) → Fetches error logs
5. **Email / Slack** → Sends a detailed failure notification

---

## Requirements

- **n8n** >= 1.0.0
- **Node.js** >= 18.x
- An Azure DevOps account and organization
- A Personal Access Token (PAT) with sufficient permissions

---

## Development

To run the project locally:

```bash
# Clone the repository
git clone https://github.com/ertekinozturgut/n8n-nodes-azuredevops-advanced.git
cd n8n-nodes-azuredevops-advanced

# Install dependencies
npm install

# TypeScript compilation (watch mode)
npm run dev

# Production build
npm run build
```

### Project Structure

```
n8n-nodes-azuredevops-advanced/
├── nodes/
│   └── AzureDevOpsAdvanced/
│       ├── AzureDevOpsAdvanced.node.ts    # Main node implementation
│       ├── GenericFunctions.ts            # API request helper
│       ├── azureDevOps.svg               # Node icon
│       └── descriptions/
│           ├── GitDescription.ts
│           ├── PipelineDescription.ts
│           ├── WorkItemDescription.ts
│           ├── PullRequestDescription.ts
│           ├── TestPlanDescription.ts
│           ├── BoardDescription.ts
│           ├── WikiDescription.ts
│           ├── ServiceHookDescription.ts
│           ├── TfvcDescription.ts
│           └── ArtifactsDescription.ts
├── credentials/
│   └── AzureDevOpsAdvancedApi.credentials.ts
├── dist/                                  # Compiled JavaScript
├── package.json
└── tsconfig.json
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Bug Reports

You can report bugs or request features via [GitHub Issues](https://github.com/ertekinozturgut/n8n-nodes-azuredevops-advanced/issues).

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Links

- [npm Package](https://www.npmjs.com/package/n8n-nodes-azuredevops-advanced)
- [GitHub Repository](https://github.com/ertekinozturgut/n8n-nodes-azuredevops-advanced)
- [Azure DevOps REST API Documentation](https://docs.microsoft.com/en-us/rest/api/azure/devops/)
- [n8n Community Nodes Guide](https://docs.n8n.io/integrations/community-nodes/)
