import {NextFunction, Request, Response} from 'express';
import {nextTick} from 'node:process';
import {Category} from '../../../entities';
import {logger} from '../../../logger';
const httpStatus = require('http-status');
import {categories} from '../../../services';

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await categories.read();
    res.status(httpStatus.OK).json(data);
  } catch (e) {
    next(e);
  }
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {id} = req.params;
  logger.info(id);
  try {
    const data = await categories.readOne(Number(id));
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

export async function post(req: Request, res: Response) {
  const temp = {} as Category;
  temp.Id = Number(req.query.id);
  temp.Name = String(req.query.name);
  try {
    const data = await categories.writeOne(temp);
    res.status(httpStatus.OK).json(data);
  } catch (e) {
    console.error(e);
    res.status(401).json(e);
  }
}
