import { Request, Response, NextFunction } from 'express';
import Category from '../models/Category';
import { ErrorHandler } from '../middleware/errorHandler';

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description } = req.body;
    console.log("name", name);

    if (!name) {
      throw new ErrorHandler(400, 'Category name is required');
    }

   
    const existing = await Category.findOne({ name });
    if (existing) {
      throw new ErrorHandler(409, 'Category already exists');
    }

    const category = new Category({ name, description });
    await category.save();

    res.status(201).json({ success: true, category });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    if(categories.length ===0){
      throw new ErrorHandler(404, 'Category Not found');
    }
    res.json({ success: true, categories });
  } catch (error) {
    next(error);
  }
};

