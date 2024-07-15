import React from 'react'
import { Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Loading from '../Loading/Loading';

const Chart = () => {
    const customerData = useSelector(store => store.customersReducer)


    let data = customerData?.userCart
    if (!data) return <div className='container bg-[#FAFFAF] rounded-lg my-7'>
        <h1 className='text-center' >
            You Should Select a customer to show his chart
        </h1>
    </div>


    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );
    const aggregatedData = data?.reduce((acc, transaction) => {
        const date = transaction.date;
        if (!acc[date]) {
            acc[date] = 0;
        }
        acc[date] += transaction.amount;
        return acc;
    }, {});


    const chartData = {
        labels: Object.keys(aggregatedData),
        datasets: [
            {
                label: 'Transactions Amount',
                data: Object.values(aggregatedData),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `This Chart belongs to customer: ${data.name}`,
            },
        },
    };




    return (
        <div id='char' className='container bg-[#FAFFAF] rounded-lg my-7'>
            {
                !data ? "" : <Line className='w-full' data={chartData} options={options} />

            }

        </div>
    )
}

export default Chart
