import {TimeSlot} from '../entities';

export async function readByActivityId(
  activityId: number
): Promise<TimeSlot[]> {
  return await TimeSlot.find({
    where: {Activity: {Id: activityId}, Deleted: false},
  });
}
