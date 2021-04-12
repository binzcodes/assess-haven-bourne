import {Router} from 'express';
import * as ctrl from './ctrl';

const router = Router();

router.get('/', ctrl.get);

// validate request has properly formatted id
router.use('/:id', ctrl.validate);
router.get('/:id', ctrl.getOne);
router.get('/:id/timeslots', ctrl.getTimeslots);

export default router;
