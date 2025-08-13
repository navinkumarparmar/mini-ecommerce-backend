// src/controllers/order.controller.ts
import { Request, Response, NextFunction } from 'express';
import Order from '../models/Order';
import Product from '../models/Product';
import IProduct from '../interfaces/product/product.interface'
import { PlaceOrderDTO } from '../dtos/order.dto';
import { ErrorHandler } from '../middleware/errorHandler';
import { RequestWithUser } from '../middleware/RequestWithUser'; 

export const placeOrder = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
        const data: PlaceOrderDTO = req.body;
        const userId = req.user?._id; 

    if (!data.products || data.products.length === 0) {
      throw new ErrorHandler(400, 'Products required');
    }

    // Calculate total price
    let totalPrice = 0;
    for (const item of data.products) {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new ErrorHandler(404, `Product not found: ${item.product}`);
      }
      totalPrice += product.price * item.quantity;
    }

    const newOrder = new Order({
      user: userId,
      products: data.products,
      totalPrice,
      status: 'pending',
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: newOrder,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id;
    console.log("userid",userId);
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID missing in request. Please login again."
      });
    }
     const orders = await Order.find({ user: userId }).populate('products.product');

        if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No orders found for this user.",
        orders: []
      });
    }
   const formattedOrders = orders.map(order => ({
  id: order._id,
  products: order.products.map(p => {
    const product = p.product as unknown as IProduct; 
    return {
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: p.quantity,
    };
  }),
  totalPrice: order.totalPrice,
  status: order.status,
  createdAt: order.createdAt,
}));

    res.json({
      success: true,
      orders: formattedOrders
    });

  } catch (error) {
    console.log("error",error);
    next(error);
  }
};



