import { getDataBasePath, getFileData, operationResponse } from "../utils/fileManipulation.js"

export class ConsolidateModel {

  static async getMonthSummary(year, month) {
    const dataBasePath = getDataBasePath()

    const fileData = getFileData(dataBasePath)

    if(!fileData.success) {
      return operationResponse(false, {}, 400)
    }

    const monthData = fileData.data[year].months[month]

    if(monthData) {
      return operationResponse(true, monthData, 200)
    }

    return operationResponse(false, {} , 404)
  }

  static async getYearSummary(year) {
    const dataBasePath = getDataBasePath()

    const fileData = getFileData(dataBasePath)

    if(!fileData.success) {
      return operationResponse(false, {}, 400)
    }

    const yearData = fileData.data[year]

    if(yearData) {
      const yearSummaryData = {
        totalIncome: +yearData.totalIncome,
        totalExpenses: +yearData.totalExpenses,
        totalAvailable: +yearData.totalIncome - +yearData.totalExpenses
      }
      return operationResponse(true, yearSummaryData, 200)
    }

    return operationResponse(false, {} , 404)
  }
}
