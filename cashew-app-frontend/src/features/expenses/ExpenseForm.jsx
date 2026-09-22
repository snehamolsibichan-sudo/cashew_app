import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, TextField, MenuItem, Button, Stack } from '@mui/material';
import { expenseAdded } from './expensesSlice';

const categories = ['Food', 'Utilities', 'Transport', 'Entertainment', 'Other'];

export default function ExpenseForm() {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !date) return;
    dispatch(expenseAdded(description, parseFloat(amount), category, date));
    setDescription('');
    setAmount('');
    setDate('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        <TextField label="Description" value={description}
          onChange={(e) => setDescription(e.target.value)} size="small" />
        <TextField label="Amount" type="number" value={amount}
          onChange={(e) => setAmount(e.target.value)} size="small" />
        <TextField select label="Category" value={category}
          onChange={(e) => setCategory(e.target.value)} size="small" sx={{ minWidth: 140 }}>
          {categories.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </TextField>
        <TextField label="Date" type="date" value={date}
          onChange={(e) => setDate(e.target.value)} size="small" InputLabelProps={{ shrink: true }} />
        <Button type="submit" variant="contained">Add Expense</Button>
      </Stack>
    </Box>
  );
}