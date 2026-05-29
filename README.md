# n8n-nodes-azuredevops-advanced

[![npm version](https://img.shields.io/npm/v/n8n-nodes-azuredevops-advanced.svg)](https://www.npmjs.com/package/n8n-nodes-azuredevops-advanced)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-azuredevops-advanced.svg)](https://www.npmjs.com/package/n8n-nodes-azuredevops-advanced)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n community node](https://img.shields.io/badge/n8n-community%20node-orange)](https://docs.n8n.io/integrations/community-nodes/)

Azure DevOps için kapsamlı bir n8n community node paketi. Git, Pipeline, Work Items, Pull Requests, Test Plans, Boards, Wiki, Service Hooks, TFVC ve Artifacts kaynaklarını tek bir node üzerinden yönetmenizi sağlar.

---

## İçindekiler

- [Özellikler](#özellikler)
- [Kurulum](#kurulum)
- [Kimlik Bilgileri Yapılandırması](#kimlik-bilgileri-yapılandırması)
- [Kaynaklar ve Operasyonlar](#kaynaklar-ve-operasyonlar)
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
- [Kullanım Örnekleri](#kullanım-örnekleri)
- [Gereksinimler](#gereksinimler)
- [Katkıda Bulunma](#katkıda-bulunma)
- [Lisans](#lisans)

---

## Özellikler

- **10 farklı Azure DevOps kaynağı** tek node üzerinden
- **40+ operasyon** ile kapsamlı otomasyon
- Azure DevOps REST API **v7.1** desteği
- Personal Access Token (PAT) ile güvenli kimlik doğrulama
- n8n'nin hata yönetimi ve **continueOnFail** desteği
- TypeScript ile geliştirilmiş, tam tip güvenliği

### Desteklenen Kaynaklar

| Kaynak | Operasyon Sayısı | Açıklama |
|--------|-----------------|----------|
| Git Repositories | 4 | Repo listeleme, dosya okuma, branch oluşturma, commit push |
| Pipeline (CI/CD) | 4 | Pipeline listeleme, çalıştırma, log alma, iptal etme |
| Work Items | 6 | İş öğesi oluşturma, güncelleme, listeleme, kullanıcı ve etiket yönetimi |
| Pull Requests | 5 | PR oluşturma, güncelleme, listeleme, yorum okuma |
| Test Plans | 4 | Test planı, suite, case ve run listeleme |
| Boards | 3 | Board, kolon ve iterasyon (sprint) listeleme |
| Wiki | 4 | Wiki sayfası okuma, oluşturma, güncelleme |
| Service Hooks | 2 | Webhook abonelik listeleme ve oluşturma |
| TFVC | 2 | TFVC branch listeleme ve dosya okuma |
| Artifacts | 2 | Feed ve paket listeleme |

---

## Kurulum

### n8n Arayüzü Üzerinden (Önerilen)

1. n8n'de **Settings → Community Nodes** sayfasına gidin
2. **Install** butonuna tıklayın
3. Paket adını girin: `n8n-nodes-azuredevops-advanced`
4. **Install** butonuna tıklayın ve yeniden başlatmayı onaylayın

### npm ile Manuel Kurulum

Kendi barındırdığınız n8n ortamında:

```bash
npm install n8n-nodes-azuredevops-advanced
```

Docker ile çalışıyorsanız `n8n-custom-extensions` klasörüne ekleyin veya özel bir Docker image oluşturun:

```dockerfile
FROM n8nio/n8n
RUN cd /usr/local/lib/node_modules/n8n && npm install n8n-nodes-azuredevops-advanced
```

---

## Kimlik Bilgileri Yapılandırması

### Azure DevOps Personal Access Token (PAT) Oluşturma

1. [dev.azure.com](https://dev.azure.com) adresine gidin ve oturum açın
2. Sağ üst köşede kullanıcı ikonuna tıklayın → **Personal access tokens**
3. **New Token** butonuna tıklayın
4. Token için bir isim verin (örn. `n8n-integration`)
5. **Expiration** tarihini belirleyin
6. **Scopes** bölümünde ihtiyaçlarınıza göre izinleri seçin:

| Kapsam | İzin | Kullanılan Özellik |
|--------|------|-------------------|
| Code | Read & Write | Git, Pull Requests |
| Build | Read & Execute | Pipeline |
| Work Items | Read & Write | Work Items, Boards |
| Test Management | Read & Write | Test Plans |
| Wiki | Read & Write | Wiki |
| Service Hooks | Read, Write & Manage | Service Hooks |
| Packaging | Read | Artifacts |

7. **Create** butonuna tıklayın ve token'ı kopyalayın (bir daha gösterilmez!)

### n8n'de Credential Oluşturma

1. n8n'de **Credentials → Add Credential** sayfasına gidin
2. **Azure DevOps Advanced API** seçin
3. Aşağıdaki bilgileri girin:

| Alan | Açıklama | Örnek |
|------|----------|-------|
| Organization | Azure DevOps organizasyon adı | `mycompany` |
| Personal Access Token | Yukarıda oluşturulan PAT | `xxxxxxxxxxxxxxxxxxxx` |

4. **Save** butonuna tıklayın

> **Not:** Organization adını `dev.azure.com/{organization}` URL'sinden bulabilirsiniz.

---

## Kaynaklar ve Operasyonlar

### 1. Git Repositories

Azure DevOps Git depolarını yönetin.

#### Operasyonlar

| Operasyon | Açıklama | Zorunlu Parametreler |
|-----------|----------|---------------------|
| **List Repositories** | Projedeki tüm Git repolarını listele | Project |
| **Get File Content** | Belirtilen dosyanın içeriğini al | Project, Repository ID, File Path |
| **Create Branch** | Yeni bir branch oluştur (main'den) | Project, Repository ID, Branch Name |
| **Push Commit** | Dosya değişikliği commit et | Project, Repository ID, Branch Name, Commit Message |

#### Örnek: Dosya İçeriği Alma

```
Resource: Git Repositories
Operation: Get File Content
Project: MyProject
Repository ID: my-repo
File Path: /src/app.ts
```

#### Örnek: Branch Oluşturma

```
Resource: Git Repositories
Operation: Create Branch
Project: MyProject
Repository ID: my-repo
Branch Name: refs/heads/feature/new-feature
```

---

### 2. Pipeline (CI/CD)

Azure DevOps build ve release pipeline'larını otomatikleştirin.

#### Operasyonlar

| Operasyon | Açıklama | Zorunlu Parametreler |
|-----------|----------|---------------------|
| **List Pipelines** | Tüm pipeline'ları listele | Project |
| **Run Pipeline** | Pipeline'ı başlat | Project, Pipeline ID |
| **Get Build Logs** | Belirli bir run'ın loglarını al | Project, Pipeline ID, Run ID |
| **Cancel Run** | Çalışan pipeline'ı iptal et | Project, Pipeline ID, Run ID |

#### Örnek: Pipeline Tetikleme

```
Resource: Pipeline
Operation: Run Pipeline
Project: MyProject
Pipeline ID: 42
```

#### Örnek: Build Loglarını Alma

```
Resource: Pipeline
Operation: Get Build Logs
Project: MyProject
Pipeline ID: 42
Run ID: 1234
```

---

### 3. Work Items

Azure DevOps iş öğelerini (Task, Bug, Epic, Feature, User Story) yönetin.

#### Operasyonlar

| Operasyon | Açıklama | Zorunlu Parametreler |
|-----------|----------|---------------------|
| **Get Work Item** | Tek bir iş öğesini getir | Project, Work Item ID |
| **List All Work Items** | WIQL sorgusuyla tüm iş öğelerini listele | Project |
| **Create Work Item** | Yeni iş öğesi oluştur | Project, Work Item Type, Title |
| **Update Work Item** | Mevcut iş öğesini güncelle | Project, Work Item ID |
| **List Users** | Organizasyon kullanıcılarını listele | - |
| **List Tags** | Projedeki tüm etiketleri listele | Project |

#### Desteklenen İş Öğesi Türleri

- Task
- Bug
- Epic
- Feature
- User Story
- Issue
- Test Case

#### Desteklenen İş Öğesi Durumları

- New / To Do
- Active / Doing
- Resolved
- Closed / Done
- Removed

#### Ek Alanlar (Opsiyonel)

Work Item oluştururken veya güncellerken kullanılabilecek ek alanlar:

| Alan Adı | Açıklama |
|----------|----------|
| `System.Description` | İş öğesi açıklaması (HTML destekli) |
| `System.AssignedTo` | Atanan kullanıcı adı veya e-posta |
| `System.State` | Durum (New, Active, Resolved, Closed) |
| `Microsoft.VSTS.Common.Priority` | Öncelik (1=En Yüksek, 4=En Düşük) |
| `System.Tags` | Etiketler (noktalı virgülle ayrılmış) |
| `Custom.FieldName` | Özel alanlar |

#### Örnek: Bug Oluşturma

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

Git pull request iş akışlarını otomatikleştirin.

#### Operasyonlar

| Operasyon | Açıklama | Zorunlu Parametreler |
|-----------|----------|---------------------|
| **Get Pull Request** | Tek PR'ı getir | Project, Repository ID, PR ID |
| **List Pull Requests** | Filtrelenmiş PR listesi | Project, Repository ID |
| **Create Pull Request** | Yeni PR oluştur | Project, Repository ID, Source Branch, Target Branch, Title |
| **Update Pull Request** | PR'ı güncelle veya merge et | Project, Repository ID, PR ID |
| **Get Comments** | PR yorum thread'lerini getir | Project, Repository ID, PR ID |

#### PR Listeleme Filtreleri

| Filtre | Seçenekler |
|--------|-----------|
| Status | active, abandoned, completed, all |
| Source Branch | Kaynak branch adı |
| Target Branch | Hedef branch adı |
| Limit | Maksimum sonuç sayısı |

#### Merge Stratejileri

PR güncellerken kullanılabilecek merge stratejileri:

| Strateji | Açıklama |
|----------|----------|
| `noFastForward` | Merge commit oluştur |
| `rebase` | Rebasing ile merge et |
| `rebaseMerge` | Rebase ve merge commit |
| `squash` | Tüm commitleri tek commit'e sıkıştır |

#### Örnek: PR Oluşturma

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

Azure DevOps test yönetimini otomatikleştirin.

#### Operasyonlar

| Operasyon | Açıklama | Zorunlu Parametreler |
|-----------|----------|---------------------|
| **List Test Plans** | Tüm test planlarını listele | Project |
| **List Test Suites** | Bir plan içindeki suite'leri listele | Project, Plan ID |
| **List Test Cases** | Bir suite içindeki test case'leri listele | Project, Plan ID, Suite ID |
| **List Test Runs** | Tüm test run'larını listele | Project |

#### Örnek: Test Case Listeleme

```
Resource: Test Plans
Operation: List Test Cases
Project: MyProject
Plan ID: 10
Suite ID: 25
```

---

### 6. Boards

Agile board ve sprint yönetimi.

#### Operasyonlar

| Operasyon | Açıklama | Zorunlu Parametreler |
|-----------|----------|---------------------|
| **List Boards** | Takım board'larını listele | Project, Team |
| **List Board Columns** | Board kolonlarını listele | Project, Team, Board ID |
| **List Iterations** | Sprint/iterasyon listesini al | Project, Team |

#### Örnek: Sprint Listesi Alma

```
Resource: Boards
Operation: List Iterations
Project: MyProject
Team: MyProject Team
```

#### Yaygın Board ID'leri

- `Epics`
- `Features`
- `Stories`
- `Backlog items`

---

### 7. Wiki

Azure DevOps wiki sayfalarını yönetin.

#### Operasyonlar

| Operasyon | Açıklama | Zorunlu Parametreler |
|-----------|----------|---------------------|
| **List Wikis** | Projedeki tüm wiki'leri listele | Project |
| **Get Page** | Wiki sayfasını getir | Project, Wiki Identifier, Page Path |
| **Create Page** | Yeni wiki sayfası oluştur | Project, Wiki Identifier, Page Path, Content |
| **Update Page** | Mevcut wiki sayfasını güncelle | Project, Wiki Identifier, Page Path, Content |

#### Örnek: Wiki Sayfası Oluşturma

```
Resource: Wiki
Operation: Create Page
Project: MyProject
Wiki Identifier: MyProject.wiki
Page Path: /Documentation/API-Guide
Content: # API Guide\n\nBu sayfa API rehberini içerir...
```

> **Not:** Content alanı Markdown formatını destekler.

---

### 8. Service Hooks

Azure DevOps event'leri için webhook abonelikleri yönetin.

#### Operasyonlar

| Operasyon | Açıklama | Zorunlu Parametreler |
|-----------|----------|---------------------|
| **List Subscriptions** | Tüm webhook aboneliklerini listele | - |
| **Create Subscription** | Yeni webhook aboneliği oluştur | Project, Event Type, Consumer URL |

#### Desteklenen Event Türleri

| Event Türü | Açıklama |
|-----------|----------|
| `build.complete` | Build tamamlandı |
| `git.push` | Kod push edildi |
| `git.pullrequest.created` | Pull Request oluşturuldu |
| `git.pullrequest.merged` | Pull Request merge edildi |
| `workitem.created` | İş öğesi oluşturuldu |
| `workitem.updated` | İş öğesi güncellendi |
| `ms.vss-release.release-created-event` | Release oluşturuldu |

#### Örnek: Webhook Aboneliği Oluşturma

```
Resource: Service Hooks
Operation: Create Subscription
Project: MyProject
Event Type: git.push
Consumer URL: https://your-n8n-instance.com/webhook/xyz
```

> **İpucu:** Consumer URL olarak n8n Webhook node'unun URL'sini kullanarak Azure DevOps event'lerini n8n workflow'larına bağlayabilirsiniz.

---

### 9. TFVC

Team Foundation Version Control (eski versiyon kontrol sistemi) desteği.

#### Operasyonlar

| Operasyon | Açıklama | Zorunlu Parametreler |
|-----------|----------|---------------------|
| **List Branches** | TFVC branch ve klasörlerini listele | Project |
| **Get File Content** | TFVC'den dosya içeriği al | Project, File Path |

#### Örnek: TFVC Dosyası Okuma

```
Resource: TFVC
Operation: Get File Content
Project: MyProject
File Path: $/MyProject/src/main.cs
```

> **Not:** TFVC yolları `$/` ile başlar.

---

### 10. Artifacts

Azure Artifacts paket feed yönetimi.

#### Operasyonlar

| Operasyon | Açıklama | Zorunlu Parametreler |
|-----------|----------|---------------------|
| **List Feeds** | Tüm artifact feed'lerini listele | Project |
| **List Packages** | Feed içindeki paketleri listele | Project, Feed ID |

#### Örnek: Paket Listeleme

```
Resource: Artifacts
Operation: List Packages
Project: MyProject
Feed ID: my-nuget-feed
```

---

## Kullanım Örnekleri

### Örnek 1: Otomatik PR Oluşturma Workflow'u

Bu workflow, bir GitHub event'inde Azure DevOps'ta otomatik PR oluşturur:

1. **Webhook Trigger** → GitHub push event alır
2. **Azure DevOps Advanced** (Git: Create Branch) → Yeni branch oluşturur
3. **Azure DevOps Advanced** (Pull Requests: Create) → PR açar
4. **Slack** → Ekibe bildirim gönderir

### Örnek 2: Work Item Otomasyonu

Jira'dan Azure DevOps'a iş öğesi senkronizasyonu:

1. **Schedule Trigger** → Her saat çalışır
2. **Jira** → Yeni issue'ları listeler
3. **IF** → Azure DevOps'ta mevcut değilse filtreler
4. **Azure DevOps Advanced** (Work Items: Create) → Task oluşturur
5. **Jira** → Issue'yu günceller

### Örnek 3: Build Monitoring

Pipeline başarısız olduğunda uyarı gönderme:

1. **Azure DevOps Advanced** (Service Hooks: Create Subscription) → Build event'e abone olur
2. **Webhook** → Build complete event alır
3. **IF** → Build başarısız mı kontrol eder
4. **Azure DevOps Advanced** (Pipeline: Get Build Logs) → Hata loglarını alır
5. **Email / Slack** → Detaylı hata bildirimi gönderir

---

## Gereksinimler

- **n8n** >= 1.0.0
- **Node.js** >= 18.x
- Azure DevOps hesabı ve organizasyon
- Yeterli izinlere sahip Personal Access Token (PAT)

---

## Geliştirme

Projeyi yerel ortamda çalıştırmak için:

```bash
# Repoyu klonlayın
git clone https://github.com/ertekinozturgut/n8n-nodes-azuredevops-advanced.git
cd n8n-nodes-azuredevops-advanced

# Bağımlılıkları yükleyin
npm install

# TypeScript derleme (watch mode)
npm run dev

# Üretim derlemesi
npm run build
```

### Proje Yapısı

```
n8n-nodes-azuredevops-advanced/
├── nodes/
│   └── AzureDevOpsAdvanced/
│       ├── AzureDevOpsAdvanced.node.ts    # Ana node implementasyonu
│       ├── GenericFunctions.ts            # API istek yardımcısı
│       ├── azureDevOps.svg               # Node ikonu
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
├── dist/                                  # Derlenmiş JavaScript
├── package.json
└── tsconfig.json
```

---

## Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen şu adımları takip edin:

1. Repoyu fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'i push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

### Bug Bildirimi

[GitHub Issues](https://github.com/ertekinozturgut/n8n-nodes-azuredevops-advanced/issues) sayfasından bug bildirebilir veya özellik talebinde bulunabilirsiniz.

---

## Lisans

Bu proje [MIT License](LICENSE) altında lisanslanmıştır.

---

## Bağlantılar

- [npm Paketi](https://www.npmjs.com/package/n8n-nodes-azuredevops-advanced)
- [GitHub Reposu](https://github.com/ertekinozturgut/n8n-nodes-azuredevops-advanced)
- [Azure DevOps REST API Dokümantasyonu](https://docs.microsoft.com/en-us/rest/api/azure/devops/)
- [n8n Community Nodes Rehberi](https://docs.n8n.io/integrations/community-nodes/)
