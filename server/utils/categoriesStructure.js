export const INCOME_CATEGORIES_STRUCTURE = {
  'Fixed income': [
    'Hugo salary',
    'Angie salary'
  ],
  'Variable income': [
    'Angie legal tip',
    'Angie voluntary tip'
  ]
}

export const EXPENSES_CATEGORIES_STRUCTURE = {
  'Rent': [
    'Home rental'
  ],
  'Public services': [
    'Water',
    'Energy',
    'Gas'
  ],
  'Private services': [
    'Internet',
    'Phone plan',
    'Gym',
    'Xbox game pass',
  ],
  'Entertainment': [
    'Restaurants',
    'Snacks',
    'Desserts',
  ],
  'Other': [
    'Groceries',
    'Debts',
    'Gasoline',
    'Parking lot',
    'General expenses'
  ]
}

export function getIncomeCategories() {
  return Object.keys(INCOME_CATEGORIES_STRUCTURE)
}

export function getIncomeSubcategories() {
  const categories = Object.keys(INCOME_CATEGORIES_STRUCTURE);

  const subcategories = []
  categories.forEach((ctg) => {
    subcategories.push(...INCOME_CATEGORIES_STRUCTURE[ctg])
  })

  return subcategories
}

export function getExpensesCategories() {
  return Object.keys(EXPENSES_CATEGORIES_STRUCTURE)
}

export function getExpensesSubcategories() {
  const categories = Object.keys(EXPENSES_CATEGORIES_STRUCTURE);

  const subcategories = []
  categories.forEach((ctg) => {
    subcategories.push(...EXPENSES_CATEGORIES_STRUCTURE[ctg])
  })

  return subcategories
}

