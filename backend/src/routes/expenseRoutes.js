const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getExpenses, addExpense, deleteExpense } = require('../controllers/expenseController');

router.use(authMiddleware); // every route below requires a valid token

router.get('/', getExpenses);
router.post('/', addExpense);
router.delete('/:id', deleteExpense);

module.exports = router;