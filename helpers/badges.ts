export const getBadgrAuthTokens = async (redis: any) => {
  const hasAccessToken = await redis.get('portfolioAccess')
  const hasRefreshToken = await redis.get('portfolioRefresh')

  if (!hasRefreshToken || !hasAccessToken) {
    const response: {
      [key: string]: string | number
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

export const getBadgrCollectionsData = async (accessToken: string) => await (await fetch("https://api.badgr.io/v2/backpack/collections/DBRj-SFzTRu1ZscR12JQ5g", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }
})).json()

export const getNewAccessToken = async (refresh_token: string) => await (await fetch('https://api.badgr.io/o/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: `grant_type=refresh_token&refresh_token=${refresh_token}`
})).json()

export const getBadgrBadgeData = async (assertion: string, hasAccessToken: string) => await (await fetch(`https://api.badgr.io/v2/backpack/assertions/${assertion}`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${hasAccessToken}`,
    'Content-Type': 'application/json'
  }
})).json()

export const getBadgrBadgeDecriptions = async (badgeclassOpenBadgeId: string) => {
  const response = await (await fetch(badgeclassOpenBadgeId, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  })).json()
  if (!response.metadata && !response.id) throw "Badge descriptions could not be fetched"

  return response
}