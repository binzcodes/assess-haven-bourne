import {logger} from './logger';
import app from './app';

import {initialiseDB} from './db';

import {loadData} from './load';
const PORT = 8080;

initialiseDB();

// waiting for DB to initialise - quick and hacky
setTimeout(() => loadData(), 15000);

// start server
app.listen(PORT, () => {
  logger.info(`listening at http://localhost:${PORT}`);
});

export default app;
