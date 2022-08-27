import aws from "aws-sdk"
import unzipper from "unzipper"


aws.config.update({
	secretAccessKey: process.env.NEXT_PUBLIC_ACCESS_SECRET_KEY,
	accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
	region: process.env.NEXT_PUBLIC_REGION_NAME
});

const s3 = new aws.S3();

export async function createOrUpdate(files: any, fields: any) {
  let errMsg: any[] = [];
  for (let file of files) {
    if (file.name === "core" && file.name === "icon") return

    const corePath = `${fields.title}/${fields.version}`;
    const iconPath = `${fields.title}/${file.name}`;
    
    s3.upload({
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME as string, // pass your bucket name
      Key: corePath || iconPath,
      Body: file.data,
      ContentType: file.type,
      CacheControl: "max-age=0"
    }, function(err: any, data: any) {
      console.log("PRINT FILE:", file);
      if (err) {
        errMsg.push(err)
      } else {
        console.log('Successfully uploaded data', data);
      }
    });
  }

  if (errMsg.length) throw errMsg;

  if(files[0]?.data) {fields.app = `${process.env.NEXT_PUBLIC_S3_ROOT_URL}/${fields.title}/${fields.version}`;}
  if(files[1]?.data) {fields.icon = `${process.env.NEXT_PUBLIC_S3_ROOT_URL}/${fields.title}/${files[1].name}`;}
}

export function getOneAndUnzip(keyName: string) {
  return new Promise(function (resolve, reject) {
    s3
      .getObject({ Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME as string, Key: keyName })
      .createReadStream()
      .on("error", (e) => reject(`Error extracting file`))
      .pipe(unzipper.Parse())
      .on("entry", async function (data) {
        const unzippedBuff = await data.buffer();
        const encryptedContent = await unzippedBuff.toString('utf8')

        resolve(encryptedContent);
      });
  });
}
