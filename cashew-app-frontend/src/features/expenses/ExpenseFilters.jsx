import { TextField, MenuItem, Stack } from '@mui/material';

const categories = ['All', 'Food', 'Utilities', 'Transport', 'Entertainment', 'Other'];

export default function ExpenseFilters({ filters, onChange }) {
  const handleField = (field) => (e) => onChange({ ...filters, [field]: e.target.value });

  return (
    <Stack direction="row" spacing={2} sx={{ mb: 2 }} flexWrap="wrap">
      <TextField select label="Category" value={filters.category} onChange={handleField('category')}
        size="small" sx={{ minWidth: 140 }}>
        {categories.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
      </TextField>
      <TextField label="From" type="date" value={filters.from} onChange={handleField('from')}
        size="small" InputLabelProps={{ shrink: true }} />
      <TextField label="To" type="date" value={filters.to} onChange={handleField('to')}
        size="small" InputLabelProps={{ shrink: true }} />
    </Stack>
  );
}