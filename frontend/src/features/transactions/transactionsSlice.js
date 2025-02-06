import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch transactions
export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    async (month) => {
        const response = await axios.get(`http://localhost:5000/api/transactions?month=${month}`);
        return response.data;
    }
);

// Async thunk to fetch bar chart data
export const fetchBarChartData = createAsyncThunk(
    'transactions/fetchBarChartData',
    async (month) => {
        const response = await axios.get(`http://localhost:8082/api/bar-chart?month=${month}`);
        return response.data;
    }
);

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactions: [],
        barChartData: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.transactions = action.payload.transactions;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchBarChartData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBarChartData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.barChartData = action.payload;
            })
            .addCase(fetchBarChartData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default transactionsSlice.reducer;