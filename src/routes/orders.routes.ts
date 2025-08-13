import { Router } from 'express';
import { placeOrder, getUserOrders } from '../controllers/order.controller'
import { validateBody } from '../middleware/validate';
import { placeOrderSchema } from '../validation/order.validation';
import { authMiddleware } from '../middleware/auth.middleware';


const router = Router();

router.post('/', authMiddleware, validateBody(placeOrderSchema), placeOrder);
router.get('/', authMiddleware, getUserOrders);

export default router;
