"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_controller_1 = require("../controllers/transaction-controller");
const validate_all_transaction_1 = __importDefault(require("../middlewares/validator/validate-all-transaction"));
const validate_transfer_1 = __importDefault(require("../middlewares/validator/validate-transfer"));
const authenticate_1 = __importDefault(require("../middlewares/authenticator/authenticate"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// GET SINGLE TRANSACTION
router.get('/transaction/:refId', authenticate_1.default, transaction_controller_1.getSingleTransaction);
// GET ALL TRANSACTIONS
router.get('/transaction', authenticate_1.default, validate_all_transaction_1.default, transaction_controller_1.getAllTransaction);
// MAKE A TRANSFER TRANSACTION TO ANOTHER ACCOUNT
router.post('/transfer', authenticate_1.default, validate_transfer_1.default, transaction_controller_1.transfer);
exports.default = router;
