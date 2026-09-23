const pool = require('../config/db');

async function getExpenses(req, res) {
  try {
    const result = await pool.query(
      'SELECT * FROM expenses WHERE user_id = $1 ORDER BY date DESC',
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function addExpense(req, res) {
  const { description, amount, category, date } = req.body;
  if (!description || !amount || !date) {
    return res.status(400).json({ message: 'Description, amount, and date are required' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO expenses (user_id, description, amount, category, date)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [req.userId, description, amount, category, date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function deleteExpense(req, res) {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM expenses WHERE id = $1 AND user_id = $2', [id, req.userId]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { getExpenses, addExpense, deleteExpense };