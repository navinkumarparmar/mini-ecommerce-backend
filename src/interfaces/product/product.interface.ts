import { Types } from 'mongoose';
export default interface IProduct {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string | Types.ObjectId; 
  imageUrl?: string;
  featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
