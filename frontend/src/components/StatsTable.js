import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatsData } from '../features/transactions/transactionsSlice';

const StatsTable = ({month}) => {
    const dispatch = useDispatch();
    const { statsData, status, error } = useSelector((state) => state.transactions);
    // const [month, setMonth] = React.useState(3); // Default to March

    useEffect(() => {
        dispatch(fetchStatsData(month));
    }, [month, dispatch]);

    // const handleMonthChange = (e) => {
    //     setMonth(parseInt(e.target.value));
    // };

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;
  return (
    <div>
      <h1>Stats Data Table</h1>
      <div className='flex '>
        <div >
            <p><span>Total Transacrion Amount:</span> {statsData.totalSaleAmount} </p>
        </div>
        <div>
            <p><span>Total Item Sold:</span> {statsData.totalSoldItems} </p>
        </div><div>
            <p><span>Total Item Remaining:</span> {statsData.totalNotSoldItems} </p>
        </div>
      </div>
    </div>
  )
}

export default StatsTable
