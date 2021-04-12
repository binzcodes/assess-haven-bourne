import {Activity, TimeSlot} from '../entities';

export async function read(): Promise<Activity[]> {
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

export async function readOne(activityID: number): Promise<Activity> {
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
    .getOneOrFail();
}

export async function timeslots(activityID: number): Promise<TimeSlot[]> {
  return await TimeSlot.find({
    where: {Activity: {Id: activityID}, Deleted: false},
  });
}
