import { randomUUID } from 'node:crypto'
import { getDataBasePath, getFileData, modifyFileData, operationResponse } from '../utils/fileManipulation.js';

export class IncomeModel {

  static async getTotalMonthIncome(year, month) {
    const dataBasePath = getDataBasePath()

    const fileData = getFileData(dataBasePath)

    if(!fileData.success) {
      return operationResponse(false, {}, 400)
    }

    const totalIncome = fileData.data[year].months[month].income.total

    return operationResponse(true, totalIncome, 200)
  }

  static async getTotalYearIncome(year) {
    const dataBasePath = getDataBasePath()

    const fileData = getFileData(dataBasePath)

    if(!fileData.success) {
      return operationResponse(false, {}, 400)
    }

    const totalYearIncome = fileData.data[year].totalIncome

    return operationResponse(true, totalYearIncome, 200)
  }

  static async create(validationData, year, month) {
    const dataBasePath = getDataBasePath()

    const fileData = getFileData(dataBasePath)

    if(!fileData.success) {
      return operationResponse(false, {}, 400)
    }

    const newIncome = {
      id: randomUUID(),
      description: validationData.description,
      value: validationData.value,
      createdAt: new Date().toLocaleDateString(),
      lastModifiedDate: new Date().toLocaleDateString()
    }

    // ADD NEW INCOME TO RECORDS
    fileData.data[year].months[month].income.categories[validationData.category].subcategories[validationData.subcategory].records.push(newIncome)
    // UPDATE SUBCATEGORY TOTAL VALUE
    fileData.data[year].months[month].income.categories[validationData.category].subcategories[validationData.subcategory].total += validationData.value
    // UPDATE CATEGORY TOTAL VALUE
    fileData.data[year].months[month].income.categories[validationData.category].total += validationData.value
    // UPDATE MONTH INCOME TOTAL VALUE
    fileData.data[year].months[month].income.total += validationData.value
    // UPDATE YEAR INCOME TOTAL VALUE
    fileData.data[year].totalIncome += validationData.value

    const res = modifyFileData(dataBasePath, fileData.data)

    if(!res) {
      return operationResponse(false, {}, 500)
    }

    return operationResponse(true, newIncome, 201)
  }

  static async edit(validationData, year, month, id) {
    const dataBasePath = getDataBasePath()

    const fileData = getFileData(dataBasePath)

    if(!fileData.success) {
      return operationResponse(false, {}, 400)
    }

    const indexOfIncome = fileData.data[year].months[month].income.categories[validationData.category].subcategories[validationData.subcategory].records.findIndex(inc => inc.id === id)

    if(indexOfIncome === -1) {
      return operationResponse(false, {}, 404)
    }

    if(validationData.value) {
      // DIFFERENCE BETWEEN CURRENT VALUE AND NEW VALUE
      const valuesDifference = validationData.value - fileData.data[year].months[month].income.categories[validationData.category].subcategories[validationData.subcategory].records[indexOfIncome].value
      // UPDATE INCOME VALUE
      fileData.data[year].months[month].income.categories[validationData.category].subcategories[validationData.subcategory].records[indexOfIncome].value = validationData.value
      // UPDATE INCOME LAST MODIFIED DATE
      fileData.data[year].months[month].income.categories[validationData.category].subcategories[validationData.subcategory].records[indexOfIncome].lastModifiedDate = new Date().toLocaleDateString()
      // UPDATE SUBCATEGORY TOTAL VALUE
      fileData.data[year].months[month].income.categories[validationData.category].subcategories[validationData.subcategory].total += valuesDifference
      // UPDATE CATEGORY TOTAL VALUE
      fileData.data[year].months[month].income.categories[validationData.category].total += valuesDifference
      // UPDATE MONTH INCOME TOTAL VALUE
      fileData.data[year].months[month].income.total += valuesDifference
      // UPDATE YEAR INCOME TOTAL VALUE
      fileData.data[year].totalIncome += valuesDifference
    }

    if(validationData.description) {
      // UPDATE INCOME DESCRIPTION
      fileData.data[year].months[month].income.categories[validationData.category].subcategories[validationData.subcategory].records[indexOfIncome].description = validationData.description
      // UPDATE INCOME LAST MODIFIED DATE
      fileData.data[year].months[month].income.categories[validationData.category].subcategories[validationData.subcategory].records[indexOfIncome].lastModifiedDate = new Date().toLocaleDateString()
    }

    const res = modifyFileData(dataBasePath, fileData.data)

    if(!res) {
      return operationResponse(false, {}, 500)
    }

    const recordModified = fileData.data[year].months[month].income.categories[validationData.category].subcategories[validationData.subcategory].records[indexOfIncome]
    return operationResponse(true, recordModified, 202)
  }

  static async delete(validationData, year, month, id) {
    const dataBasePath = getDataBasePath()

    const fileData = getFileData(dataBasePath)

    if(!fileData.success) {
      return operationResponse(false, {}, 400)
    }

    const indexOfIncome = fileData.data[year].months[month].income.categories[validationData.category].subcategories[validationData.subcategory].records.findIndex(inc => inc.id === id)

    if(indexOfIncome === -1) {
      return operationResponse(false, {}, 404)
    }

    // INCOME VALUE
    const incomeValue = fileData.data[year].months[month].income.categories[validationData.category].subcategories[validationData.subcategory].records[indexOfIncome].value
    // DELETE INCOME FROM RECORDS
    fileData.data[year].months[month].income.categories[validationData.category].subcategories[validationData.subcategory].records.splice(indexOfIncome, 1)
    // UPDATE SUBCATEGORY TOTAL VALUE
    fileData.data[year].months[month].income.categories[validationData.category].subcategories[validationData.subcategory].total -= incomeValue
    // UPDATE CATEGORY TOTAL VALUE
    fileData.data[year].months[month].income.categories[validationData.category].total -= incomeValue
    // UPDATE MONTH INCOME TOTAL VALUE
    fileData.data[year].months[month].income.total -= incomeValue
    // UPDATE YEAR INCOME TOTAL VALUE
    fileData.data[year].totalIncome -= incomeValue

    const res = modifyFileData(dataBasePath, fileData.data)

    if(!res) {
      return operationResponse(false, {}, 500)
    }

    return operationResponse(true, fileData.data[year].months[month].income.categories[validationData.category].records, 200)
  }

}
