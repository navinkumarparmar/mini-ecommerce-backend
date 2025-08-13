import { Schema, model } from 'mongoose';
import IProduct from '../interfaces/product/product.interface';

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },  
  imageUrl: { type: String },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

export default model<IProduct>('Product', productSchema);
