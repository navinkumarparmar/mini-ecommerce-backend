import { Router } from 'express';
import { createCategory, getCategories } from '../controllers/category.controller';

const router = Router();

// POST /api/categories → Add new category
router.post('/', createCategory);

// GET /api/categories → Get all categories
router.get('/', getCategories);

export default router;
