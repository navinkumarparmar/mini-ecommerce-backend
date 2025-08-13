import { Request, Response, NextFunction} from 'express';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { RegisterDTO, LoginDTO } from '../dtos/auth.dto';
import { ErrorHandler } from '../middleware/errorHandler';
import {AuthService} from '../services/auth.service'

// Register user
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: RegisterDTO = req.body;

    const { name, email, password } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ErrorHandler(400,'Email already registered')
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: req.body.role || 'user'
    });

    await newUser.save();
    return res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {

     next(error);
  }
};

// Login user
export const loginUser = async (req: Request, res: Response,next:NextFunction) => {
  try {
     const data: LoginDTO = req.body;

     const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user) {
     throw new ErrorHandler(401, 'Invalid email or password');
    }

  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ErrorHandler(401,'Invalid Credential')
 
    }

   const token = AuthService.createToken(user);

    return res.status(200).json({ success: true, token });
  } catch (error) {
     next(error);
  }
};
