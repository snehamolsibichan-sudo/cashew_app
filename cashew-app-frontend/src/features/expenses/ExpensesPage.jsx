import { Container, Typography } from '@mui/material';
import ExpenseForm from './ExpenseForm';
import ExpenseTable from './ExpenseTable';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { logout } from '../auth/authSlice';

export default function ExpensesPage() {
    const dispatch = useDispatch();
  return (
    <Container sx={{ mt: 4 }}>
    <Button onClick={() => dispatch(logout())} sx={{ float: 'right' }}>Logout</Button>
      <Typography variant="h4" gutterBottom>Expenses</Typography>
      <ExpenseForm />
      <ExpenseTable />
    </Container>
  );
}