import { registerUser, loginUser, logoutUser } from '../controllers/user-controller';
import registerValidator from '../middlewares/validator/validate-register';
import loginValidator from '../middlewares/validator/validate-login';
import userAuthenticator from '../middlewares/authenticator/authenticate';
import express from 'express';
const router = express.Router();


// REGISTER USER
router.post('/register', registerValidator, registerUser)

// LOGIN USER
router.post('/login', loginValidator, loginUser);

// LOGOUT USER
router.get('/logout', userAuthenticator, logoutUser)



export default router;