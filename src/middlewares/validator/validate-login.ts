import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import formatError from "../../utils/formatError";


const LoginSchema = Joi.object({
  email: Joi.string().email().min(6).required(),
  password: Joi.string().min(6).required()
});


async function loginValidator(req: Request, res: Response, next: NextFunction) {
  try {
    await LoginSchema.validateAsync(req.body, { abortEarly: false})
    next()
  } catch (error: any) {
    const errorRes = formatError(error.details)
    res.status(400).json(errorRes);
       // Without formatError
    // OR res.status(400).send(error.details[0].message)
  };
}


export default loginValidator;