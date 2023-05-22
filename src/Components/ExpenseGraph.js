import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
};

const labels = ['Utility Bills', 'Medicine', 'Family Support', 'Loan', 'Others'];







function ExpenseGraph() {

    const [graphLabels, setGraphLabels] = useState([]);
    const [graphAmount, setGraphAmount] = useState([])

    // let data = {
    //     graphLabels,
    //     datasets: [
    //         {
    //             label: 'Monthly Expense',
    //             data: [10, 20, 30],
    //             backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //         },

    //     ],
    // };


    useEffect(() => {
        axios.get('http://localhost:3000/api/GetAllExpense')
            .then(function (response) {
                // console.log(response)
                // setRestaurants(response.data.data)
                console.log(response.data.data)
                const myLabels = response.data.data.map(({ expenseCategory, ...rest }) => expenseCategory)
                const myAmount = response.data.data.map(({ expenseAmount, ...rest }) => expenseAmount)
                setGraphLabels(myLabels)
                setGraphAmount(myAmount)
            }).catch((e) => {
                console.log(e)
            })

    }, [])


    return (<>
        {
            graphLabels.length > 0 && <Bar options={options}

                data={
                    {
                        labels: graphLabels,
                        datasets: [
                            {
                                label: 'Monthly Expense',
                                data: graphAmount,
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            },

                        ],
                    }}

            />
        }

    </>


    )
}

export default ExpenseGraph