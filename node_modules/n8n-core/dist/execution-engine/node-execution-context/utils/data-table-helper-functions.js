"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataTableHelperFunctions = getDataTableHelperFunctions;
function getDataTableHelperFunctions(additionalData, workflow, node) {
    const dataTableProxyProvider = additionalData['data-table']?.dataTableProxyProvider;
    if (!dataTableProxyProvider)
        return {};
    return {
        getDataTableAggregateProxy: async () => await dataTableProxyProvider.getDataTableAggregateProxy(workflow, node, additionalData.dataTableProjectId),
        getDataTableProxy: async (dataTableId) => await dataTableProxyProvider.getDataTableProxy(workflow, node, dataTableId, additionalData.dataTableProjectId),
    };
}
//# sourceMappingURL=data-table-helper-functions.js.map