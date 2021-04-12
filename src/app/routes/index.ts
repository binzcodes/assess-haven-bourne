import {Router} from 'express';
import categories from './categories';
import activities from './activities';

const router = Router();

router.get('/ping', (req, res) => {
  res.json({message: 'pong'});
});

router.use('/categories', categories);

router.get('/activities', activities);

export default router;
