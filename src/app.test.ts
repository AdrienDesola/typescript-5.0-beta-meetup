import { app, server } from './app'
import request from 'supertest'
import crypto from 'crypto'

describe('App', () => {
  afterAll(() => {
    server.close()
  })
  describe('ping', () => {
    it('should return pong', async () => {
      const result = await request(app).get('/ping')
      expect(result.text).toEqual('pong')
      expect(result.statusCode).toEqual(200)
    })
  })
  describe('resources', () => {
    describe('get', () => {
      it('should return the resources', async () => {
        const result = await request(app).get('/resources')
        expect(result.statusCode).toEqual(200)
        expect(result.body).toBeInstanceOf(Array)
        expect(result.body).toHaveLength(1)
        expect(result.body).toEqual(expect.arrayContaining([expect.objectContaining({ id: expect.stringContaining('rs-') })]))
      })
    })
    describe('post', () => {
      it('should create a resource', async () => {
        const result = await request(app).post('/resources').send({
          title: 'name'
        })
        expect(result.statusCode).toEqual(201)
        expect(result.body).toBeInstanceOf(Object)
        expect(result.body).toEqual(expect.objectContaining({
          id: expect.stringContaining('rs-'),
          title: 'name'
        }))
      })
    })
    describe('put', () => {
      it('should update the resource', async () => {
        const id = `rs-${crypto.randomUUID()}`
        const result = await request(app).put(`/resources/${id}`).send({ title: 'name updated' })
        expect(result.statusCode).toEqual(200)
        expect(result.body).toBeInstanceOf(Object)
        expect(result.body).toMatchObject({ id, title: 'name updated' })
      })
    })
    describe('should delete the resource', () => {
      it('should return the resources', async () => {
        const id = crypto.randomUUID()
        const result = await request(app).delete(`/resources/:${id}`)
        expect(result.statusCode).toEqual(204)
      })
    })
  })
})
