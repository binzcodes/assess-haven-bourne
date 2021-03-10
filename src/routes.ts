import {NextFunction, Request, Response, Router} from 'express';
import {initialiseDB, readActivities, readActivity, readCategories, readTimeslotsByActivity} from './db';

const router = Router();

router.get('/ping', (req, res) => {
  res.json({message: 'pong'})
})

router.get('/categories', async (req: Request, res: Response) => {
  const categories = await readCategories();
  return res.status(200).json(categories);
});

router.get('/activities', async (req: Request, res: Response) => {
  // TODO: return location & timeslots
  const activities = await readActivities();
  return res.status(200).json(activities);
});

// filter non-numerical id's
router.use(
  '/activity/:id',
  (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    if (isNaN(Number(id))) {
      return res.status(400).end();
    }
    next();
  }
);

router.get('/activity/:id', async (req: Request, res: Response) => {
  const {id} = req.params;
  const activity = await readActivity(Number(id))
  if (!activity) {
    return res.status(404).end();
  }
  return res.status(200).json(activity);
});

router.get('/activity/:id/timeslots', async (req: Request, res: Response) => {
  const {id} = req.params;
  const timeslots = await readTimeslotsByActivity(Number(id));
  if (!timeslots || timeslots.length === 0) {
    return res.status(404).end();
  }
  return res.status(200).json(timeslots);
});

export default router;
