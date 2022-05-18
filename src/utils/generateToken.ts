import jwt from 'jsonwebtoken';


const generateToken = (id: any) => {
    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign({ id }, secret, { expiresIn: "1h"});
    return token;
}


export default generateToken;
