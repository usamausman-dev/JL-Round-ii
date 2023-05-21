import React from 'react'
import ExpenseTable from './ExpenseTable'


function FamilySupport({data}) {
    return (
        <div className='p-2'>
            <h1 className='text-3xl font-semibold mb-5'>Family Support</h1>
            <ExpenseTable tableData={data} />
        </div>
    )
}

export default FamilySupport