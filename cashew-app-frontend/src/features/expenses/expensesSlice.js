import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchExpenses = createAsyncThunk('expenses/fetch', async () => {
  const res = await api.get('/expenses');
  return res.data;
});

export const addExpense = createAsyncThunk('expenses/add', async (expense) => {
  const res = await api.post('/expenses', expense);
  return res.data;
});

export const deleteExpense = createAsyncThunk('expenses/delete', async (id) => {
  await api.delete(`/expenses/${id}`);
  return id;
});

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => { state.loading = true; })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default expensesSlice.reducer;
export const selectAllExpenses = (state) => state.expenses.items;
export const selectExpensesLoading = (state) => state.expenses.loading;