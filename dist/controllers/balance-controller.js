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
exports.createAccount = exports.getSingleBalance = exports.getAllBalance = void 0;
const balance_model_1 = __importDefault(require("../models/balance-model"));
// GET ALL BALANCES IN THE DATABASE
const getAllBalance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contents = yield balance_model_1.default.find();
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
        const result = contents.slice(startIndex, endIndex);
        function prev() {
            if (startIndex > 0) {
                return page - 1;
            }
        }
        function next() {
            if (endIndex < contents.length) {
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
exports.getAllBalance = getAllBalance;
// GET A BALANCE DETAILS BY UNIQUE ACCOUNT NUMBER
const getSingleBalance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let accNo = req.params.accNo;
    try {
        const content = yield balance_model_1.default.findOne({ accountNo: accNo });
        if (!content) {
            res.status(404).json({ error: "Account number does not exist!" });
        }
        else {
            res.status(200).json(content);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getSingleBalance = getSingleBalance;
// 10-DIGIT ACCOUNT NUMBER GENERATOR FUNCTION
function accountNoGenerator() {
    const result = Math.floor(Math.random() * 9000000000) + 1000000000;
    return result;
}
// CREATE NEW ACCOUNT
const createAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount } = req.body;
    try {
        const content = new balance_model_1.default({
            accountNo: accountNoGenerator(),
            amount,
        });
        const accountInfo = yield content.save();
        if (!accountInfo) {
            res.status(500).json({ error: "Error creating account...Pls try again!" });
        }
        else {
            res.status(201).json(accountInfo);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.createAccount = createAccount;
