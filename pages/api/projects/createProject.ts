import { encryptAndPushCode, zipDataIntoStream } from "helpers/projectCryptionHandlers";
import { createOrUpdate } from "helpers/s3";
import multer from "multer"
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const upload = multer({ dest: "" })

const apiRoute = nc<NextApiRequest, NextApiResponse>({
  onError: (error, req, res) => {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch: (req, res) => {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array('files'));

interface MulterRequest extends NextApiRequest {
  files: {file: string, originalname: string, mimetype: string, size: number, buffer: string}[];
}
apiRoute.post(async (req: MulterRequest, res: NextApiResponse) => {
  const { title, version } = req.body;
  const icon = req.files[0]
  const app = req.files[1]
      
  try {
    const { 
      encryptedData
    } = await encryptAndPushCode(app, process.env.NEXT_PUBLIC_CRYPTION_KEY as string);
    const project = await zipDataIntoStream(encryptedData);
    
    await createOrUpdate(
      [
        {name: "core", data: app.buffer, type: app.mimetype},
        {name: "icon", data: icon.buffer, type: icon.mimetype}
      ], 
      {
        title,
        version
      }
    );
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