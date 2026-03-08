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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cipher = void 0;
const di_1 = require("@n8n/di");
const crypto_1 = require("crypto");
const instance_settings_1 = require("../instance-settings");
const RANDOM_BYTES = Buffer.from('53616c7465645f5f', 'hex');
let Cipher = class Cipher {
    constructor(instanceSettings) {
        this.instanceSettings = instanceSettings;
    }
    encrypt(data, customEncryptionKey) {
        const salt = (0, crypto_1.randomBytes)(8);
        const [key, iv] = this.getKeyAndIv(salt, customEncryptionKey);
        const cipher = (0, crypto_1.createCipheriv)('aes-256-cbc', key, iv);
        const encrypted = cipher.update(typeof data === 'string' ? data : JSON.stringify(data));
        return Buffer.concat([RANDOM_BYTES, salt, encrypted, cipher.final()]).toString('base64');
    }
    decrypt(data, customEncryptionKey) {
        const input = Buffer.from(data, 'base64');
        if (input.length < 16)
            return '';
        const salt = input.subarray(8, 16);
        const [key, iv] = this.getKeyAndIv(salt, customEncryptionKey);
        const contents = input.subarray(16);
        const decipher = (0, crypto_1.createDecipheriv)('aes-256-cbc', key, iv);
        return Buffer.concat([decipher.update(contents), decipher.final()]).toString('utf-8');
    }
    getKeyAndIv(salt, customEncryptionKey) {
        const encryptionKey = customEncryptionKey ?? this.instanceSettings.encryptionKey;
        const password = Buffer.concat([Buffer.from(encryptionKey, 'binary'), salt]);
        const hash1 = (0, crypto_1.createHash)('md5').update(password).digest();
        const hash2 = (0, crypto_1.createHash)('md5')
            .update(Buffer.concat([hash1, password]))
            .digest();
        const iv = (0, crypto_1.createHash)('md5')
            .update(Buffer.concat([hash2, password]))
            .digest();
        const key = Buffer.concat([hash1, hash2]);
        return [key, iv];
    }
};
exports.Cipher = Cipher;
exports.Cipher = Cipher = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [instance_settings_1.InstanceSettings])
], Cipher);
//# sourceMappingURL=cipher.js.map