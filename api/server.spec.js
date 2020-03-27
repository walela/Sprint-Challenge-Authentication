const request = require('supertest')
const server = require('./server')

describe('server', () => {
  describe('[GET] / endpoint', () => {
    it('returns the correct HTTP status', async () => {
      const res = await request(server).get('/')
      expect(res.status).toBe(200)
    })
    it('returns the correct message', async () => {
      const res = await request(server).get('/')
      console.log(res)
      expect(res.body.message).toBe('API is up!')
    })
  })
})
