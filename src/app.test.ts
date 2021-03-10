import app from './index';
import request from 'supertest';

it('Get the ping endpoint',  async done => {
  // Sends GET Request to /test endpoint
  request(app)
    .get('/ping')
    .then( res => {
      expect(res.status).toBe(200)
      expect(res.body.ping).toBe("pong")
    })
  done()
})


describe('testing routes', () => {

  describe('GET /categories', () => {
    it('Returns a list of categories', async (done) => {
      const result = await request(app).get('/categories').send();
      expect(result.status).toBe(200);
      expect(result.body).toBeInstanceOf(Array)
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            Id: expect.any(Number),
            Name: expect.any(String),
          })
        ])
      )
      done()
    });
  })

  describe('GET /activities', () => {
    it('Returns an array of activities and associated data', async (done) => {
      const result = await request(app).get('/activities').send();
      expect(result.status).toBe(200);
      // expect(result).toBeInstanceOf(Array)
      // expect(result).toEqual(
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
      //           Deleted: expect(false),
      //           Activities: expect.not,
      //           TimeSlots: expect.arrayContaining([
      //             expect.objectContaining({
      //               Capacity: expect.any(Number),
      //               RemainingCapacity: expect.any(Number)
      //             })
      //           ])
      //         })
      //       ])
      //     })
      //   ])
      // )
      done()
    });
  })

  describe('GET /activities/[activityId]', () => {
    it('Returns a specific activity and associated data', async (done) => {
      const result = await request(app).get('/activity/6').send();
      expect(result.status).toBe(200);
      // expect(result).toBeInstanceOf(Object)
      // expect(result).toEqual(
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
      //         Deleted: expect(false),
      //         Activities: expect.not,
      //         TimeSlots: expect.arrayContaining([
      //           expect.objectContaining({
      //             Capacity: expect.any(Number),
      //             RemainingCapacity: expect.any(Number)
      //           })
      //         ])
      //       })
      //     ])
      //   })
      // )
      done()
    });
  })

  describe('GET /activities/[activityId]/timeslots', () => {
    it("Returns a specific activity's timeslots data", async (done) => {
      const result = await request(app).get('/activity/6/timeslots').send();

      expect(result.status).toBe(200);
      // expect(result).toBeInstanceOf(Array)
      // expect(result).toEqual(
      //   expect.arrayContaining([
      //     expect.objectContaining({
      //       Capacity: expect.any(Number),
      //       RemainingCapacity: expect.any(Number)
      //     })
      //   ])
      // )
      done()
    });
  })

});
