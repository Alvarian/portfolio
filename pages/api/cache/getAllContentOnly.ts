import Redis from "ioredis"
import { formatDate } from "lib/sections/sections.methods"
import moment from "moment-timezone"
import { NextApiRequest, NextApiResponse } from "next"


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const notifications: {
        error: unknown,
        warnings: unknown[]
    } = {
        error: null,
        warnings: []
    }
    
    const now = formatDate(moment.tz(new Date(), "America/New_York").format())  

    try {
        if (!process.env.NEXT_PUBLIC_REDIS_URL) throw {
            line: 35,
            file: "pages/api/cache/getAllContentOnly",
            msg: "Missing Redis Credentials"
        }

        const redis: Redis = await (new Promise((resolve, reject) => {
            const client = new Redis(process.env.NEXT_PUBLIC_REDIS_URL as string)
            client.on("error", function () {
                reject({
                    line: 22,
                    file: "pages/api/cache/getAllContentOnly",
                    msg: "redis connection is unaccepted"
                })
            })
        
            client.on("ready", function () {
                resolve(client)
            })
        }))

        const portfolioCache = await redis.get('portfolioCache')
        if (!portfolioCache) throw {
            line: 43,
            file: "pages/api/cache/getAllContentOnly",
            msg: "Missing Portfolio Cache"
        }

        const payload = {
            setting: 'external',
            data: JSON.parse(portfolioCache).data
        }

        res.statusCode = 200
        res.json(payload)
    } catch (err) {
        notifications.error = err
        
        res.statusCode = 400
        res.json({
          setting: "local",
          err
        })
    } finally {
        if ((notifications.error || notifications.warnings.length) && process.env.NEXT_PUBLIC_NOTIFICATION_MAILING_SERVICE) {
          fetch(process.env.NEXT_PUBLIC_NOTIFICATION_MAILING_SERVICE, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(notifications)
          })
            .catch((err: unknown) => console.log(err))
        }
    }
}