import {Router} from 'express';
import * as ctrl from './ctrl';

const router = Router();

router.get('/', ctrl.get);
router.get('/:id', ctrl.getOne);
router.get('/post', ctrl.post);

export default router;
