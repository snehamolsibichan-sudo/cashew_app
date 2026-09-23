import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Typography, Button } from '@mui/material';
import ExpenseForm from './ExpenseForm';
import ExpenseTable from './ExpenseTable';
import { fetchExpenses } from './expensesSlice';
import { logout } from '../auth/authSlice';

export default function ExpensesPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  return (
    <Container sx={{ mt: 4 }}>
      <Button onClick={() => dispatch(logout())} sx={{ float: 'right' }}>Logout</Button>
      <Typography variant="h4" gutterBottom>Expenses</Typography>
      <ExpenseForm />
      <ExpenseTable />
    </Container>
  );
}