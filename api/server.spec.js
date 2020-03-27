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
      expect(res.body.message).toBe('API is up!')
    })
  })

  describe('[GET] any invalid endpoint', () => {
    it('returns the correct HTTP status', async () => {
      const res = await request(server).get('/foo')
      expect(res.status).toBe(404)
    })
    it('returns the correct message', async () => {
      const res = await request(server).get('/foobar')
      expect(res.error.text).toBe('Not Found')
    })
  })
})
