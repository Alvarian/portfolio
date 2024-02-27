import { determineAndGetChanges, encryptAndPushCode, zipDataIntoStream } from "helpers/projectCryptionHandlers";
import { createOrUpdate } from "helpers/s3";
import multer from "multer"
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from 'next-connect';

const upload = multer({ dest: "" })

const apiRoute = nextConnect({
    onError(error, req, res: NextApiResponse) {
      res.status(501).json({ error: `Sorry something HappenedMulterRequest! ${error.message}` });
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

interface MulterRequest extends NextApiRequest {
  files: {file: string, originalname: string, mimetype: string, size: number}[];
}
apiRoute.use(upload.array('files'));
apiRoute.put(async (req: MulterRequest, res) => {
  const { id } = req.body
      
  try {
    const {
        filesArrayIfExist, 
        acceptedFields
    } = await determineAndGetChanges(req.files, req.body, encryptAndPushCode, zipDataIntoStream, process.env.NEXT_PUBLIC_CRYPTION_KEY as string);
    acceptedFields.id = parseInt(id);
  
    await createOrUpdate(filesArrayIfExist, acceptedFields)
  } catch (err) {
    console.log(err);

    res.json({
        data: {
            ok: false,
            msg: JSON.stringify({err})
        }
    })
  }

  res.status(200).json({ data: 'success' });
});
  
export default apiRoute

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}