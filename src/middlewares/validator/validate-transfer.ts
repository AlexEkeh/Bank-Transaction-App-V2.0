import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import formatError from "../../utils/formatError";


const transferSchema = Joi.object({
  senderAccount: Joi.number().min(1).required(),
  receiverAccount: Joi.number().disallow(Joi.ref('senderAccount')).min(1).required(),
  amount: Joi.number().min(1).required()
});


async function transferValidator(req: Request, res: Response, next: NextFunction) {
  try {
    await transferSchema.validateAsync(req.body, { abortEarly: false})
    next()
  } catch (error: any) {
    const errorRes = formatError(error.details)
    res.status(400).json(errorRes);
     // Without formatError
    // OR res.status(400).send(error.details[0].message)
  };
}


export default transferValidator;