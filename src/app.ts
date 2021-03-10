import express, {Application} from 'express';
import cors from 'cors'
import helmet from 'helmet';
import morgan from 'morgan';
import errorHandler from './errorHandler';
import routes from './routes';
import {logger} from "./logger";

const app: Application = express();
// app.use(express.json());
app.use(cors())

// // Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
  logger.info('running in dev');
  app.use(morgan('combined'));
}

// // Security
if (process.env.NODE_ENV === 'production') {
  // @ts-ignore
  app.use(morgan('combined', { stream: logger.stream} ));
  app.use(helmet());
}

app.use('/', routes);

app.use(errorHandler);

// Export express instance
export default app;
