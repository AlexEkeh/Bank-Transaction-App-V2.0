"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// TRANSACTION SCHEMA
const TransactionSchema = new mongoose_1.Schema({
    reference: String,
    senderAccount: {
        type: String,
        required: true
    },
    receiverAccount: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transferDescription: String,
    createdAt: String
});
// TRANSACTION MODEL
const Transaction = (0, mongoose_1.model)('Transaction', TransactionSchema);
exports.default = Transaction;
