"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeduplicationHelperFunctions = void 0;
const data_deduplication_service_1 = require("../../../data-deduplication-service");
async function checkProcessedAndRecord(items, scope, contextData, options) {
    return await data_deduplication_service_1.DataDeduplicationService.getInstance().checkProcessedAndRecord(items, scope, contextData, options);
}
async function checkProcessedItemsAndRecord(key, items, scope, contextData, options) {
    return await data_deduplication_service_1.DataDeduplicationService.getInstance().checkProcessedItemsAndRecord(key, items, scope, contextData, options);
}
async function removeProcessed(items, scope, contextData, options) {
    return await data_deduplication_service_1.DataDeduplicationService.getInstance().removeProcessed(items, scope, contextData, options);
}
async function clearAllProcessedItems(scope, contextData, options) {
    return await data_deduplication_service_1.DataDeduplicationService.getInstance().clearAllProcessedItems(scope, contextData, options);
}
async function getProcessedDataCount(scope, contextData, options) {
    return await data_deduplication_service_1.DataDeduplicationService.getInstance().getProcessedDataCount(scope, contextData, options);
}
const getDeduplicationHelperFunctions = (workflow, node) => ({
    async checkProcessedAndRecord(items, scope, options) {
        return await checkProcessedAndRecord(items, scope, { node, workflow }, options);
    },
    async checkProcessedItemsAndRecord(propertyName, items, scope, options) {
        return await checkProcessedItemsAndRecord(propertyName, items, scope, { node, workflow }, options);
    },
    async removeProcessed(items, scope, options) {
        return await removeProcessed(items, scope, { node, workflow }, options);
    },
    async clearAllProcessedItems(scope, options) {
        return await clearAllProcessedItems(scope, { node, workflow }, options);
    },
    async getProcessedDataCount(scope, options) {
        return await getProcessedDataCount(scope, { node, workflow }, options);
    },
});
exports.getDeduplicationHelperFunctions = getDeduplicationHelperFunctions;
//# sourceMappingURL=deduplication-helper-functions.js.map