import { Badge, ContentFromREADME, MostrecentPayload, OverallPayload, Project } from "lib/sections/sections.types"


interface Now {
  month: string;
  day: number;
  year: number;
  minimal: string;
}

interface Notification {
  error: unknown;
  warnings: unknown[];
}

interface Stats {
  overallPayload: OverallPayload,
  mostRecentPayload: MostrecentPayload
}


export const getStats = async (makeDifferenceTrue: () => void, cachedData: Stats, redis: any, notifications: Notification, now: Now) => {
  const getUserData = async () => {
      const response = await (await fetch("https://www.codewars.com/api/v1/users/Alvarian_")).json()
      
      if (!response.success && !response.id) throw "User data fetch failed"
    
      return response
  }
    
  const getChallengesData = async () => {
      const response = await (await fetch("https://www.codewars.com/api/v1/users/Alvarian_/code-challenges/completed")).json()
    
      if (!response.success && !response.data) throw "Challenges data fetch failed"
    
      return response as {data:{id: string, completedAt: string, completedLanguages: string[]}[], totalItems: number}
  }
  
  const getMostRecentChallengeData = async (recentChallengeId: string) => {
    const response = await (await fetch(`https://www.codewars.com/api/v1/code-challenges/${recentChallengeId}`)).json()
  
    if (!response.success && !response.id) throw {
      line: 336,
      file: "pages/index",
      time: now.minimal,
      msg: "Challenge Id does not exist"
    }

    return response as MostrecentPayload
  }

  const challangesData = await getChallengesData()
  const userData = await getUserData()

  const overallStatsPayload: OverallPayload = {
    leaderBoardScore: userData.leaderboardPosition,
    totalCompleted: challangesData.totalItems,
    languagesTotal: (() => {
      let langaugeRecord: Record<string, number> = {}
      for (let challenge of challangesData.data) {
        for (let lang of challenge.completedLanguages) {
          if (!langaugeRecord[lang]) {
            langaugeRecord[lang] = 1
          } else {
            langaugeRecord[lang]++
          }
        }
      }

      return Object.entries(langaugeRecord).map(([k, v]) => ({name: k, value: v})) as OverallPayload["languagesTotal"]
    })()
  }

  const mostRecentChallengeData = await getMostRecentChallengeData(challangesData.data[0].id)

  const mostRecentPayload = new Map([
    ["title", mostRecentChallengeData.title],
    ["attemptedTotal", mostRecentChallengeData.attemptedTotal],
    ["completedTotal", mostRecentChallengeData.completedTotal],
    ["url", mostRecentChallengeData.url],
    ["tags", mostRecentChallengeData.tags],
    ["completionDate", challangesData.data[0].completedAt],
    ["languagesUsed", challangesData.data[0].completedLanguages]
  ] as Iterable<readonly [string, string|string[]|number|MostrecentPayload["solutions"]]>)

  const languagesUsed = mostRecentPayload.get("languagesUsed") as string[]
  
  const doesCacheMatchWithCodewarsLanguages = languagesUsed.map((langaugeFromCodeWars: string) => {
    return !!cachedData.mostRecentPayload.solutions.languages.find((lAndSFromCache: {[key: string]: string}) => lAndSFromCache.language === langaugeFromCodeWars)
  }).reduce((final: boolean, value: boolean) => final && value)

  cachedData.mostRecentPayload.title !== mostRecentPayload.get("title") && notifications.warnings.push({
    line: 360,
    file: "pages/index",
    time: now.minimal,
    msg: "warning, using old payload. update cache with the newest challenge completed"
  }) && makeDifferenceTrue()
    ||
  !doesCacheMatchWithCodewarsLanguages && cachedData.mostRecentPayload.title === mostRecentPayload.get("title") && notifications.warnings.push({
    line: 368,
    file: "pages/index",
    time: now.minimal,
    msg: "warning, all solutions are not included. update cache by including the solution for the newest language"
  }) && makeDifferenceTrue()

  mostRecentPayload.set("solutions", cachedData.mostRecentPayload.solutions)

  return {
    overallStatsPayload,
    mostRecentPayload: Object.fromEntries(mostRecentPayload),
  }
}

