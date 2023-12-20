import { Router } from "express";
import { ConsolidateController } from "../controllers/consolidate.controller.js";


const router = Router()

// GET
router.get('/:year', ConsolidateController.getYearSummary)
router.get('/:year/:month', ConsolidateController.getMonthSummary)


export default router

