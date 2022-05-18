import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import formatError from "../../utils/formatError";


const createAccountSchema = Joi.object({
  amount: Joi.number().greater(-1).required()
});

async function createAccountValidator(req: Request, res: Response, next: NextFunction) {
 
  try {
    await createAccountSchema.validateAsync(req.body, { abortEarly: false})
    next()
  } catch(error: any) {
    const errorRes = formatError(error.details)
    res.status(400).json(errorRes);
     // Without formatError
    // OR res.status(400).send(error.details[0].message)
  }
}

export default createAccountValidator;