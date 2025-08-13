import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/role.middleware';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct,uploadProductImage } from '../controllers/product.controller';
import { validateBody } from '../middleware/validate';
import { createProductSchema, updateProductSchema } from '../validation/product.validation';
import upload from '../middleware/upload';

const router = Router();

// Get all products --public
router.get('/', getProducts);

// Get single product by ID --public
router.get('/:id', getProductById);

// Create product --admin only
router.post(
  '/',
  authMiddleware,
  authorizeRoles('admin'),
  validateBody(createProductSchema),
  createProduct
);

// Update product --admin only
router.put(
  '/:id',
  authMiddleware,
  authorizeRoles('admin'),
  validateBody(updateProductSchema),
  updateProduct
);

// Delete product --admin only
router.delete(
  '/:id',
  authMiddleware,
  authorizeRoles('admin'),
  deleteProduct
);

router.post('/:id/upload', authMiddleware, authorizeRoles('admin'), upload.single('image'), uploadProductImage);


export default router;
