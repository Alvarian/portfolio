import Redis from 'ioredis'

export default (req: any, res: any) => {
    try {
        const redis: any = new Promise((resolve, reject) => {
            const client = new Redis(process.env.NEXT_PUBLIC_REDIS_URL)
            client.on("error", function (err: any) {
              reject({
                line: 224,
                file: "pages/index",
                time: now.minimal,
                msg: "redis connection is unaccepted"
              })
            })
      
            client.on("ready", function () {
                resolve(client)
            })
        })

        const mostRecentChallenge = await redis.get('mostRecentSolution')
  
        res.statusCode = 200
        res.json(mostRecentChallenge);
    } catch (err) {
        console.log(err)
        res.statusCode = 400
    }
}