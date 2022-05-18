"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// BALANCE SCHEMA
const BalanceSchema = new mongoose_1.Schema({
    accountNo: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});
// BALANCE MODEL
const Balance = (0, mongoose_1.model)('Balance', BalanceSchema);
exports.default = Balance;
