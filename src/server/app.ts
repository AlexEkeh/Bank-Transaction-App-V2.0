import express, { Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import balanceRouter from '../routes/balance-route';
import transactionRouter from '../routes/transaction-route';
import userRouter from '../routes/user-route';
import connectDB from '../config/db-config';
const cors = require ('cors');
const app = express();


declare module 'express' {
    export interface Request {
      user?: any;
    }
}


// ENVIRONMENTAL VARIABLES
const port = process.env.PORT || 3000;

dotenv.config();
connectDB();


// MIDDLEWARES
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());


// MAIN APPLICATION
app.use('/', balanceRouter);
app.use('/', transactionRouter);
app.use('/user', userRouter);



app.use((
    err: any, 
    _req: Request, 
    res: Response, 
    _next: NextFunction
    ) => {
    res.status(err.status || 500).send(err.message || 'Something went wrong');
});



export default app;
