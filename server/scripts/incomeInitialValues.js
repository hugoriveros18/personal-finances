import { readFileSync } from 'node:fs'
import { randomUUID } from 'crypto'
import { parse } from 'csv-parse/sync'
import { modifyFileData } from '../utils/fileManipulation.js'

(() => {
  const fileContentOct = readFileSync('./ingresos-script-oct.csv', 'utf-8')
  const fileContentNov = readFileSync('./ingresos-script-nov.csv', 'utf-8')
  const csvContentOct = parse(fileContentOct)
  const csvContentNov = parse(fileContentNov)
  const finalFileContentOct = []
  const finalFileContentNov = []

  for(let i = 1; i < csvContentOct.length; i++) {
    const newIncome = {
      id: randomUUID(),
      date: new Date().toLocaleDateString(),
      category: csvContentOct[i][2],
      value: +csvContentOct[i][3]
    }

    finalFileContentOct.push(newIncome)
  }

  for(let i = 1; i < csvContentNov.length; i++) {
    const newIncome = {
      id: randomUUID(),
      date: new Date().toLocaleDateString(),
      category: csvContentNov[i][2],
      value: +csvContentNov[i][3]
    }

    finalFileContentNov.push(newIncome)
  }

  modifyFileData('../data-base/2023/10/income.json', finalFileContentOct)
  modifyFileData('../data-base/2023/11/income.json', finalFileContentNov)
})()
