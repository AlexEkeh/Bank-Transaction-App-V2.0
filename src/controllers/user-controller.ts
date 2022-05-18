import { Request, Response, NextFunction } from "express";
import generateToken from "../utils/generateToken";
import User from "../models/user-model";
import bcrypt from 'bcryptjs';



// REGISTER A USER
const registerUser = async (req: Request, res: Response, next: NextFunction) => {

    // Check if the User is already in the database
    const userExist = await User.findOne({email: req.body.email});

    if (userExist) {
        return res.status(400).json({
            error: 'Email already exist...Please Login!'
        });
    }

    // Hash/Encrypt User Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
   const user = new User({
       name: req.body.name,
       email: req.body.email,
       password: hashedPassword
   });

   try {
       // Save a new user
       const savedUser = await user.save();
       res.status(200).json(savedUser);

   } catch(error) {
        res.status(500).send(error)
   }
}



//LOGIN A USER
const loginUser = async (req: Request, res: Response, next: NextFunction) => {

const maxAge = 1 * 24 * 60 * 60 * 1000;

const { email, password } = req.body;

try {
  
    // Check if the User is already in the database
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({
            error: 'Email not found...Pls register a new account!' 
    })

    //Check for correct password
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) return res.status(400).json({
            error: 'Invalid Password...Pls try again!'
    });

     // Generate Token After Successfull Validation and Send Token To User Browser
     const token = generateToken(user._id);
     
     res.cookie('jwt', token, {
         httpOnly: true, maxAge
     });


    // Send Token With A Success Message
    res.status(200).json({
        status: 'Success',
        email,
        token: generateToken(user._id)
    })

} catch (error) {
        return res.status(400).json({ error: "Invalid login credentials...Pls try again!" })
    }
}


//LOGOUT A USER
const logoutUser = async (_req: Request, res: Response, next: NextFunction) => {

        try {
            res.clearCookie('jwt');
            return res.status(200).json({
                message: 'Logout successful!'
            })
        } catch(error) {
            return res.status(400).json({ error: "An error occured...Pls try again!" })
        }

}


export {
    registerUser,
    loginUser,
    logoutUser
}