"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const balance_controller_1 = require("../controllers/balance-controller");
const validate_all_balance_1 = __importDefault(require("../middlewares/validator/validate-all-balance"));
const validate_create_account_1 = __importDefault(require("../middlewares/validator/validate-create-account"));
const authenticate_1 = __importDefault(require("../middlewares/authenticator/authenticate"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// GET ALL ACCOUNTS AND THEIR BALANCE
router.get('/balance', authenticate_1.default, validate_all_balance_1.default, balance_controller_1.getAllBalance);
// GET BALANCE FOR A PARTICULAR ACCOUNT NUMBER
router.get('/balance/:accNo', authenticate_1.default, balance_controller_1.getSingleBalance);
// ENABLE A USER TO CREATE AN ACCOUNT
router.post('/create', authenticate_1.default, validate_create_account_1.default, balance_controller_1.createAccount);
exports.default = router;
