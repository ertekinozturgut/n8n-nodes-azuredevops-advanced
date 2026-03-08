"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyInputItems = copyInputItems;
const n8n_workflow_1 = require("n8n-workflow");
function copyInputItems(items, properties) {
    return items.map((item) => {
        const newItem = {};
        for (const property of properties) {
            if (item.json[property] === undefined) {
                newItem[property] = null;
            }
            else {
                newItem[property] = (0, n8n_workflow_1.deepCopy)(item.json[property]);
            }
        }
        return newItem;
    });
}
//# sourceMappingURL=copy-input-items.js.map