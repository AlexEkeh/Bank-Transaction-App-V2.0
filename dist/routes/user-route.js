"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user-controller");
const validate_register_1 = __importDefault(require("../middlewares/validator/validate-register"));
const validate_login_1 = __importDefault(require("../middlewares/validator/validate-login"));
const authenticate_1 = __importDefault(require("../middlewares/authenticator/authenticate"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// REGISTER USER
router.post('/register', validate_register_1.default, user_controller_1.registerUser);
// LOGIN USER
router.post('/login', validate_login_1.default, user_controller_1.loginUser);
// LOGOUT USER
router.get('/logout', authenticate_1.default, user_controller_1.logoutUser);
exports.default = router;
