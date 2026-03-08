"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const di_1 = require("@n8n/di");
const command_metadata_1 = require("./command-metadata");
const Command = ({ name, description, examples, flagsSchema }) => (target) => {
    const commandClass = target;
    di_1.Container.get(command_metadata_1.CommandMetadata).register(name, {
        description,
        flagsSchema,
        class: commandClass,
        examples,
    });
    return (0, di_1.Service)()(target);
};
exports.Command = Command;
//# sourceMappingURL=command.js.map