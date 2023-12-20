import { ExpenseModel } from "../models/expense.model.js"
import { validateExpenseSchema, validatePartialExpenseSchema } from "../schemas/expenseSchema.js"

export class ExpenseController {

  static async getTotalMonthExpenses(req, res) {
    const { year, month } = req.params

    const result = await ExpenseModel.getTotalMonthExpenses(year, month)

    if(!result.success) {
      return res.status(result.responseCode).json({ message: result.message })
    }

    res.status(result.responseCode).json({ totalExpenses: result.data})
  }

  static async getTotalYearExpenses(req, res) {
    const { year } = req.params

    const result = await ExpenseModel.getTotalYearExpenses(year)

    if(!result.success) {
      return res.status(result.responseCode).json({ message: result.message })
    }

    res.status(result.responseCode).json({ totalExpenses: result.data})
  }

  static async create(req, res) {
    const validation = validateExpenseSchema(req.body)

    if(!validation.success) {
      return res.status(400).json({ error: JSON.parse(validation.error.message) })
    }

    const { year, month } = req.params
    const result = await ExpenseModel.create(validation.data, year, month)

    if(!result.success) {
      return res.status(result.responseCode).json({ message: result.message })
    }

    res.status(result.responseCode).json({
      message: result.message,
      data: result.data
    })
  }

  static async edit(req, res) {
    const validation = validatePartialExpenseSchema(req.body)

    if(!validation.success) {
      return res.status(400).json({ error: JSON.parse(validation.error.message) })
    }

    const { year, month, id } = req.params
    const result = await ExpenseModel.edit(validation.data, year, month, id)

    if(!result.success) {
      return res.status(result.responseCode).json({ message: result.message })
    }

    res.status(result.responseCode).json({
      message: result.message,
      data: result.data
    })
  }

  static async delete(req, res) {
    const validation = validatePartialExpenseSchema(req.body)

    if(!validation.success) {
      return res.status(400).json({ error: JSON.parse(validation.error.message) })
    }

    const { year, month, id } = req.params

    const result = await ExpenseModel.delete(validation.data, year, month, id)

    if(!result.success) {
      return res.status(result.responseCode).json({ message: result.message })
    }

    res.status(result.responseCode).json({ message: 'deleted', data: result.data })
  }
}


