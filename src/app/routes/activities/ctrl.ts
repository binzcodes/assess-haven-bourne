import {NextFunction, Request, Response} from 'express';
import {activities, timeslots} from '../../../services';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params;
  if (isNaN(Number(id))) {
    res.status(400).end();
  }
  next();
};

export const get = async (req: Request, res: Response) => {
  // TODO: return location & timeslots
  const data = await activities.read();
  return res.status(200).json(data);
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {id} = req.params;
  try {
    const data = await activities.readOne(Number(id));
    res.status(200).json(data);
  } catch (e) {
    next();
  }
};

export const getTimeslots = async (req: Request, res: Response) => {
  const {id} = req.params;
  const data = await timeslots.readByActivityId(Number(id));
  if (!data || data.length === 0) {
    return res.status(404).end();
  }
  return res.status(200).json(data);
};
