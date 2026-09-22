import { useSelector, useDispatch } from 'react-redux';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectAllExpenses, expenseDeleted } from './expensesSlice';

export default function ExpenseTable() {
  const expenses = useSelector(selectAllExpenses);
  const dispatch = useDispatch();

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
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.description}</TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>{expense.date}</TableCell>
              <TableCell align="right">${expense.amount.toFixed(2)}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => dispatch(expenseDeleted(expense.id))}>
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