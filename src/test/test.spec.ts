import app from '../index'
import request from 'supertest'

describe('Testing my unique endpoint', () => {
  test('Testing the format response in my unique endpoint', async () => {
    await request(app).get('/countrys-in-world-cup/2006').expect(200).expect('Content-Type', /json/)
  })
})
