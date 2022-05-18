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
const joi_1 = __importDefault(require("joi"));
const formatError_1 = __importDefault(require("../../utils/formatError"));
const LoginSchema = joi_1.default.object({
    email: joi_1.default.string().email().min(6).required(),
    password: joi_1.default.string().min(6).required()
});
function loginValidator(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield LoginSchema.validateAsync(req.body, { abortEarly: false });
            next();
        }
        catch (error) {
            const errorRes = (0, formatError_1.default)(error.details);
            res.status(400).json(errorRes);
            // Without formatError
            // OR res.status(400).send(error.details[0].message)
        }
        ;
    });
}
exports.default = loginValidator;
