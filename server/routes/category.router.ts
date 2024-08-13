import express, { Request, Response } from "express";
import { addCategory } from "../controllers/category.controller";

import {
    authenticateToken,
    hocAdminInvigilatorCheck,
    userCheck,
  } from "../middlewares/authMiddleware";
const router = express.Router();

router.post("/add-category",addCategory)


export default router