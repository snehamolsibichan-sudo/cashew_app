import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Paper, Box } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchExpenses, selectAllExpenses } from '../expenses/expensesSlice';

const COLORS = ['#1976d2', '#9c27b0', '#2e7d32', '#ed6c02', '#d32f2f', '#0288d1'];

export default function InsightsPage() {
  const dispatch = useDispatch();
  const expenses = useSelector(selectAllExpenses);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  const categoryData = useMemo(() => {
    const totals = {};
    expenses.forEach((e) => {
      const cat = e.category || 'Uncategorized';
      totals[cat] = (totals[cat] || 0) + Number(e.amount);
    });
    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  const totalSpent = categoryData.reduce((sum, c) => sum + c.value, 0);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Insights</Typography>
      <Typography variant="subtitle1" gutterBottom>
        Total spent: ${totalSpent.toFixed(2)}
      </Typography>
      {categoryData.length === 0 ? (
        <Typography color="text.secondary">Add some expenses to see insights.</Typography>
      ) : (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Box sx={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
                >
                  {categoryData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      )}
    </Container>
  );
}