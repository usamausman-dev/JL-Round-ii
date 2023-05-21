import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
    username: String,
    email: String,
    password: String
})

const Users = models.user || model('user', userSchema);
export default Users

const expenseSchema = new Schema({
    expenseName: {
        type: String,
        required: true,
    },
    expenseCategory: {
        type: String,
        required: true,
    },
    expenseAmount: {
        type: Number,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
});

export const Expense = models.Expense || model('Expense', expenseSchema);



const userProfileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salary: {
    type: Number,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserProfile = models.UserProfile || model('UserProfile', userProfileSchema);

// const budgetSchema = new Schema({
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     category: {
//       type: String,
//       required: true,
//     },
//     allocatedAmount: {
//       type: Number,
//       required: true,
//     },
//     spentAmount: {
//       type: Number,
//       default: 0,
//     },
//   });

//   export const BudgetMng = models.BudgetMng || model('BudgetMng', budgetSchema);


//   const transactionSchema = new mongoose.Schema({
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     category: {
//       type: String,
//       required: true,
//     },
//     amount: {
//       type: Number,
//       required: true,
//     },
//     date: {
//       type: Date,
//       default: Date.now,
//     },
//   });

//   export const Trans = models.BudgetMng || model('BudgetMng', transactionSchema);

  
  
//   const goalSchema = new mongoose.Schema({
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     amount: {
//       type: Number,
//       required: true,
//     },
//     targetDate: {
//       type: Date,
//       required: true,
//     },
//   });



