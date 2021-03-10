import {Activity, TimeSlot, Category, Location} from './entities';
import {
  createConnection,
  getConnection,
  getRepository,
} from 'typeorm';
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

export async function initialiseDB(): Promise<void> {
  // await connection
  await connection.connect();
}

// export async function closeDB(): Promise<void> {
//   await connection.close();
// }

export async function readCategories(): Promise<Category[]> {
  return await getRepository(Category).find();
}

export async function readActivities(): Promise<Activity[]> {
  return await Activity.createQueryBuilder('Activity')
    .leftJoinAndSelect('Activity.Category', 'Category')
    .leftJoinAndSelect(
      'Activity.Locations',
      'Location',
      'Location.Deleted = false'
    )
    .leftJoinAndSelect(
      'Location.TimeSlots',
      'TimeSlot',
      'TimeSlot.Deleted = false'
    )
    .getMany();
}

export async function readActivity(
  activityID: number
): Promise<Activity | undefined> {
  return await Activity.createQueryBuilder('Activity')
    .leftJoinAndSelect('Activity.Category', 'Category')
    .leftJoinAndSelect(
      'Activity.Locations',
      'Location',
      'Location.Deleted = false'
    )
    .leftJoinAndSelect(
      'Location.TimeSlots',
      'TimeSlot',
      'TimeSlot.Deleted = false'
    )
    .where('Activity.Id = :id', {id: activityID})
    .getOne();
}

export async function readTimeslotsByActivity(
  activityID: number
): Promise<TimeSlot[]> {
  return await TimeSlot.find({
    where: {Activity: {Id: activityID}, Deleted: false},
  });
}
