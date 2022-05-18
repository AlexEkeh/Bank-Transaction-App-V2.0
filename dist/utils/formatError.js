"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatError = (errors) => {
    errors.map((err) => {
        delete err.path;
        delete err.context;
        delete err.type;
    });
    return errors;
};
exports.default = formatError;
