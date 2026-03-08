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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataDeduplicationService = void 0;
const get_1 = __importDefault(require("lodash/get"));
const assert = __importStar(require("node:assert/strict"));
class DataDeduplicationService {
    constructor(deduplicator) {
        this.deduplicator = deduplicator;
    }
    assertDeduplicator() {
        assert.ok(this.deduplicator, 'Manager needs to initialized before use. Make sure to call init()');
    }
    static assertInstance() {
        assert.ok(DataDeduplicationService.instance, 'Instance needs to initialized before use. Make sure to call init()');
    }
    static assertSingleInstance() {
        assert.ok(!DataDeduplicationService.instance, 'Instance already initialized. Multiple initializations are not allowed.');
    }
    static async init(deduplicator) {
        this.assertSingleInstance();
        DataDeduplicationService.instance = new DataDeduplicationService(deduplicator);
    }
    static getInstance() {
        this.assertInstance();
        return DataDeduplicationService.instance;
    }
    async checkProcessedItemsAndRecord(propertyName, items, scope, contextData, options) {
        this.assertDeduplicator();
        let value;
        const itemLookup = items.reduce((acc, cur, index) => {
            value = JSON.stringify((0, get_1.default)(cur, propertyName));
            acc[value ? value.toString() : ''] = index;
            return acc;
        }, {});
        const checkedItems = await this.deduplicator.checkProcessedAndRecord(Object.keys(itemLookup), scope, contextData, options);
        return {
            new: checkedItems.new.map((key) => items[itemLookup[key]]),
            processed: checkedItems.processed.map((key) => items[itemLookup[key]]),
        };
    }
    async checkProcessedAndRecord(items, scope, contextData, options) {
        this.assertDeduplicator();
        return await this.deduplicator.checkProcessedAndRecord(items, scope, contextData, options);
    }
    async removeProcessed(items, scope, contextData, options) {
        this.assertDeduplicator();
        return await this.deduplicator.removeProcessed(items, scope, contextData, options);
    }
    async clearAllProcessedItems(scope, contextData, options) {
        this.assertDeduplicator();
        return await this.deduplicator.clearAllProcessedItems(scope, contextData, options);
    }
    async getProcessedDataCount(scope, contextData, options) {
        this.assertDeduplicator();
        return await this.deduplicator.getProcessedDataCount(scope, contextData, options);
    }
}
exports.DataDeduplicationService = DataDeduplicationService;
//# sourceMappingURL=data-deduplication-service.js.map