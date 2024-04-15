import {PrismaClient} from '@prisma/client'
import {logger} from "./logger";

export const prismaClient = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query'
        },
        {
            emit: 'event',
            level: 'error'
        },
        {
            emit: 'event',
            level: 'warn'
        },
        {
            emit: 'event',
            level: 'info'
        },
    ]
})

prismaClient.$on('error', (e: object) => {
    logger.debug(e)
})

prismaClient.$on('warn', (e: object) => {
    logger.warn(e)
})

prismaClient.$on('info', (e: object) => {
    logger.info(e)
})

prismaClient.$on('query', (e: object) => {
    logger.info(e)
})