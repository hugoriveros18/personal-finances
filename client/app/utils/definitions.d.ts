type Months = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December'
type MonthsCodes = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'
type RecordType = 'income' | 'expense'

interface AppState {
    activeYear: string | null
    activeConsolidateYear: YearConsolidate | null
    activeMonth: string | null
    activeConsolidateMonth: MonthConsolidate | null
}

interface YearConsolidate {
    totalIncome: number
    totalExpenses: number
    totalAvailable: number
}

interface ExpensesIncomeStructure {
    total: number
    categories: any
}

interface MonthConsolidate {
    month: Months
    code: MonthsCodes
    expenses: ExpensesIncomeStructure
    income: ExpensesIncomeStructure
}

