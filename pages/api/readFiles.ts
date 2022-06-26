import fs from 'fs'
import path from 'path'
import getConfig from 'next/config'

export default (req: any, res: any) => {
  const { serverRuntimeConfig } = getConfig()

  const dirRelativeToPublicFolder = 'img'

  const dir = path.join(serverRuntimeConfig.PROJECT_ROOT, './public', dirRelativeToPublicFolder);

  const filenames = fs.readdirSync(dir);

  const images = filenames.map(name => path.join('/', dirRelativeToPublicFolder, name))

  res.statusCode = 200
  res.json(images);
}
// next.config.js
module.exports = {
    serverRuntimeConfig: {
        PROJECT_ROOT: __dirname
    }
}