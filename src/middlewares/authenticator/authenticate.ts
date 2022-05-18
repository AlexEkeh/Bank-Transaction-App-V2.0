import { Request, Response, NextFunction } from "express";
import User from '../../models/user-model';
import jwt from 'jsonwebtoken';



const userAuthenticator = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies.jwt;
    const secret = process.env.JWT_SECRET as string;

    if(!token) {
        return res.status(401).json({
            error: 'Not Authorized...Pls login!'
        })
    }

    try {
        const verified = jwt.verify(token, secret) as {id: string};
        const user  = await User.findById(verified.id).select('-password')

        if (!user) {
            return res.status(401).json({
                error: 'Not Authorized...Pls login!'
            })
        }

        req.user = user;

        next();

    } catch (error: any) {
        return res.status(400).json({
            error: error.message 
        })
    }
}


export default userAuthenticator