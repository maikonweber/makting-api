const time = require('../Controllers/time')
const  app  = require('../server')
const request = require('supertest');

test('Test the controller time', async () => {
const res = await request(app).get('/api/time')
expect(res.body).toEqual({ ts : Date.now() - 4})
})