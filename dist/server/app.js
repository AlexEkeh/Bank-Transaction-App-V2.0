"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const balance_route_1 = __importDefault(require("../routes/balance-route"));
const transaction_route_1 = __importDefault(require("../routes/transaction-route"));
const user_route_1 = __importDefault(require("../routes/user-route"));
const db_config_1 = __importDefault(require("../config/db-config"));
const cors = require('cors');
const app = (0, express_1.default)();
// ENVIRONMENTAL VARIABLES
const port = process.env.PORT || 3000;
dotenv_1.default.config();
(0, db_config_1.default)();
// MIDDLEWARES
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors());
app.use((0, cookie_parser_1.default)());
// MAIN APPLICATION
app.use('/', balance_route_1.default);
app.use('/', transaction_route_1.default);
app.use('/user', user_route_1.default);
app.use((err, _req, res, _next) => {
    res.status(err.status || 500).send(err.message || 'Something went wrong');
});
exports.default = app;
