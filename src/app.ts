import express, { NextFunction, type Request, type Response } from 'express'
import * as crypto from 'crypto'
import { timer } from './decorators/timer'
import { errorHandler } from "./decorators/errorHandler";
import { HttpError } from "./HttpError";
const app = express()
const port = process.env.PORT ?? 3000

app.use(express.json())
app.use(express.urlencoded())

app.get('/ping', (_req: Request, res: Response) => {
  res.send('pong')
})

class Resources {
  @timer('HTTP GET ')
  async getResources (_req: Request, res: Response): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 100))
    res.statusCode = 200
    res.send([{ id: `rs-${crypto.randomUUID()}`, title: 'name' }])
  }

  @timer('HTTP POST ')
  async createResource (req: Request, res: Response): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 100))
    res.statusCode = 201
    res.send({ id: `rs-${crypto.randomUUID()}`, title: req.body?.title })
  }

  @timer('HTTP PUT ')
  async updateResource (req: Request, res: Response): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 100))
    res.statusCode = 200
    res.send({ id: req.params.id, title: req.body.title })
  }

  @timer('HTTP DELETE ')
  async deleteResource (_req: Request, res: Response): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 100))
    res.statusCode = 204
    res.send()
  }

  @timer('HTTP THROW')
  @errorHandler()
  alwaysThrow (_req: Request, res: Response, next: NextFunction) {
    throw new HttpError('this method always throw', 400);
    res.statusCode = 204
    res.send()
  }
}

const resources = new Resources()

app.get('/resources', resources.getResources)
app.post('/resources', resources.createResource)
app.put('/resources/:id', resources.updateResource)
app.delete('/resources/:id', resources.deleteResource)
app.get('/always-throw', resources.alwaysThrow)

const server = app.listen(port, () => {
  console.info(`Express is listening at http://localhost:${port}`)
})

export { app, server }
