import fs from 'fs'
import path from 'path'
import getConfig from 'next/config'

export default (req: any, res: any) => {
  try {
    const { serverRuntimeConfig } = getConfig()

    const dirRelativeToPublicFolder = 'badgeCoat'

    const dir = path.join(serverRuntimeConfig.PROJECT_ROOT, './public/images', dirRelativeToPublicFolder);

    const filenames = fs.readdirSync(dir);

    const images = filenames.map(name => path.join('/images', dirRelativeToPublicFolder, name))

    res.statusCode = 200
    res.json(images);
  } catch (err) {
    console.log(err)
    res.statusCode = 400
  }
}