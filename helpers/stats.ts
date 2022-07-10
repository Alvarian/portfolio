export const getUserData = async () => {
  const response = await (await fetch("https://www.codewars.com/api/v1/users/Alvarian_")).json()
  
  if (!response.success && !response.id) throw "User data fetch failed"

  return response
}

export const getChallengesData = async () => {
  const response = await (await fetch("https://www.codewars.com/api/v1/users/Alvarian_/code-challenges/completed")).json()

  if (!response.success && !response.data) throw "Challenges data fetch failed"

  return response
}

export const getMostRecentChallengeData = async (recentChallengeId: string) => await (await fetch(`https://www.codewars.com/api/v1/code-challenges/${recentChallengeId}`)).json()
