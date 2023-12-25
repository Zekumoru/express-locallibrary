import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

const isValidObjectId = (
  req: Request,
  _res: Response,
  next: NextFunction,
  id: string
) => {
  if (req.params.id && !mongoose.isValidObjectId(req.params.id)) {
    // Invalid genre id
    const err = new Error('Invalid id') as Error & { status: number };
    err.status = 404;
    return next(err);
  }

  next();
};

export default isValidObjectId;
