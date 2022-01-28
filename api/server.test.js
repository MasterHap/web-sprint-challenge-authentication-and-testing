// Write your tests here
const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')
const bcrypt = require('bcrypt')

test('sanity', () => {
  expect(true)
})
describe('[POST] /auth/register', () => {
  test('[1] saves the user with a bcrypted password instead of plain text', async () => {
    await request(server).post('/auth/register').send({ username: 'jake', password: '1234' })
    const jake = await db('users').where('username', 'jake').first()
    expect(bcrypt.compareSync('1234', jake.password)).toBeTruthy()
  }, 750)
  test('[2] responds with proper status on success', async () => {
    const res = await request(server).post('/auth/register').send({ username: 'jake', password: '1234' })
    expect(res.status).toBe(201)
  }, 750)
})