import {Activity, Category, Location, TimeSlot} from './entities';
import {logger} from './logger';

interface LoadActivity extends Activity {
  CategoryId: number;
  CategoryName: string;
  Locations?: Location[];
}

export async function loadData() {
  logger.info('loading data');
  const rawdata = require('fs').readFileSync('data/activities.json');
  const jsondata = JSON.parse(rawdata);
  const timeSlots: TimeSlot[] = [];
  const data = jsondata.Data;

  let activityCounter = 0;
  let timeslotCounter = 0;

  // push data into pg
  for (const a in data) {
    const activity: LoadActivity = data[a];
    activityCounter++;

    activity.Category = {
      Id: activity.CategoryId,
      Name: activity.CategoryName,
    } as Category;

    // inserts note: save will update
    await Activity.save(activity)
      .then(() =>
        !(activityCounter % 100)
          ? logger.info(`loaded ${activityCounter} of ${data.length}`)
          : null
      )
      .catch(e => logger.error(e.message));

    // This is a workaround for TypeORMs save function failing to insert deep when is sees a duplicate
    for (const l in activity.Locations) {
      const location: Location = activity.Locations[Number(l)];
      location.Activities = [activity as Activity]; // workaround duplicate failing to load downstream
      await Location.save(location).catch(e => logger.error(e.message));

      for (const t in location.TimeSlots) {
        timeslotCounter++;
        const timeslot: TimeSlot = location.TimeSlots[Number(t)];
        delete location.Activities;
        // delete location.TimeSlots
        // delete activity.Locations
        timeslot.Activity = activity as Activity;
        timeslot.Location = location as Location;
        timeSlots.push(timeslot);
        await TimeSlot.save(timeslot).catch(e => logger.error(e.message));
      }
    }
  }
  timeSlots.map((timeSlot: TimeSlot) => TimeSlot.save(timeSlot));
  logger.info(`loaded ${activityCounter} of ${data.length}`);
  return;
}
