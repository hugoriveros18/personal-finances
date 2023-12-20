import { Router } from 'express'
import incomeRouter from './income.router.js'
import expensesRouter from './expense.router.js'
import consolidateRouter from './consolidate.router.js'

export default function routerApi(app) {
  const router = Router();
  app.use('/api/v1', router)

  router.use('/income', incomeRouter);
  router.use('/expense', expensesRouter);
  router.use('/consolidate', consolidateRouter);
}

