import express, { type Request, type Response } from 'express'
import * as crypto from 'crypto'
const app = express()
const port = process.env.PORT ?? 3000

app.use(express.json())
app.use(express.urlencoded())

app.get('/ping', (_req: Request, res: Response) => {
  res.send('pong')
})

app.get('/resources', function getResources (_req: Request, res: Response) {
  res.statusCode = 200
  res.send([{ id: `rs-${crypto.randomUUID()}`, title: 'name' }])
})

app.post('/resources', function createResource (req: Request, res: Response) {
  res.statusCode = 201
  res.send({ id: `rs-${crypto.randomUUID()}`, title: req.body?.title })
})

app.put('/resources/:id', function updateResource (req: Request, res: Response) {
  res.statusCode = 200
  res.send({ id: req.params.id, title: req.body.title })
})

app.delete('/resources/:id', function deleteResource (_req: Request, res: Response) {
  res.statusCode = 204
  res.send()
})

const server = app.listen(port, () => {
  console.info(`Express is listening at http://localhost:${port}`)
})

export { app, server }
