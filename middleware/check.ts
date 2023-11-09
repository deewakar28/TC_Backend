import { NextFunction, Response } from 'express';
import { CustomRequest } from '..';

const checkDBConnection = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (!(req.db) || !(req.admin)) {
    return res.status(400).json({ ok: false, message: 'Database connection not available.' });
  }
  next();
};

export { checkDBConnection };