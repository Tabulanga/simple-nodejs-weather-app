const { JSDOM } = require("jsdom");
const request = require('supertest');
const app = require('../server');

describe('Test index page', () => {

  afterAll(() => {
    app.close();
  })

  test('GET method response page contains fields for input city', async (done) => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.type).toBe('text/html');

    const { document } = (new JSDOM(response.text)).window;
    expect(document.querySelector('input[name=city][placeholder="Enter a City"]')).not.toBeNull();
    expect(document.querySelector('input[type=submit][value="Get Weather"]')).not.toBeNull();
    done()
  });

  test('Test snapshot (update snapshot, if the templatepage was changed)', async (done) => {
    const response = await request(app).get('/');

    expect(response.text).toMatchSnapshot();
    done()
  });
});