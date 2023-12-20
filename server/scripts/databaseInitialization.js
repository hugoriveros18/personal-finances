import { readFileSync } from "node:fs"
import { modifyFileData } from "../utils/fileManipulation.js"
import { parse } from 'csv-parse/sync'
import { randomUUID } from "node:crypto"
import { EXPENSES_CATEGORIES_STRUCTURE, INCOME_CATEGORIES_STRUCTURE } from "../utils/categoriesStructure.js"

(() => {
  const INITIAL_YEARS = ['2023']
  const MONTHS = ['1','2','3','4','5','6','7','8','9','10','11','12']
  const MONTHS_NAME = {
    '1': 'January',
    '2': 'February',
    '3': 'March',
    '4': 'April',
    '5': 'May',
    '6': 'June',
    '7': 'July',
    '8': 'August',
    '9': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  }
  const DATA_BASE = {}

  for(let year of INITIAL_YEARS) {
    const newYear = {
      year: year,
      totalIncome: 0,
      totalExpenses: 0,
      months: {}
    }

    for(let month of MONTHS) {
      const newMonth = {
        month: MONTHS_NAME[month],
        code: month,
        expenses: {
          total: 0,
          categories: {}
        },
        income: {
          total: 0,
          categories: {}
        }
      }

      for(let incomeCategory of Object.keys(INCOME_CATEGORIES_STRUCTURE)) {

        const newIncomeCategory = {
          total: 0,
          subcategories: {}
        }

        const incomeSubcategories = INCOME_CATEGORIES_STRUCTURE[incomeCategory].map(inc => inc)
        incomeSubcategories.forEach((inc) => {
          newIncomeCategory.subcategories[inc] = {
            total: 0,
            records: []
          }
        })

        newMonth.income['categories'][incomeCategory] = newIncomeCategory
      }

      for(let expenseCategory of Object.keys(EXPENSES_CATEGORIES_STRUCTURE)) {

        const newExpenseCategory = {
          total: 0,
          subcategories: {}
        }

        const ExpensesSubcategories = EXPENSES_CATEGORIES_STRUCTURE[expenseCategory].map(inc => inc)
        ExpensesSubcategories.forEach((exp) => {
          newExpenseCategory.subcategories[exp] = {
            total: 0,
            records: []
          }
        })

        newMonth.expenses['categories'][expenseCategory] = newExpenseCategory
      }

      newYear.months[month] = newMonth
    }

    DATA_BASE[year] = newYear
  }


  const consolidateFile = readFileSync('scripts/database-init.csv', 'utf-8')
  const consolidateFileParsed = parse(consolidateFile)

  for(let i = 1; i < consolidateFileParsed.length; i++) {

    const [type, category, subcategory, description, value, year, month] = consolidateFileParsed[i]
    const inputType = type === 'income' ? 'income' : 'expenses'
    const yearType = type === 'income' ? 'totalIncome' : 'totalExpenses'
    const newValue = {
      id: randomUUID(),
      description: description,
      value: +value,
      createdAt: new Date().toLocaleDateString(),
      lastModifiedDate: new Date().toLocaleDateString()
    }

    DATA_BASE[year]['months'][month][inputType]['categories'][category]['subcategories'][subcategory]['records'].push(newValue)
    DATA_BASE[year][yearType] += +value
    DATA_BASE[year]['months'][month][inputType]['total'] += +value
    DATA_BASE[year]['months'][month][inputType]['categories'][category]['total'] += +value
    DATA_BASE[year]['months'][month][inputType]['categories'][category]['subcategories'][subcategory]['total'] += +value
  }

  const writeResult = modifyFileData('scripts/../data-base/finance-database.json', DATA_BASE)

  if(!writeResult) {
    console.log('Error at values intialization')
    return
  }
})()
