import React from 'react'
import ExpenseTable from './ExpenseTable'


function Loan({data}) {
    return (
        <div className='p-2'>
        <h1 className='text-3xl font-semibold mb-5'>Loan</h1>
        <ExpenseTable tableData={data} />
    </div>
    )
}

export default Loan