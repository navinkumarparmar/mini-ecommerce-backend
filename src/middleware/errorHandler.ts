import { Request, Response, NextFunction } from 'express';

class ErrorHandler extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleError = (
  err: Error | ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
 if (err instanceof ErrorHandler) {
  res.status(err.statusCode).json({ 
    success: false, 
    message: err.message,
    statusCode:err.statusCode
 });
} else {
  // Unexpected errors
  console.error(err); 
  res.status(500).json({ 
    success: false,
    statusCode: 500,
    message: 'Something went wrong. Please try again later.'
 });
}

};

export { ErrorHandler, handleError };
