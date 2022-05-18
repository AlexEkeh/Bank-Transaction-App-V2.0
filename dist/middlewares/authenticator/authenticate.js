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
const user_model_1 = __importDefault(require("../../models/user-model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userAuthenticator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.jwt;
    const secret = process.env.JWT_SECRET;
    if (!token) {
        return res.status(401).json({
            error: 'Not Authorized...Pls login!'
        });
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, secret);
        const user = yield user_model_1.default.findById(verified.id).select('-password');
        if (!user) {
            return res.status(401).json({
                error: 'Not Authorized...Pls login!'
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
});
exports.default = userAuthenticator;
