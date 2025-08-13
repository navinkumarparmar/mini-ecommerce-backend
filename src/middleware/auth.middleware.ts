import jwt from 'jsonwebtoken';
import config from '../config/config';
import { Request, Response, NextFunction } from 'express';
import DataStoredInToken from '../interfaces/DataStoredInToken';
import { RequestWithUser } from '../middleware/RequestWithUser'; 
import User from '../models/User';


export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const token = <string>req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ message: 'Token missing or invalid' });
    }

    // console.log("token",token)
    const decoded = jwt.verify(token, config.jwtSecret) as DataStoredInToken;
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user; 
    req.user = decoded; 
    next();
  } catch (error) {
    console.log("error",error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};
