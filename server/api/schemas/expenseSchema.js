import z from 'zod'
import { getExpensesCategories, getExpensesSubcategories } from '../utils/categoriesStructure.js'

const expenseSchema = z.object({
  category: z.enum(getExpensesCategories()),
  subcategory: z.enum(getExpensesSubcategories()),
  description: z.string({
    required_error: 'Description is required',
    invalid_type_error: 'Description must be a string'
  }).max(100),
  value: z.number({
    required_error: "Value is required",
    invalid_type_error: "Value must be a number",
  }).int().positive()
})


export function validateExpenseSchema(input) {
  return expenseSchema.safeParse(input)
}

export function validatePartialExpenseSchema(input) {
  return expenseSchema.partial().safeParse(input)
}

