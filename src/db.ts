import {createConnection, getConnection} from 'typeorm';
import 'reflect-metadata';
import {logger} from './logger';

export const connection = {
  async connect() {
    logger.debug('estabilishing pg connection');
    await createConnection();
    logger.debug('pg connection established');
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async entity => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};

export async function initialise(): Promise<void> {
  // await connection
  await connection.connect();
}

export async function close(): Promise<void> {
  await connection.close();
}
