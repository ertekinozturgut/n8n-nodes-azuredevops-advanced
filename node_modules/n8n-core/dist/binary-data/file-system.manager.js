"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemManager = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const node_fs_1 = require("node:fs");
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const uuid_1 = require("uuid");
const utils_1 = require("./utils");
const disallowed_filepath_error_1 = require("../errors/disallowed-filepath.error");
const file_not_found_error_1 = require("../errors/file-not-found.error");
const EXECUTION_ID_EXTRACTOR = /^(\w+)(?:[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12})$/;
const EXECUTION_PATH_MATCHER = /^workflows\/([^/]+)\/executions\/([^/]+)\//;
class FileSystemManager {
    constructor(storagePath, errorReporter) {
        this.storagePath = storagePath;
        this.errorReporter = errorReporter;
    }
    async init() {
        await (0, utils_1.assertDir)(this.storagePath);
    }
    async store(location, bufferOrStream, { mimeType, fileName }) {
        const fileId = this.toFileId(location);
        const filePath = this.resolvePath(fileId);
        await (0, utils_1.assertDir)(node_path_1.default.dirname(filePath));
        await promises_1.default.writeFile(filePath, bufferOrStream);
        const fileSize = await this.getSize(fileId);
        await this.storeMetadata(fileId, { mimeType, fileName, fileSize });
        return { fileId, fileSize };
    }
    getPath(fileId) {
        return this.resolvePath(fileId);
    }
    async getAsStream(fileId, chunkSize) {
        const filePath = this.resolvePath(fileId);
        if (await (0, utils_1.doesNotExist)(filePath)) {
            throw new file_not_found_error_1.FileNotFoundError(filePath);
        }
        return (0, node_fs_1.createReadStream)(filePath, { highWaterMark: chunkSize });
    }
    async getAsBuffer(fileId) {
        const filePath = this.resolvePath(fileId);
        if (await (0, utils_1.doesNotExist)(filePath)) {
            throw new file_not_found_error_1.FileNotFoundError(filePath);
        }
        return await promises_1.default.readFile(filePath);
    }
    async getMetadata(fileId) {
        const filePath = this.resolvePath(`${fileId}.metadata`);
        return await (0, n8n_workflow_1.jsonParse)(await promises_1.default.readFile(filePath, { encoding: 'utf-8' }));
    }
    async deleteMany(locations) {
        if (locations.length === 0)
            return;
        const executionIds = locations.flatMap((location) => location.type === 'execution' ? [location.executionId] : []);
        const set = new Set(executionIds);
        const fileNames = await promises_1.default.readdir(this.storagePath);
        for (const fileName of fileNames) {
            const executionId = fileName.match(EXECUTION_ID_EXTRACTOR)?.[1];
            if (executionId && set.has(executionId)) {
                const filePath = this.resolvePath(fileName);
                await Promise.all([promises_1.default.rm(filePath), promises_1.default.rm(`${filePath}.metadata`)]);
            }
        }
        const binaryDataDirs = locations.map((location) => this.resolvePath(this.toRelativePath(location)));
        await Promise.all(binaryDataDirs.map(async (dir) => {
            await promises_1.default.rm(dir, { recursive: true, force: true });
        }));
    }
    async copyByFilePath(targetLocation, sourcePath, { mimeType, fileName }) {
        const targetFileId = this.toFileId(targetLocation);
        const targetPath = this.resolvePath(targetFileId);
        await (0, utils_1.assertDir)(node_path_1.default.dirname(targetPath));
        await promises_1.default.cp(sourcePath, targetPath);
        const fileSize = await this.getSize(targetFileId);
        await this.storeMetadata(targetFileId, { mimeType, fileName, fileSize });
        return { fileId: targetFileId, fileSize };
    }
    async copyByFileId(targetLocation, sourceFileId) {
        const targetFileId = this.toFileId(targetLocation);
        const sourcePath = this.resolvePath(sourceFileId);
        const targetPath = this.resolvePath(targetFileId);
        const sourceMetadata = await this.getMetadata(sourceFileId);
        await (0, utils_1.assertDir)(node_path_1.default.dirname(targetPath));
        await promises_1.default.copyFile(sourcePath, targetPath);
        await this.storeMetadata(targetFileId, sourceMetadata);
        return targetFileId;
    }
    async rename(oldFileId, newFileId) {
        const oldPath = this.resolvePath(oldFileId);
        const newPath = this.resolvePath(newFileId);
        await (0, utils_1.assertDir)(node_path_1.default.dirname(newPath));
        await Promise.all([
            promises_1.default.rename(oldPath, newPath),
            promises_1.default.rename(`${oldPath}.metadata`, `${newPath}.metadata`),
        ]);
        const [tempDirParent] = oldPath.split('/temp/');
        const tempDir = node_path_1.default.join(tempDirParent, 'temp');
        await promises_1.default.rm(tempDir, { recursive: true });
    }
    async deleteManyByFileId(ids) {
        const parsedIds = ids.flatMap((id) => {
            try {
                const parsed = this.parseFileId(id);
                return [parsed];
            }
            catch (e) {
                this.errorReporter.warn(`Could not parse file ID ${id}. Skip deletion`);
                return [];
            }
        });
        await this.deleteMany(parsedIds);
    }
    toFileId(location) {
        return `${this.toRelativePath(location)}/binary_data/${(0, uuid_1.v4)()}`;
    }
    toRelativePath(location) {
        switch (location.type) {
            case 'execution': {
                const executionId = location.executionId || 'temp';
                return `workflows/${location.workflowId}/executions/${executionId}`;
            }
            case 'custom':
                return location.pathSegments.join('/');
        }
    }
    parseFileId(fileId) {
        const executionMatch = fileId.match(EXECUTION_PATH_MATCHER);
        if (executionMatch) {
            return utils_1.FileLocation.ofExecution(executionMatch[1], executionMatch[2]);
        }
        const binaryDataIndex = fileId.indexOf('/binary_data/');
        if (binaryDataIndex !== -1) {
            const pathSegments = fileId.substring(0, binaryDataIndex).split('/');
            return utils_1.FileLocation.ofCustom({ pathSegments });
        }
        throw new n8n_workflow_1.UnexpectedError(`File ID ${fileId} has invalid format.`);
    }
    resolvePath(...args) {
        const returnPath = node_path_1.default.join(this.storagePath, ...args);
        if (node_path_1.default.relative(this.storagePath, returnPath).startsWith('..')) {
            throw new disallowed_filepath_error_1.DisallowedFilepathError(returnPath);
        }
        return returnPath;
    }
    async storeMetadata(fileId, metadata) {
        const filePath = this.resolvePath(`${fileId}.metadata`);
        await promises_1.default.writeFile(filePath, JSON.stringify(metadata), { encoding: 'utf-8' });
    }
    async getSize(fileId) {
        const filePath = this.resolvePath(fileId);
        try {
            const stats = await promises_1.default.stat(filePath);
            return stats.size;
        }
        catch (error) {
            throw new file_not_found_error_1.FileNotFoundError(filePath);
        }
    }
}
exports.FileSystemManager = FileSystemManager;
//# sourceMappingURL=file-system.manager.js.map