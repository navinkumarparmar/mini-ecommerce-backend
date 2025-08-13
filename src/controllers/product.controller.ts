import mongoose from "mongoose";
import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/product.dto';
import { ErrorHandler } from '../middleware/errorHandler';
import Category from '../models/Category';

// Create product (admin only)
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: CreateProductDTO = req.body;

    if (!data.name || !data.description || !data.price || !data.category) {
      throw new ErrorHandler(400, "Name, description, price, and category are required.");
    }

   
    if (!mongoose.Types.ObjectId.isValid(data.category)) {
      throw new ErrorHandler(400, "Invalid category ID.");
    }

    const categoryExists = await Category.findById(data.category);
    if (!categoryExists) {
      throw new ErrorHandler(404, "Category not found.");
    }

    const product = new Product(data);
    await product.save();

    await product.populate("category", "name");

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });

  } catch (error) {
    next(error);
  }
};

// Get all products
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      keyword,
      sortBy,
      price,
      priceMin,
      priceMax,
      featured
    } = req.query;

    const filters: any = {};

    // Price filter
    if (price) {
      filters.price = Number(price);
    } else if (priceMin || priceMax) {
      filters.price = {};
      if (priceMin) filters.price.$gte = Number(priceMin);
      if (priceMax) filters.price.$lte = Number(priceMax);
    }

    // Category filter by name
    if (category) {
      const categoryDoc = await Category.findOne({
        name: { $regex: category as string, $options: 'i' }
      });

      if (categoryDoc) {
        filters.category = categoryDoc._id;
      } else {
        throw new ErrorHandler(404, 'Category not found');
      }
    }

 
    if (keyword) {
      filters.name = { $regex: keyword, $options: 'i' };
    }

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const sort: any = {};
    if (sortBy) {
      const [field, order] = (sortBy as string).split(':');
      sort[field] = order === 'desc' ? -1 : 1;
    } else {
      sort.createdAt = -1;
    }

    if (featured !== undefined) {
      filters.featured = featured === 'true';
    }

    const products = await Product.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limitNumber)
      .populate('category', 'name');

    const total = await Product.countDocuments(filters);

    res.json({
      success: true,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      totalItems: total,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// Get single product
export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new ErrorHandler(404, 'Product not found');
    }
    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// Update product
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: UpdateProductDTO = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!product) {
      throw new ErrorHandler(404, 'Product not found');
    }
    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// Delete product
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      throw new ErrorHandler(404, 'Product not found');
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Upload product image
export const uploadProductImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;

    if (!req.file) {
      throw new ErrorHandler(400, 'Image file is required');
    }

    const imageUrl = `${process.env.BASEURL}/uploads/${req.file.filename}`;

    const product = await Product.findByIdAndUpdate(
      productId,
      { imageUrl },
      { new: true }
    );

    if (!product) {
      throw new ErrorHandler(404, 'Product not found');
    }

    return res.status(200).json({
      success: true,
      message: 'Product image uploaded successfully',
      product,
    });
  } catch (error) {
    next(error);
  }
};
