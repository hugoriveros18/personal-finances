import { IncomeModel } from "../models/income.model.js"
import { validateIncomeSchema, validatePartialIncomeSchema } from "../schemas/incomeSchema.js"

export class IncomeController {

  static async getTotalMonthIncome(req, res) {
    const { year, month } = req.params

    const result = await IncomeModel.getTotalMonthIncome(year, month)

    if(!result.success) {
      return res.status(result.responseCode).json({ message: result.message })
    }

    res.status(result.responseCode).json({ totalIncome: result.data})
  }

  static async getTotalYearIncome(req, res) {
    const { year } = req.params

    const result = await IncomeModel.getTotalYearIncome(year)

    if(!result.success) {
      return res.status(result.responseCode).json({ message: result.message })
    }

    res.status(result.responseCode).json({ totalIncome: result.data})
  }

  static async create(req, res) {
    const validation = validateIncomeSchema(req.body)

    if(!validation.success) {
      return res.status(400).json({ error: JSON.parse(validation.error.message) })
    }

    const { year, month } = req.params
    const result = await IncomeModel.create(validation.data, year, month)

    if(!result.success) {
      return res.status(result.responseCode).json({ message: result.message })
    }

    res.status(result.responseCode).json({
      message: result.message,
      data: result.data
    })
  }

  static async edit(req, res) {
    const validation = validatePartialIncomeSchema(req.body)

    if(!validation.success) {
      return res.status(400).json({ error: JSON.parse(validation.error.message) })
    }

    const { year, month, id } = req.params

    const result = await IncomeModel.edit(validation.data, year, month, id)

    if(!result.success) {
      return res.status(result.responseCode).json({ message: result.message })
    }

    res.status(result.responseCode).json({
      message: result.message,
      data: result.data
    })
  }

  static async delete(req, res) {

    const validation = validatePartialIncomeSchema(req.body)

    if(!validation.success) {
      return res.status(400).json({ error: JSON.parse(validation.error.message) })
    }

    const { year, month, id } = req.params

    const result = await IncomeModel.delete(validation.data, year, month, id)

    if(!result.success) {
      return res.status(result.responseCode).json({ message: result.message })
    }

    res.status(result.responseCode).json({ message: 'deleted', data: result.data })
  }
}