export const getProjects = async (makeDifferenceTrue: () => void, cachedData: Project[], now: Now) => {
  const sortAndStringify = (obj: any) => JSON.stringify(obj.sort((a: any, b: any) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)))
  
  const getAPIjson: any = async (url: string, payloadType: string) => {
    const headers = {
      headers: {
        'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        'User-Agent': 'Alvarian'
      }
    }

    switch (payloadType) {
      case "json": return await (await fetch(url, headers)).json();
      case "text": return await (await fetch(url, headers)).text();
      default: throw "Incorrect payload type"
    }
  }
  const allPresentableReposFetch = ((await getAPIjson('https://api.github.com/search/repositories?q=user:Alvarian', 'json')).items as {description: string|null, name: string, id: number, homepage: string, pushed_at: string, html_url: string, languages_url: string}[])
    .filter(({description}) => {
      if (typeof description === 'string' && description.split("|").length >= 2) {
        return description.split("|")[2].trim().split(" ")[1].trim() === ":heavy_check_mark:"
      }

      return false
    }) as {description: string, name: string, id: number, homepage: string, pushed_at: string, html_url: string, languages_url: string}[]
  const getContentFromReadMe = async (projectName: string) => {
    const readmeContentList = (await getAPIjson(`https://raw.githubusercontent.com/Alvarian/${projectName}/master/README.md`, 'text')).replace(/(\r\n|\n|\r)/gm, " ").split(":octocat:")

    const instructions = readmeContentList[0].trim()
    const hasContent: [string, string] = (readmeContentList[readmeContentList.length-1].slice(
      readmeContentList[1].indexOf("<!--") + 4,
      readmeContentList[1].lastIndexOf("-->")
    )).trim().split(" | ")

    if (!hasContent) throw "repo does not have slides"
    
    return {
      instructions,
      icon: hasContent[0],
      content: hasContent[1]
    }
  }

  const projects: Project[] = []
  for (let it of allPresentableReposFetch) {
    const projectType = it.description?.split("|")[1].trim().split(" ")[2].trim()
    const {icon, instructions, content} = await getContentFromReadMe(it.name)
    
    const stacks = Object.entries(await getAPIjson(it.languages_url, 'json') as {[key: string]: number})
      .map(([key, value]) => {
        return {
          name: key,
          value: value
        }
      })

    switch (projectType) {
      case "Service": projects.push({
        id: it.id,
        icon,
        title: it.name,
        description: it.description?.split("|")[0].trim(),
        stacks,
        repo: it.html_url,
        lastUpdate: it.pushed_at,
        payload: {
          type: "Service",
          ref: JSON.parse(content) as ContentFromREADME
        }
      }); break;
      case "Script": projects.push({
        id: it.id,
        icon,
        title: it.name,
        description: it.description?.split("|")[0].trim(),
        stacks,
        repo: it.html_url,
        lastUpdate: it.pushed_at,
        payload: {
          type: "Script",
          ref: content
        }
      }); break;
      case "Site": projects.push({
        id: it.id,
        icon,
        title: it.name,
        description: it.description?.split("|")[0].trim(),
        stacks,
        repo: it.html_url,
        lastUpdate: it.pushed_at,
        payload: {
          type: "Site",
          ref: it.homepage
        }
      }); break;
    }
  }
  
  console.log("projects:", sortAndStringify(projects) === sortAndStringify(cachedData))
  if (sortAndStringify(projects) === sortAndStringify(cachedData)) return cachedData
  makeDifferenceTrue()
  
  return projects
}

