import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { useRouter } from "next/router";
import { useSession } from 'next-auth/react'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddExpense({ stddataid }) {



    const router = useRouter();


    const [open, setOpen] = useState(false);
    const [ExpenseName, setExpenseName] = useState('');
    const [expenseCategory, setExpenseCategory] = useState('Utility Bills');
    const [expenseAmount, setexpenseAmount] = useState("")


    const { data: session, status } = useSession()



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function AddExpenseHandler() {
        let payload = {
            expenseName: ExpenseName,
            expenseCategory: expenseCategory,
            expenseAmount: expenseAmount,
            userEmail: session.user.email,
        }

        console.log(payload)

        axios.post('/api/CreateExpense', payload)
            .then(function (response) {
                console.log(response)
                setOpen(false);
            })
            .catch(function (error) {
                console.log(error.response);
            });




    }

    return (
        <div>
            <button onClick={handleClickOpen} className='bg-blue-600 text-white px-10 py-3 rounded-lg'> + <span className='sm:hidden md:hidden lg:inline-block'>  Add Expense </span></button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                maxWidth="xl"
                fullScreen={true}
            >
                <DialogTitle>
                    <div className='flex   justify-between'>
                        <h1 className='text-xl'>Add Expense</h1>
                        <button onClick={handleClose}>x</button>

                    </div>
                </DialogTitle>



                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" component="span">

                        <div className='grid grid-cols-1 gap-5'>
                            <div className='flex flex-col  '>
                                <label htmlFor="name">Expense Name</label>
                                <input required value={ExpenseName} onChange={(e) => setExpenseName(e.target.value)} type="text" name="Expensename" id="Expensename" placeholder='Expense Name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            </div>


                            <div className='flex flex-col'>
                                <label htmlFor="ExpenseCategory" >Expense Category</label>
                                <select value={expenseCategory} onChange={(e) => setExpenseCategory(e.target.value)} id="ExpenseCategory" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="Utility Bills">Utility Bills</option>
                                    <option value="Medicine">Medicine</option>
                                    <option value="Family Support">Family Support</option>
                                    <option value="Loan">Loan</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>




                            <div className='flex flex-col  '>
                                <label> Expense Amount</label>
                                <input type="number" required value={expenseAmount} onChange={(e) => setexpenseAmount(e.target.value)} name="expenseAmount" id="expenseAmount" placeholder='Expense Amount ' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            </div>

                            <button onClick={AddExpenseHandler} className='bg-blue-600 px-3 py-2 rounded text-white'>Add Expense</button>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}