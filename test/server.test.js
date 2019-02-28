const request = require('supertest');
const app = require('../server');

describe('City name requests', () => {

  afterAll(() => {
    app.close();
  })

  test('request with correct city returns success result', async (done) => {
    const response = await request(app)
      .post('/')
      .send('city=Moscow')

    expect(response.type).toEqual("text/html");
    expect(response.text).toMatch(/degrees in Moscow/);
    done();
  });

  test('request with an unknown city returns an error message', async (done) => {
    const response = await request(app)
      .post('/')
      .send({ city: ''})
        
    expect(response.type).toEqual("text/html");
    expect(response.text).toMatch(/<p>Error, please try again<\/p>/);
    done();
  });
});
