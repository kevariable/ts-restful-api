import express from 'express'
import { publicRouter } from '../route/public-api'
import { errorMiddleware } from '../middleware/validation'
import { apiRouter } from '../route/api'

export const web = express()

web
    .use(express.json())
    .use(publicRouter)
    .use(apiRouter)
    .use(errorMiddleware)
