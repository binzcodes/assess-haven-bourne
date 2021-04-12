import {Router, Request, Response, NextFunction} from 'express';
import {logger} from '../logger';
const router = Router();

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message, err);
  return res.status(404).json({
    error: err.message,
  });
};
