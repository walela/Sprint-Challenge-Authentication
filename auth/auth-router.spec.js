const request = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')

beforeAll(async () => {
  await db('users').truncate()
})

describe('auth router', () => {
  describe('[POST] / register', () => {
    it('should register a user with valid credentials', () => {
      const testUser = { username: 'austin', password: '12345' }
      return request(server)
        .post('/api/auth/register')
        .send(testUser)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .then(res => {
          expect(res.status).toBe(201)
          expect(res.header['content-type']).toMatch(/json/)
        })
    })
    it('should not register user with invalid credentials', () => {
      const new_user = {
        username: 'lonzo'
      }
      return request(server)
        .post('/api/auth/register')
        .send(new_user)
        .then(res => {
          expect(res.status).toBe(400)
        })
    })
  })

  describe('[POST] / login', () => {
    it('should not allow user with invalid credentials log in', () => {
      const existing_user = {
        username: 'admin'
      }
      return request(server)
        .post('/api/auth/login')
        .send(existing_user)
        .then(res => {
          expect(res.status).toBe(400)
        })
    })
    it('should correctly error out given invalid credentials', () => {
      const existing_user = {
        username: 'admin'
      }

      const expectedBody = {
        message: 'Error. Both username and password required'
      }
      return request(server)
        .post('/api/auth/login')
        .send(existing_user)
        .then(res => {
          expect(res.body).toEqual(expectedBody)
        })
    })
  })
})
