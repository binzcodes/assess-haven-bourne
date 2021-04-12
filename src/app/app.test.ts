import app from '.';
import request from 'supertest';

it('Get the ping endpoint', async done => {
  // Sends GET Request to /test endpoint
  request(app)
    .get('/ping')
    .then(res => {
      expect(res.status).toBe(200);
      expect(res.body.ping).toBe('pong');
    });
  done();
});

describe('testing routes', () => {});
