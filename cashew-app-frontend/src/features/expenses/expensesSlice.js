import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: [
    // temporary sample data so you have something to see
    { id: nanoid(), description: 'Groceries', amount: 54.2, category: 'Food', date: '2026-09-10' },
    { id: nanoid(), description: 'Electricity Bill', amount: 120, category: 'Utilities', date: '2026-09-12' },
  ],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    expenseAdded: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(description, amount, category, date) {
        return {
          payload: { id: nanoid(), description, amount, category, date },
        };
      },
    },
    expenseDeleted(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { expenseAdded, expenseDeleted } = expensesSlice.actions;
export default expensesSlice.reducer;

// selectors
export const selectAllExpenses = (state) => state.expenses.items;