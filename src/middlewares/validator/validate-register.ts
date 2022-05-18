import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import formatError from "../../utils/formatError";


const RegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().min(6).required(),
  password: Joi.string().min(6).alphanum().required()
});


async function registerValidator(req: Request, res: Response, next: NextFunction) {
  try {
    await RegisterSchema.validateAsync(req.body, { abortEarly: false})
    next()
  } catch (error: any) {
    const errorRes = formatError(error.details)
    res.status(400).json(errorRes);
     // Without formatError
    // OR res.status(400).send(error.details[0].message)
  };
}


export default registerValidator;