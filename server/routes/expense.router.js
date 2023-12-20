import { Router } from "express";
import { ExpenseController } from "../controllers/expense.controller.js";

const router = Router()

// GET
router.get('/:year', ExpenseController.getTotalYearExpenses)
router.get('/:year/:month', ExpenseController.getTotalMonthExpenses)

// POST
router.post('/:year/:month', ExpenseController.create)

// PATCH
router.patch('/:year/:month/:id', ExpenseController.edit)

// DELETE
router.delete('/:year/:month/:id', ExpenseController.delete)

export default router

