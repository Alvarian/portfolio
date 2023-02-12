![](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white)
![](https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white)
![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
***

# Introduction
A full stack, NextJS(typescript), application that serves to be my portfolio. To help simplify the styling, I turned to Daisy UI to help with initial layouts and component abstractions. Section contents are dynamically loaded from third party API's, each pertaining to data from a personal records. 

The API's are:
- Badgr
- Github API
- Codewars
- AWS S3 Bucket

Cloudflare is used aswell as a worker to call weekly to a portfolio's endpoint meant to refresh content and content persistance. Content persistance is possible with the use of redis on Upstash that gathers and all API data and also serving it primarily to the sections. Another additional is a ![logger API written in flask](https://github.com/Alvarian/mailing-microservice) to notify me if the server has issues. These are optional for the next step.

## Getting Started
Before getting started, make sure your device has terminal access to [npm](https://docs.npmjs.com/cli/init). Then start an account with [codewars](https://www.codewars.com/). Here is the list of all necessary variables in order for it to run:
```
NEXT_PUBLIC_S3_ROOT_URL=
NEXT_PUBLIC_BUCKET_NAME=
NEXT_PUBLIC_REGION_NAME=
NEXT_PUBLIC_ACCESS_SECRET_KEY=
NEXT_PUBLIC_ACCESS_KEY_ID=

NEXT_PUBLIC_CRYPTION_KEY=

NEXT_PUBLIC_GITHUB_TOKEN=

NEXT_PUBLIC_NOTIFICATION_MAILING_SERVICE=
NEXT_PUBLIC_REDIS_URL=

NEXT_PUBLIC_BADGR_PASS=
NEXT_PUBLIC_BADGR_USER=
```

* `NEXT_PUBLIC_CRYPTION_KEY`: A random key used to decrypt modular sources, such as [Rivalry](https://github.com/Alvarian/rivalry) that was encrypted with the same key in [a depracated project](https://github.com/Alvarian/apps-sandbox-dashboard) that also compiles into a module and sends it to AWS.
* `NEXT_PUBLIC_GITHUB_TOKEN`: [Visit github API to help get your token.]()
* `NEXT_PUBLIC_S3_ROOT_URL, NEXT_PUBLIC_BUCKET_NAME, NEXT_PUBLIC_REGION_NAME, NEXT_PUBLIC_ACCESS_SECRET_KEY, NEXT_PUBLIC_ACCESS_KEY_ID`: [Create your own AWS account for console access to S3 and cloudfront.](https://aws.amazon.com/console/)
* `NEXT_PUBLIC_REDIS_URL`: [Start an account with upstash to have a redis instance.](https://upstash.com/) 
* `NEXT_PUBLIC_BADGR_USER, NEXT_PUBLIC_BADGR_PASS`: [Start a badgr account.](https://badgr.com) 


## Development
When done with setups run:

```
cp templateEnv.txt .env

npm install
```

Fill out all variables and run:

```
npm run dev
```

## Optional
Setup a [cloudflare worker](https://developers.cloudflare.com/workers/get-started/guide/) and select quick edit. In the editor field, put the code below and deploy:
```
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event));
})

addEventListener('scheduled', event => {
  event.waitUntil(handleRequest());
});

async function handleRequest(scheduledDate) {
  const res = await fetch('<APP_URL>/api/cache/refreshAllAndGetAllContent')

  return res
}
```

# References
- NextTS (https://nextjs.org/docs/basic-features/typescript)
- Typescript Typings (https://www.typescriptlang.org/docs/handbook/advanced-types.html)
- Parallax (https://www.w3schools.com/howto/howto_css_parallax.asp)
- AWS S3 (https://aws.amazon.com/s3/)
- Badgr API (https://api.badgr.io/docs/v2/)
- Codewars API (https://dev.codewars.com/#introduction)
- Github API (https://docs.github.com/en/rest)
- DaisyUI (https://daisyui.com/)

:octocat:

<!-- https://dvj70ijwahy8c.cloudfront.net/Portfolio/icon | # -->
