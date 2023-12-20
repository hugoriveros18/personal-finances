import { Router } from 'express'
import { IncomeController } from '../controllers/income.controller.js';

// ROUTES
const router = Router();

// GET
router.get('/:year', IncomeController.getTotalYearIncome)
router.get('/:year/:month', IncomeController.getTotalMonthIncome)

// POST
router.post('/:year/:month', IncomeController.create)

// PATCH
router.patch('/:year/:month/:id', IncomeController.edit)

//DELETE
router.delete('/:year/:month/:id', IncomeController.delete)


export default router
