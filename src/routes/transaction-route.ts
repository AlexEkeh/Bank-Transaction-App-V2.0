import { getSingleTransaction, getAllTransaction, transfer } from '../controllers/transaction-controller';
import getAllTransactionValidator from '../middlewares/validator/validate-all-transaction';
import transferValidator from '../middlewares/validator/validate-transfer';
import userAuthenticator from '../middlewares/authenticator/authenticate';
import express from 'express';
const router = express.Router();


// GET SINGLE TRANSACTION
router.get('/transaction/:refId', userAuthenticator, getSingleTransaction)

// GET ALL TRANSACTIONS
router.get('/transaction', userAuthenticator, getAllTransactionValidator, getAllTransaction);

// MAKE A TRANSFER TRANSACTION TO ANOTHER ACCOUNT
router.post('/transfer', userAuthenticator, transferValidator, transfer);



export default router;
