import {logger} from './logger';
import app from './app';

import {initialise} from './db';

import {loadData} from './load';

const PORT = 8080;

(async () => {
  await initialise();

  // hacky - wait for DB to initialise
  // setTimeout(() => loadData(), 15000);
  // await loadData();

  // start server
  app.listen(PORT, () => {
    logger.info(`listening at http://localhost:${PORT}`);
  });
})();

export default app;
