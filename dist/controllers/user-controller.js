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
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const user_model_1 = __importDefault(require("../models/user-model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// REGISTER A USER
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the User is already in the database
    const userExist = yield user_model_1.default.findOne({ email: req.body.email });
    if (userExist) {
        return res.status(400).json({
            error: 'Email already exist...Please Login!'
        });
    }
    // Hash/Encrypt User Password
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, salt);
    // Create a new user
    const user = new user_model_1.default({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        // Save a new user
        const savedUser = yield user.save();
        res.status(200).json(savedUser);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.registerUser = registerUser;
//LOGIN A USER
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const maxAge = 1 * 24 * 60 * 60 * 1000;
    const { email, password } = req.body;
    try {
        // Check if the User is already in the database
        const user = yield user_model_1.default.findOne({ email });
        if (!user)
            return res.status(404).json({
                error: 'Email not found...Pls register a new account!'
            });
        //Check for correct password
        const validPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!validPassword)
            return res.status(400).json({
                error: 'Invalid Password...Pls try again!'
            });
        // Generate Token After Successfull Validation and Send Token To User Browser
        const token = (0, generateToken_1.default)(user._id);
        res.cookie('jwt', token, {
            httpOnly: true, maxAge
        });
        // Send Token With A Success Message
        res.status(200).json({
            status: 'Success',
            email,
            token: (0, generateToken_1.default)(user._id)
        });
    }
    catch (error) {
        return res.status(400).json({ error: "Invalid login credentials...Pls try again!" });
    }
});
exports.loginUser = loginUser;
//LOGOUT A USER
const logoutUser = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('jwt');
        return res.status(200).json({
            message: 'Logout successful!'
        });
    }
    catch (error) {
        return res.status(400).json({ error: "An error occured...Pls try again!" });
    }
});
exports.logoutUser = logoutUser;
