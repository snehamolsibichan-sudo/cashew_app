import { useSelector, useDispatch } from 'react-redux';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectAllExpenses, deleteExpense } from './expensesSlice';

export default function ExpenseTable({ filters }) {
  const expenses = useSelector(selectAllExpenses);
  const dispatch = useDispatch();

  const filtered = expenses.filter((e) => {
    if (filters.category !== 'All' && e.category !== filters.category) return false;
    if (filters.from && e.date < filters.from) return false;
    if (filters.to && e.date > filters.to) return false;
    return true;
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.description}</TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>{expense.date}</TableCell>
              <TableCell align="right">${Number(expense.amount).toFixed(2)}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => dispatch(deleteExpense(expense.id))}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}