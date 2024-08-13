import Category from '../models/category';
import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import ErrorHandler from '../utils/errorHandler';



export const addCategory = catchAsyncErrors(async (req:Request, res:Response, next:NextFunction) => {
  const { name } = req.body;
  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    return next(new ErrorHandler('Category already exists', 400));
  }
  const category = new Category({ name });
  await category.save();
  res.status(201).json({
    success: true,
    message: 'Category added successfully',
    category,
  });
});

