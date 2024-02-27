import { getDecryptedData } from "helpers/projectCryptionHandlers"
import { getOneAndUnzip } from "helpers/s3"
import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { keyName } = req.query as { keyName: string };
    
        const encryption = await getOneAndUnzip(keyName) as string
    
        const decryption = getDecryptedData(encryption, process.env.NEXT_PUBLIC_CRYPTION_KEY as string)
        res.statusCode = 200
        res.json(decryption)
    } catch(err) {
        console.log(err)
        res.statusCode = 400
        res.json({
            data: {
                ok: false,
                msg: JSON.stringify({err})
            }
        })
    }
}