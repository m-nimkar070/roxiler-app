import React from 'react';
import TransactionsTable from './components/TransactionsTable';
import BarChart from './components/BarChart';
import './App.css';

function App() {
    return (
        <div className="App">
            <h1>MERN Stack Challenge</h1>
            <TransactionsTable />
            <BarChart />
        </div>
    );
}

export default App;