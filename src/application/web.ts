import express from 'express'
import { publicRouter } from '../route/public-api'
import { errorMiddleware } from '../middleware/validation'

export const web = express()

web
    .use(express.json())
    .use(publicRouter)
    .use(errorMiddleware)
