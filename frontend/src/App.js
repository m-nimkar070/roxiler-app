import React, { useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import BarChart from './components/BarChart';
import './App.css';
import StatsTable from './components/StatsTable';

function App() {
    const [month , setMonth] = useState(3);

    const handleMonthChange = (e)=>{
        setMonth(parseInt(e.target.value));
    }
    return (
        <div className="App">
            <h1>Dashboard</h1>
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
            <TransactionsTable month={month}/>
            <BarChart month={month}/>
            <StatsTable month={month} />
        </div>
    );
}

export default App;