import z from 'zod'
import { getIncomeCategories, getIncomeSubcategories } from '../utils/categoriesStructure.js'

const incomeSchema = z.object({
  category: z.enum(getIncomeCategories()),
  subcategory: z.enum(getIncomeSubcategories()),
  description: z.string({
    required_error: 'Description is required',
    invalid_type_error: 'Description must be a string'
  }).max(100),
  value: z.number({
    required_error: "Value is required",
    invalid_type_error: "Value must be a number"
  }).int().positive()
})

export function validateIncomeSchema(input) {
  return incomeSchema.safeParse(input)
}

export function validatePartialIncomeSchema(input) {
  return incomeSchema.partial().safeParse(input)
}
