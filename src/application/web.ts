import express from 'express'
import { publicRouter } from '../route/public-api'
import { errorMiddleware } from '../middleware/validation'
import { apiRouter } from '../route/api'

export const web = express()

BigInt.prototype.toJSON = function () {
  return this.toString()
}

web.use(express.json()).use(publicRouter).use(apiRouter).use(errorMiddleware)
