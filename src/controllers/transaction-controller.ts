import { Request, Response, NextFunction } from "express";
import { v4 as uuid4 } from "uuid";
import Balance from "../models/balance-model";
import Transaction from "../models/transaction-model";


// GET SINGLE TRANSACTION

const getSingleTransaction = async (req: Request, res: Response, next: NextFunction) => {

  try {

    const transaction = await Transaction.findOne({ reference: req.params.refId });

    if (!transaction) {
      res.status(404).json({
        message: "Transaction not found...Pls try again!"
      })
    } else {
      res.status(200).json(transaction)
    }

  } catch(error) {
    next(error)
  }

}


// GET ALL TRANSACTIONS MADE SO FAR

const getAllTransaction = async ( req: Request, res: Response, next: NextFunction ) => {

  try {
    
    const transactions = await Transaction.find();

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

    const result = transactions.slice(startIndex, endIndex);

    function prev() {
      if (startIndex > 0) {
        return page - 1;
      }
    }

    function next() {
      if (endIndex < transactions.length) {
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



// TRANSFER FUNDS
const transfer = async (req: Request, res: Response, next: NextFunction) => {

    try {

      interface Transfer {
        reference: string;
        senderAccount: string;
        receiverAccount: string;
        amount: number;
        transferDescription: string;
        createdAt: String;
      }
  
      const { senderAccount, receiverAccount, amount } = req.body;
  
      let sender = await Balance.findOne({ accountNo: senderAccount });
      let receiver = await Balance.findOne({ accountNo: receiverAccount });
  
  
      // EXTRA VALIDATION
      if (!sender) {
        res.status(404).json({ message: 'Sender account number does not exist...Pls try again!' }); 
      } else if (!receiver) {
        res.status(404).json({ message: 'Receiver account number does not exist...Pls try again!' }); 
      } else if (amount > sender.amount) {
        res.status(400).json({ message: `Insufficient Funds!` }); 
      } else {
  
        let senderNewBal = sender.amount - amount;
        let receiverNewBal = receiver.amount + amount;
  
        await Balance.findOneAndUpdate(
          { accountNo: senderAccount },
          { amount: senderNewBal },
          { new: true }
        )
        
        await Balance.findOneAndUpdate(
          { accountNo: receiverAccount },
          { amount: receiverNewBal },
          { new: true }
        )
  
        const padSenderAccount = String(senderAccount).replace(/.{5}/, "****");
  
        const content: Transfer = {
          reference: uuid4(),
          senderAccount,
          receiverAccount,
          amount,
          transferDescription: `Debit Transaction: N${amount} Transferred from ${padSenderAccount}. Bal: N${senderNewBal}`,
          createdAt: new Date().toISOString(),
        };
  
        const transactionData = await Transaction.create(content);
        // OR const transactionData = await new Transaction(content).save();
        
        if (!transactionData) {
          res.status(500).json({ message: "An error ocurred while making transfer...Pls try again!" });
        }
        res.status(200).json(transactionData);
      }
    } catch (error) {
      next(error);
    }
  };



  export {
    getSingleTransaction,
    getAllTransaction,
    transfer
  } 