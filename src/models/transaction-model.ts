import { Schema, model } from 'mongoose';


// TRANSACTION SCHEMA
const TransactionSchema = new Schema({
   reference: String,
   senderAccount: {
        type: String,
        required: true
    },
    receiverAccount: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transferDescription: String,
    createdAt:  String
})



// TRANSACTION MODEL
const Transaction = model('Transaction', TransactionSchema);



export default Transaction;

