import { randomUUID } from "crypto"
import { getDataBasePath, getFileData, modifyFileData, operationResponse } from "../utils/fileManipulation.js"

export class ExpenseModel {

  static async getTotalMonthExpenses(year, month) {
    const dataBasePath = getDataBasePath()

    const fileData = getFileData(dataBasePath)

    if(!fileData.success) {
      return operationResponse(false, {}, 400)
    }

    const totalExpenses = fileData.data[year].months[month].expenses.total

    return operationResponse(true, totalExpenses, 200)
  }

  static async getTotalYearExpenses(year) {
    const dataBasePath = getDataBasePath()

    const fileData = getFileData(dataBasePath)

    if(!fileData.success) {
      return operationResponse(false, {}, 400)
    }

    const totalYearExpenses = fileData.data[year].totalExpenses

    return operationResponse(true, totalYearExpenses, 200)
  }

  static async create(validationData, year, month) {
    const dataBasePath = getDataBasePath()

    const fileData = getFileData(dataBasePath)

    if(!fileData.success) {
      return operationResponse(false, {}, 400)
    }

    const newExpense = {
      id: randomUUID(),
      description: validationData.description,
      value: validationData.value,
      createdAt: new Date().toLocaleDateString(),
      lastModifiedDate: new Date().toLocaleDateString()
    }

    // ADD NEW EXPENSE TO RECORDS
    fileData.data[year].months[month].expenses.categories[validationData.category].subcategories[validationData.subcategory].records.push(newExpense)
    // UPDATE SUBCATEGORY TOTAL VALUE
    fileData.data[year].months[month].expenses.categories[validationData.category].subcategories[validationData.subcategory].total += validationData.value
    // UPDATE CATEGORY TOTAL VALUE
    fileData.data[year].months[month].expenses.categories[validationData.category].total += validationData.value
    // UPDATE MONTH EXPENSES TOTAL VALUE
    fileData.data[year].months[month].expenses.total += validationData.value
    // UPDATE YEAR EXPENSES TOTAL VALUE
    fileData.data[year].totalExpenses += validationData.value

    const res = modifyFileData(dataBasePath, fileData.data)

    if(!res) {
      return operationResponse(false, {}, 500)
    }

    return operationResponse(true, newExpense, 201)
  }

  static async edit(validationData, year, month, id) {
    const dataBasePath = getDataBasePath()

    const fileData = getFileData(dataBasePath)

    if(!fileData.success) {
      return operationResponse(false, {}, 400)
    }

    const indexOfExpense = fileData.data[year].months[month].expenses.categories[validationData.category].subcategories[validationData.subcategory].records.findIndex(inc => inc.id === id)

    if(indexOfExpense === -1) {
      return operationResponse(false, {}, 404)
    }

    if(validationData.value) {
      // DIFFERENCE BETWEEN CURRENT VALUE AND NEW VALUE
      const valuesDifference = validationData.value - fileData.data[year].months[month].expenses.categories[validationData.category].subcategories[validationData.subcategory].records[indexOfExpense].value
      // UPDATE EXPENSE VALUE
      fileData.data[year].months[month].expenses.categories[validationData.category].subcategories[validationData.subcategory].records[indexOfExpense].value = validationData.value
      // UPDATE EXPENSE LAST MODIFIED DATE
      fileData.data[year].months[month].expenses.categories[validationData.category].subcategories[validationData.subcategory].records[indexOfExpense].lastModifiedDate = new Date().toLocaleDateString()
      // UPDATE SUBCATEGORY TOTAL VALUE
      fileData.data[year].months[month].expenses.categories[validationData.category].subcategories[validationData.subcategory].total += valuesDifference
      // UPDATE CATEGORY TOTAL VALUE
      fileData.data[year].months[month].expenses.categories[validationData.category].total += valuesDifference
      // UPDATE MONTH EXPENSES TOTAL VALUE
      fileData.data[year].months[month].expenses.total += valuesDifference
      // UPDATE YEAR EXPENSES TOTAL VALUE
      fileData.data[year].totalExpenses += valuesDifference
    }

    if(validationData.description) {
      // UPDATE EXPENSE DESCRIPTION
      fileData.data[year].months[month].expenses.categories[validationData.category].subcategories[validationData.subcategory].records[indexOfExpense].description = validationData.description
      // UPDATE EXPENSE LAST MODIFIED DATE
      fileData.data[year].months[month].expenses.categories[validationData.category].subcategories[validationData.subcategory].records[indexOfExpense].lastModifiedDate = new Date().toLocaleDateString()
    }

    const res = modifyFileData(dataBasePath, fileData.data)

    if(!res) {
      return operationResponse(false, {}, 500)
    }

    const recordModified = fileData.data[year].months[month].expenses.categories[validationData.category].subcategories[validationData.subcategory].records[indexOfExpense]
    return operationResponse(true, recordModified, 202)
  }

  static async delete(validationData, year, month, id) {
    const dataBasePath = getDataBasePath()

    const fileData = getFileData(dataBasePath)

    if(!fileData.success) {
      return operationResponse(false, {}, 400)
    }

    const indexOfExpense = fileData.data[year].months[month].expenses.categories[validationData.category].subcategories[validationData.subcategory].records.findIndex(inc => inc.id === id)

    if(indexOfExpense === -1) {
      return operationResponse(false, {}, 404)
    }

    // EXPENSE VALUE
    const expenseValue = fileData.data[year].months[month].expenses.categories[validationData.category].subcategories[validationData.subcategory].records[indexOfExpense].value
    // DELETE EXPENSE FROM RECORDS
    fileData.data[year].months[month].expenses.categories[validationData.category].subcategories[validationData.subcategory].records.splice(indexOfExpense, 1)
    // UPDATE SUBCATEGORY TOTAL VALUE
    fileData.data[year].months[month].expenses.categories[validationData.category].subcategories[validationData.subcategory].total -= expenseValue
    // UPDATE CATEGORY TOTAL VALUE
    fileData.data[year].months[month].expenses.categories[validationData.category].total -= expenseValue
    // UPDATE MONTH EXPENSES TOTAL VALUE
    fileData.data[year].months[month].expenses.total -= expenseValue
    // UPDATE YEAR EXPENSES TOTAL VALUE
    fileData.data[year].totalExpenses -= expenseValue

    const res = modifyFileData(dataBasePath, fileData.data)

    if(!res) {
      return operationResponse(false, {}, 500)
    }

    return operationResponse(true, fileData.data[year].months[month].expenses.categories[validationData.category].records, 200)
  }
}

