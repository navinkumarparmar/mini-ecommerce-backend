import { Request } from 'express';
import DataStoredInToken from '../interfaces/DataStoredInToken';

export interface RequestWithUser extends Request {
  user?: DataStoredInToken;  
}