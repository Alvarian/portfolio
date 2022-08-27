import archiver from 'archiver'
import { WritableStreamBuffer } from 'stream-buffers'
import fileType from 'file-type'
import { AES, enc } from "crypto-js"
import { reject } from 'lodash';


export async function encryptAndPushCode(bundleFile: any, secret_key: string) {
  let bundleContents = bundleFile[0].buffer.toString('utf-8');
  const encryptedData = AES.encrypt(bundleContents, secret_key).toString();
  
  return {
    encryptedData, // zip and buffer
    secret_key
  };
}

export function getDecryptedData(encryption: string, secret: string) {
  const decryptedData = AES.decrypt(encryption, secret).toString(enc.Utf8);

  return decryptedData;
}

export function zipDataIntoStream(fileData: any, ...media: any) {
  return new Promise((resolve, reject) => {
    let outputStreamBuffer = new WritableStreamBuffer({
      initialSize: (1000 * 1024),   // start at 1000 kilobytes.
      incrementAmount: (1000 * 1024) // grow by 1000 kilobytes each time buffer overflows.
    });

    let archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });
    archive.pipe(outputStreamBuffer);
    
    archive.append(fileData, { name: "project.txt"});
    archive.finalize();

    outputStreamBuffer.on('finish', async function () {
      const finishedBuffer = outputStreamBuffer.getContents();
      if (!finishedBuffer) return reject("Finished buffer incorrect")
      
      const {fileTypeFromBuffer} = await fileType;
      const mimetype = await fileTypeFromBuffer(finishedBuffer);
      if (!mimetype) return reject("Mimetype incorrect")

      resolve({
        buffer: finishedBuffer,
        mimetype: mimetype.mime
      });
    });
  });
}

export async function determineAndGetChanges(files: any, body: any, encrypt: any, zip: any) {
  const previousFields = JSON.parse(body.previousFieldsPayload);

  delete body.createdAt;
  delete body.updatedAt;
  delete body.previousFieldsPayload;
  delete body.projectType;
  delete body.id;

  async function bundleAndReturnListOfFiles(app: string) {
    const { 
      encryptedData, 
      secret_key
    } = await encrypt(app);
    const project = await zip(encryptedData);
    body.secret_key = secret_key;

    return {name: "core", data: project.buffer, type: project.mimetype};;
  }

  const fileCollection = Object.keys(files);
  const filesArrayIfExist = [];
  for (const fileKey of fileCollection) {
    const file = files[fileKey];
    
    if (file[0].fieldname === "app") {
      const encryptedAndZipped = await bundleAndReturnListOfFiles(file);
      filesArrayIfExist.push(encryptedAndZipped);
    } else {
      filesArrayIfExist.push({name: "icon", data: file[0].buffer, type: file[0].mimetype});
    }
  }

  const acceptedFields: any = {};
  for (const key in body) {
    const value = body[key];
    const previousValue = previousFields[key];

    if (value !== previousValue) {
      acceptedFields[key] = value;
    }
  }

  return {
    filesArrayIfExist,
    acceptedFields
  };
}