// import {activities, categories, timeslots} from './services';

// can't mock else im just testing my tests.
// jest.mock('./db', () => ({
//   readCategories: jest.fn(),
//   readActivities: jest.fn(),
//   readActivitity: jest.fn(),
//   readTimeslotsByActivity: jest.fn(),
// }));

// test('readCategories', async () => {
// expect.assertions(2);
// const data = await categories.read();
// expect(data).toBeInstanceOf(Array);
// expect([categories]).toBeInstanceOf(Object);
// expect(categories.length).toEqual(4);
// expect(categories).toEqual(
//   expect.arrayContaining([
//     expect.objectContaining({
//       Id: expect.any(Number),
//       Name: expect.any(String),
//     })
//   ])
// );
// });

// test('readActivities', async () => {
// expect.assertions(2);
// const response = await activities.read();
// expect(response).toBeInstanceOf(Array);
// expect([response]).toBeInstanceOf(Object);
// expect(response).toEqual(
//   expect.arrayContaining([
//     expect.objectContaining({
//       Id: expect.any(Number),
//       Name: expect.any(String),
//       Duration: expect.any(Number),
//       Category: expect.objectContaining({
//         Id: expect.any(Number),
//         Name: expect.any(String),
//       }),
//       Locations: expect.arrayContaining([
//         expect.objectContaining({
//           Id: expect.any(Number),
//           Name: expect.any(String),
//           Capacity: expect.any(Number),
//           Tags: expect.any(Number),
//           // Deleted: expect(false),
//           TimeSlots: expect.arrayContaining([
//             expect.objectContaining({
//               Capacity: expect.any(Number),
//               RemainingCapacity: expect.any(Number),
//             }),
//           ]),
//         }),
//       ]),
//     }),
//   ])
// );
// });

// test('readActivitity', async () => {
// expect.assertions(2);
// const data = await activities.readOne(6);
// expect(data).toBeInstanceOf(Object);
// expect(data!.Locations).toBeInstanceOf(Array);
// expect(data).toEqual(
//   expect.objectContaining({
//     Id: expect.any(Number),
//     Name: expect.any(String),
//     Duration: expect.any(Number),
//     Category: expect.objectContaining({
//       Id: expect.any(Number),
//       Name: expect.any(String),
//     }),
//     Locations: expect.arrayContaining([
//       expect.objectContaining({
//         Id: expect.any(Number),
//         Name: expect.any(String),
//         Capacity: expect.any(Number),
//         Tags: expect.any(Number),
//         // Deleted: expect(false),
//         // Activities: expect.not,
//         TimeSlots: expect.arrayContaining([
//           expect.objectContaining({
//             Capacity: expect.any(Number),
//             RemainingCapacity: expect.any(Number)
//           })
//         ])
//       })
//     ])
//   })
// );
// });

// test('readTimeslotsByActivity', async () => {
// expect.assertions(2);
// const data = await timeslots.readByActivityId(6);
// expect(data).toBeInstanceOf(Array)
// expect(data).toEqual(
//   expect.arrayContaining([
//     expect.objectContaining({
//       Capacity: expect.any(Number),
//       RemainingCapacity: expect.any(Number),
//     }),
//   ])
// );
// });

export {};
