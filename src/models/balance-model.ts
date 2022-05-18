import { Schema, model } from 'mongoose';



// BALANCE SCHEMA
const BalanceSchema = new Schema({
  accountNo: {
      type: String
    },
  amount: {
      type: Number,
      required: true
    }
  }, {
  timestamps: true
});


// BALANCE MODEL
const Balance = model('Balance', BalanceSchema);



export default Balance;


