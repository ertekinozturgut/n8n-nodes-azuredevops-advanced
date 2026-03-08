"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectStoreManager = void 0;
const di_1 = require("@n8n/di");
const promises_1 = __importDefault(require("node:fs/promises"));
const uuid_1 = require("uuid");
const object_store_service_ee_1 = require("./object-store/object-store.service.ee");
const utils_1 = require("./utils");
let ObjectStoreManager = class ObjectStoreManager {
    constructor(objectStoreService) {
        this.objectStoreService = objectStoreService;
    }
    async init() {
        await this.objectStoreService.checkConnection();
    }
    async store(location, bufferOrStream, metadata) {
        const fileId = this.toFileId(location);
        const buffer = await (0, utils_1.binaryToBuffer)(bufferOrStream);
        await this.objectStoreService.put(fileId, buffer, metadata);
        return { fileId, fileSize: buffer.length };
    }
    getPath(fileId) {
        return fileId;
    }
    async getAsBuffer(fileId) {
        return await this.objectStoreService.get(fileId, { mode: 'buffer' });
    }
    async getAsStream(fileId) {
        return await this.objectStoreService.get(fileId, { mode: 'stream' });
    }
    async getMetadata(fileId) {
        const { 'content-length': contentLength, 'content-type': contentType, 'x-amz-meta-filename': fileName, } = await this.objectStoreService.getMetadata(fileId);
        const metadata = { fileSize: Number(contentLength) };
        if (contentType)
            metadata.mimeType = contentType;
        if (fileName)
            metadata.fileName = fileName;
        return metadata;
    }
    async copyByFileId(targetLocation, sourceFileId) {
        const targetFileId = this.toFileId(targetLocation);
        const sourceFile = await this.objectStoreService.get(sourceFileId, { mode: 'buffer' });
        await this.objectStoreService.put(targetFileId, sourceFile);
        return targetFileId;
    }
    async copyByFilePath(targetLocation, sourcePath, metadata) {
        const targetFileId = this.toFileId(targetLocation);
        const sourceFile = await promises_1.default.readFile(sourcePath);
        await this.objectStoreService.put(targetFileId, sourceFile, metadata);
        return { fileId: targetFileId, fileSize: sourceFile.length };
    }
    async rename(oldFileId, newFileId) {
        const oldFile = await this.objectStoreService.get(oldFileId, { mode: 'buffer' });
        const oldFileMetadata = await this.objectStoreService.getMetadata(oldFileId);
        await this.objectStoreService.put(newFileId, oldFile, oldFileMetadata);
        await this.objectStoreService.deleteOne(oldFileId);
    }
    toFileId(location) {
        switch (location.type) {
            case 'execution': {
                const executionId = location.executionId || 'temp';
                return `workflows/${location.workflowId}/executions/${executionId}/binary_data/${(0, uuid_1.v4)()}`;
            }
            case 'custom':
                return `${location.pathSegments.join('/')}/binary_data/${(0, uuid_1.v4)()}`;
        }
    }
};
exports.ObjectStoreManager = ObjectStoreManager;
exports.ObjectStoreManager = ObjectStoreManager = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [object_store_service_ee_1.ObjectStoreService])
], ObjectStoreManager);
//# sourceMappingURL=object-store.manager.js.map