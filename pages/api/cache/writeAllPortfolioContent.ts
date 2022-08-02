import Redis from 'ioredis'


export default async (req: any, res: any) => {
    try {
        if (!process.env.NEXT_PUBLIC_REDIS_URL) throw {
            line: 200,
            file: "pages/api/cache/getMostRecentChallenge",
            msg: "Missing Redis Credentials"
        }
        
        const redis: any = await (new Promise((resolve, reject) => {
            const client = new Redis(process.env.NEXT_PUBLIC_REDIS_URL as string)
            client.on("error", function (err: any) {
                reject({
                    line: 224,
                    file: "pages/index",
                    msg: "redis connection is unaccepted"
                })
            })
      
            client.on("ready", function () {
                resolve(client)
            })
        }))

        await redis.set('portfolioCache', req.body)
        
        res.statusCode = 200
        res.json("ok");
    } catch (err) {
        console.log(err)
        res.statusCode = 400
    }
}
