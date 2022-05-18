import { getAllBalance, getSingleBalance, createAccount } from '../controllers/balance-controller';
import getAllBalanceValidator from '../middlewares/validator/validate-all-balance';
import createAccountValidator from '../middlewares/validator/validate-create-account';
import userAuthenticator from '../middlewares/authenticator/authenticate';
import express from 'express';
const router = express.Router();



// GET ALL ACCOUNTS AND THEIR BALANCE
router.get('/balance', userAuthenticator, getAllBalanceValidator, getAllBalance);

// GET BALANCE FOR A PARTICULAR ACCOUNT NUMBER
router.get('/balance/:accNo', userAuthenticator, getSingleBalance);

// ENABLE A USER TO CREATE AN ACCOUNT
router.post('/create', userAuthenticator, createAccountValidator, createAccount);




export default router;