import { Request, Response, NextFunction } from "express";
import Balance from "../models/balance-model";

// GET ALL BALANCES IN THE DATABASE
const getAllBalance = async ( req: Request, res: Response, next: NextFunction ) => {

  try {

    const contents = await Balance.find();

    // PAGINATION BEGINS

    let page = Number(req.query.page);
    let limit = Number(req.query.limit);

    // Default Behaviour If No Pagination Queries Are Set
    if (!page) {
      page = 1
    }

    if (!limit) {
      limit = 10
    }

    // Customized Behaviour If Pagination Queries Are Set
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = contents.slice(startIndex, endIndex);

    function prev() {
      if (startIndex > 0) {
        return page - 1;
      }
    }

    function next() {
      if (endIndex < contents.length) {
        return page + 1;
      }
    }

    // PAGINATION ENDS

    res.status(200).json({
      previous: prev() || 0,
      next: next() || 0,
      data: result
    });

  } catch (error) {
    next(error);
  }
};


// GET A BALANCE DETAILS BY UNIQUE ACCOUNT NUMBER
const getSingleBalance = async ( req: Request, res: Response, next: NextFunction ) => {

  let accNo = req.params.accNo;

  try {

    const content = await Balance.findOne({ accountNo: accNo });

    if (!content) {
      res.status(404).json({ error: "Account number does not exist!" });
    } else {
      res.status(200).json(content);
    }

  } catch (error) {
    next(error);
  }

};


// 10-DIGIT ACCOUNT NUMBER GENERATOR FUNCTION
function accountNoGenerator() {
  const result = Math.floor(Math.random() * 9000000000) + 1000000000;
  return result;
}


// CREATE NEW ACCOUNT
const createAccount = async ( req: Request, res: Response, next: NextFunction ) => {

  const { amount } = req.body

  try {

    const content = new Balance({
      accountNo: accountNoGenerator(),
      amount,
    });
        
    const accountInfo = await content.save();

      if (!accountInfo) {
        res.status(500).json({ error: "Error creating account...Pls try again!" });
      } else {
       res.status(201).json(accountInfo);
      }
             
  } catch (error) {
    next(error);
  }
};



export { getAllBalance, getSingleBalance, createAccount };
