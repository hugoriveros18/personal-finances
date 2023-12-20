import { readFileSync, writeFileSync } from "fs"
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'url';

const statusCodeMessage = {
  200: 'Ok',
  201: 'Successfully created',
  202: 'Successfully update',
  400: 'Bad request',
  404: 'Not found',
  500: 'Internal server error'
}

export function getFileData(dataBasePath) {
  try {
    const data = readFileSync(dataBasePath, 'utf-8')
    return {
      success: true,
      data: JSON.parse(data)
    }
  } catch (error) {
    return {
      success: false,
      data: {}
    }
  }
}

export function modifyFileData(dataBasePath, newData) {
  try {
    writeFileSync(dataBasePath, JSON.stringify(newData, null, 2))
    return true

  } catch (error) {
    console.log(error)
    return false
  }
}

// export function getDirectoryFiles(dataBasePath) {
//   try {
//     const dirFiles = readdirSync(dataBasePath)
//     return {
//       success: true,
//       data: dirFiles
//     }
//   } catch(error) {
//     return {
//       success: false,
//       data: []
//     }
//   }
// }

export function operationResponse(success, data, responseCode) {
  return {
    success,
    data,
    message: statusCodeMessage[responseCode] ?? '',
    responseCode
  }
}

export function getDataBasePath() {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const dataBasePath = join(__dirname, '..', 'data-base', 'finance-database.json')

  return dataBasePath
}

