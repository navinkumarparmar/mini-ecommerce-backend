import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';
import DataStoredInToken from "../interfaces/DataStoredInToken";
import config from "../config/config";


export class AuthService {
  public static createToken(user: IUser): string {
    const secret = config.jwtSecret

    const payload: DataStoredInToken = {
      _id: user._id.toString(),
      role:user.role,
      email:user.email
    };

    return jwt.sign(payload, secret, { expiresIn: '30d' });
  }
}