export const getBadges = async (makeDifferenceTrue: () => void, cachedData: {badges: Array<Badge>}, redis: any, now: Now) => {
  const sortAndStringify = (obj: any) => JSON.stringify(obj.sort((a: any, b: any) => (a.issuedOn > b.issuedOn) ? 1 : ((b.issuedOn > a.issuedOn) ? -1 : 0)))

  if (!process.env.NEXT_PUBLIC_BADGR_USER) throw {
    line: 207,
    file: "pages/index",
    time: now.minimal,
    msg: "Missing Badgr Username Credential"
  }
  
  if (!process.env.NEXT_PUBLIC_BADGR_PASS) throw {
    line: 214,
    file: "pages/index",
    time: now.minimal,
    msg: "Missing Badgr Password Credential"
  }
  
  const getBadgrAuthTokens = async () => {
    const hasAccessToken: string = await redis.get('portfolioAccess')
    const hasRefreshToken: string = await redis.get('portfolioRefresh')
  
    if (!hasRefreshToken || !hasAccessToken) {
      const response: {
        [key: string]: string 
      } = await (await fetch('https://api.badgr.io/o/token', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${process.env.NEXT_PUBLIC_BADGR_USER}&password=${process.env.NEXT_PUBLIC_BADGR_PASS}`
      })).json()
    
      if (response.error) throw "Invalid credentials required for new refresh token given"
      
      await redis.set("portfolioAccess", response.access_token)
      await redis.set("portfolioRefresh", response.refresh_token)
      return { hasAccessToken: response.access_token, hasRefreshToken: response.refresh_token }
    }
  
    return { hasAccessToken, hasRefreshToken }
  }
      
  const getBadgrCollectionsData = async (accessToken: string) => await (await fetch("https://api.badgr.io/v2/backpack/collections/DBRj-SFzTRu1ZscR12JQ5g", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })).json()
    
  const getNewAccessToken = async (refresh_token: string) => await (await fetch('https://api.badgr.io/o/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=refresh_token&refresh_token=${refresh_token}`
  })).json()
    
  const getBadgrBadgeData = async (assertion: string, hasAccessToken: string) => await (await fetch(`https://api.badgr.io/v2/backpack/assertions/${assertion}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${hasAccessToken}`,
      'Content-Type': 'application/json'
    }
  })).json()
    
  const getBadgrBadgeDecriptions = async (badgeclassOpenBadgeId: string, currentDate: string) => {
    const response = await (await fetch(badgeclassOpenBadgeId, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })).json()
    if (!response.metadata && !response.id) throw {
      line: 257,
      file: "helpers/badges",
      time: currentDate,        
      msg: "Badge descriptions could not be fetched"
    }
    
    return response
  }

  let { hasAccessToken, hasRefreshToken } = await getBadgrAuthTokens()

  const collectionData = (await (async () => {
    const data = await getBadgrCollectionsData(hasAccessToken)

    if (!data.status.success) {
      const hasNewTokens = await getNewAccessToken(hasRefreshToken)

      const isGrantedToGetTokens = (hasNewTokens.error) ? await getBadgrAuthTokens() : hasNewTokens

      const { access_token, refresh_token } = isGrantedToGetTokens
      hasAccessToken = access_token
      hasRefreshToken = refresh_token
      await redis.set('portfolioRefresh', refresh_token)
      await redis.set('portfolioAccess', access_token)

      const certainData = await getBadgrCollectionsData(access_token)
      return certainData
    }

    return data
  })()).result[0].assertions

  const badges: Array<Badge> = await Promise.all(collectionData.map(async (assertion: string) => {
    const badgeData = await getBadgrBadgeData(assertion, hasAccessToken)
    if (!badgeData.status.success) throw {
      line: 271,
      file: "pages/index",
      time: now.minimal,        
      msg: "Assertion is not found or access token is incorrect"
    }

    const {
      issuedOn,
      image,
      evidence,
      badgeclassOpenBadgeId
    } = badgeData.result[0]
    
    const {
      name,
      description,
      tags
    }: Record<string, string | Array<{[key: string]: string}>> = await getBadgrBadgeDecriptions(badgeclassOpenBadgeId, now.minimal)
    
    return {
      issuedOn,
      image,
      evidence,
      name,
      description,
      tags,
      rotations: {
        horizontal: 0,
        vertical: 0
      }
    }
  }))

  // console.log("badges:", sortAndStringify(badges) === sortAndStringify(cachedData.badges))
  if (sortAndStringify(badges) === sortAndStringify(cachedData.badges)) return {badges: cachedData.badges}
  makeDifferenceTrue()

  return {badges}
}
