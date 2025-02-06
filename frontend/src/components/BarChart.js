import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBarChartData } from '../features/transactions/transactionsSlice';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const dispatch = useDispatch();
    const { barChartData, status, error } = useSelector((state) => state.transactions);
    const [month, setMonth] = React.useState(3); // Default to March

    useEffect(() => {
        dispatch(fetchBarChartData(month));
    }, [month, dispatch]);

    const handleMonthChange = (e) => {
        setMonth(parseInt(e.target.value));
    };

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    const data = {
        labels: barChartData.map((item) => item.range),
        datasets: [
            {
                label: 'Number of Items',
                data: barChartData.map((item) => item.count),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Transactions Bar Chart</h2>
            <label>
                Select Month:
                <select value={month} onChange={handleMonthChange}>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {new Date(0, i).toLocaleString('default', { month: 'long' })}
                        </option>
                    ))}
                </select>
            </label>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;