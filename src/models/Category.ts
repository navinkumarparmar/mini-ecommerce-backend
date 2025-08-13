import { Schema, model } from 'mongoose';
import ICategory from '../interfaces/category/category.interface';

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String }
  },
  { timestamps: true }
);

export default model<ICategory>('Category', categorySchema);
