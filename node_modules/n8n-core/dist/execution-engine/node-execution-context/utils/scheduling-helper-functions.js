"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchedulingFunctions = void 0;
const di_1 = require("@n8n/di");
const scheduled_task_manager_1 = require("../../scheduled-task-manager");
const getSchedulingFunctions = (workflowId, timezone, nodeId) => {
    const scheduledTaskManager = di_1.Container.get(scheduled_task_manager_1.ScheduledTaskManager);
    return {
        registerCron: ({ expression, recurrence }, onTick) => {
            const ctx = {
                expression,
                recurrence,
                nodeId,
                workflowId,
                timezone,
            };
            return scheduledTaskManager.registerCron(ctx, onTick);
        },
    };
};
exports.getSchedulingFunctions = getSchedulingFunctions;
//# sourceMappingURL=scheduling-helper-functions.js.map