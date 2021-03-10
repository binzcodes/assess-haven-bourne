import {readActivities, readActivity, readCategories, readTimeslotsByActivity} from './db';

// can't mock else im just testing my tests.
// jest.mock('./db', () => ({
//   readCategories: jest.fn(),
//   readActivities: jest.fn(),
//   readActivitity: jest.fn(),
//   readTimeslotsByActivity: jest.fn(),
// }));

test('readCategories', async () => {
  // expect.assertions(2);
  const categories = await readCategories();
  expect(categories).toBeInstanceOf(Array);
  expect([categories]).toBeInstanceOf(Object);
  expect(categories.length).toEqual(4);

  expect(categories).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        Id: expect.any(Number),
        Name: expect.any(String),
      })
    ])
  );
});

test('readActivities', async () => {
  // expect.assertions(2);
  const activities = await readActivities();
  expect(activities).toBeInstanceOf(Array);
  expect([activities]).toBeInstanceOf(Object);
});

test('readActivitity', async () => {
  // expect.assertions(2);
  const activity = await readActivity(6);
  expect(activity).toBeInstanceOf(Object);
  expect(activity!.Locations).toBeInstanceOf(Array);
  expect(activity).toEqual(
    expect.objectContaining({
      Id: expect(6)
    })
  );
});

test('readTimeslotsByActivity', async () => {
  // expect.assertions(2);
  const timeslots = await readTimeslotsByActivity(6);
  expect(timeslots).toBeInstanceOf(Array)
  expect(timeslots).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        Capacity: expect.any(Number),
        RemainingCapacity: expect.any(Number)
      })
    ])
  )
});
