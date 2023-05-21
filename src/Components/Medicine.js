import React from 'react'
import ExpenseTable from './ExpenseTable'


function Medicine({data}) {
    return (
        <div className='p-2'>
            <h1 className='text-3xl font-semibold mb-5'>Medicine</h1>
            <ExpenseTable tableData={data} />
        </div>
    )
}

export default Medicine