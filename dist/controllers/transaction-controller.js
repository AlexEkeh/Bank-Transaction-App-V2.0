"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfer = exports.getAllTransaction = exports.getSingleTransaction = void 0;
const uuid_1 = require("uuid");
const balance_model_1 = __importDefault(require("../models/balance-model"));
const transaction_model_1 = __importDefault(require("../models/transaction-model"));
// GET SINGLE TRANSACTION
const getSingleTransaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = yield transaction_model_1.default.findOne({ reference: req.params.refId });
        if (!transaction) {
            res.status(404).json({
                message: "Transaction not found...Pls try again!"
            });
        }
        else {
            res.status(200).json(transaction);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getSingleTransaction = getSingleTransaction;
// GET ALL TRANSACTIONS MADE SO FAR
const getAllTransaction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield transaction_model_1.default.find();
        // PAGINATION BEGINS
        let page = Number(req.query.page);
        let limit = Number(req.query.limit);
        // Default Behaviour If No Pagination Queries Are Set
        if (!page) {
            page = 1;
        }
        if (!limit) {
            limit = 10;
        }
        // Customized Behaviour If Pagination Queries Are Set
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const result = transactions.slice(startIndex, endIndex);
        function prev() {
            if (startIndex > 0) {
                return page - 1;
            }
        }
        function next() {
            if (endIndex < transactions.length) {
                return page + 1;
            }
        }
        // PAGINATION ENDS
        res.status(200).json({
            previous: prev() || 0,
            next: next() || 0,
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllTransaction = getAllTransaction;
// TRANSFER FUNDS
const transfer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { senderAccount, receiverAccount, amount } = req.body;
        let sender = yield balance_model_1.default.findOne({ accountNo: senderAccount });
        let receiver = yield balance_model_1.default.findOne({ accountNo: receiverAccount });
        // EXTRA VALIDATION
        if (!sender) {
            res.status(404).json({ message: 'Sender account number does not exist...Pls try again!' });
        }
        else if (!receiver) {
            res.status(404).json({ message: 'Receiver account number does not exist...Pls try again!' });
        }
        else if (amount > sender.amount) {
            res.status(400).json({ message: `Insufficient Funds!` });
        }
        else {
            let senderNewBal = sender.amount - amount;
            let receiverNewBal = receiver.amount + amount;
            yield balance_model_1.default.findOneAndUpdate({ accountNo: senderAccount }, { amount: senderNewBal }, { new: true });
            yield balance_model_1.default.findOneAndUpdate({ accountNo: receiverAccount }, { amount: receiverNewBal }, { new: true });
            const padSenderAccount = String(senderAccount).replace(/.{5}/, "****");
            const content = {
                reference: (0, uuid_1.v4)(),
                senderAccount,
                receiverAccount,
                amount,
                transferDescription: `Debit Transaction: N${amount} Transferred from ${padSenderAccount}. Bal: N${senderNewBal}`,
                createdAt: new Date().toISOString(),
            };
            const transactionData = yield transaction_model_1.default.create(content);
            // OR const transactionData = await new Transaction(content).save();
            if (!transactionData) {
                res.status(500).json({ message: "An error ocurred while making transfer...Pls try again!" });
            }
            res.status(200).json(transactionData);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.transfer = transfer;
