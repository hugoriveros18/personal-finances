import { ConsolidateModel } from "../models/consolidate.model.js"

export class ConsolidateController {

  static async getMonthSummary(req, res) {

    const { year, month } = req.params

    const result = await ConsolidateModel.getMonthSummary(year, month)

    if(!result.success) {
      return res.status(result.responseCode).json({ message: result.message })
    }

    res.status(result.responseCode).json(result.data)
  }

  static async getYearSummary(req, res) {

    const { year } = req.params

    const result = await ConsolidateModel.getYearSummary(year)

    if(!result.success) {
      return res.status(result.responseCode).json({ message: result.message })
    }

    res.status(result.responseCode).json(result.data)
  }

}


