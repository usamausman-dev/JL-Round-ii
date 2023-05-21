import React from 'react'

function ExpenseTable(tableData) {
    // console.log("Yeh arha ha", tableData.tableData)
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Expense Name
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>

                    </tr>
                </thead>
                <tbody>

                    {
                        tableData.tableData.length > 0 && tableData.tableData.map((val, key) =>
                            <tr key={key} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {val.expenseName}
                                </th>
                                <td className="px-6 py-4">
                                    {val.expenseCategory}
                                </td>
                                <td className="px-6 py-4">
                                    {val.expenseAmount}
                                </td>
                                <td className="px-6 py-4">
                                    {val.createdAt}
                                </td>

                            </tr>
                        )
                    }


                </tbody>
            </table>
        </div>
    )
}

export default ExpenseTable