import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import formatError from "../../utils/formatError";

const getBalSchema = Joi.object({
  page: Joi.number().min(1),
  limit: Joi.number().min(1)
});

async function getAllBalanceValidator(req: Request, res: Response, next: NextFunction) {
  try {
    await getBalSchema.validateAsync(req.query, { abortEarly: false})
    next()
  } catch (error: any) {
    const errorRes = formatError(error.details)
    res.status(400).json(errorRes);
    // Without formatError
    // OR res.status(400).send(error.details[0].message)
  };
}


export default getAllBalanceValidator;