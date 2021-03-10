import {Activity, TimeSlot, Category, Location} from './entities';

import {Connection, createConnection, getConnection, getConnectionManager, getRepository} from 'typeorm';
import 'reflect-metadata';
import {logger} from "./logger";

export const connection = {
  async connect() {
    logger.debug('estabilishing pg connection')
    await createConnection();
    logger.debug('pg connection established')
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


// const connectionManager = getConnectionManager()

// export const connection = connectionManager.create({
//   name: 'default',
//   type: 'postgres',
//     url: 'postgres://postgres:postgres@postgres',
//     database: 'test',
//     synchronize: true,
//     // logging: true,
//     entities: [
//         Activity,
//         Location,
//         TimeSlot,
//         Category,
//     ],
//     cache: {
//         duration: 30 * 1000, // 30s cache for demo, in prod 1s for realtime
//         type: "redis",
//         options: {
//             host: "redis",
//             port: 6379
//         }
//     }
// })

// export const connection = createConnection({
//   name: 'default',
//   type: 'postgres',
//   url: 'postgres://postgres:postgres@postgres',
//   database: 'test',
//   synchronize: true,
//   // logging: true,
//   entities: [
//     Activity,
//     Location,
//     TimeSlot,
//     Category,
//   ],
//   cache: {
//     duration: 30 * 1000, // 30s cache for demo, in prod 1s for realtime
//     type: "redis",
//     options: {
//       host: "redis",
//       port: 6379
//     }
//   }
// })


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
