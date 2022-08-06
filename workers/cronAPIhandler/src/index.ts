/**
 * Welcome to Cloudflare Workers! This is your first scheduled worker.
 *
 * - Run `wrangler dev --local` in your terminal to start a development server
 * - Run `curl "http://localhost:8787/cdn-cgi/mf/scheduled"` to trigger the scheduled event
 * - Go back to the console to see what your worker has logged
 * - Update the Cron trigger in wrangler.toml (see https://developers.cloudflare.com/workers/wrangler/configuration/#triggers)
 * - Run `wrangler publish --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/runtime-apis/scheduled-event/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	portfolio_data: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
}

export default {
	async scheduled(
		controller: ScheduledController,
		env: Env,
		ctx: ExecutionContext
	): Promise<void> {
		const hasGrandCachePayload: any = new Map()

		const getAPIjson: any = async (url: string, headersType: string, payloadType: string) => {
			const allHeaders: {[key: string]: {headers: any}} = {
				projects: {
					headers: {
						'Authorization': `token 123456`,
						'User-Agent': 'Alvarian'
					}
				}
			}

			switch (payloadType) {
				case "json": return await (await fetch(url, allHeaders[headersType])).json();
				case "text": return await (await fetch(url, allHeaders[headersType])).text();
				default: throw "Incorrect payload type"
			}
		}

		const projectsResponse = (await (await getAPIjson('https://api.github.com/search/repositories?q=user:Alvarian', 'projects', 'json')).items).filter((it: {description: string|null}) => it.description?.split("|")[2].trim().split(" ")[1].trim() === ":heavy_check_mark:")

		const getAPIProjects = async () => {
			const getServiceSlidesAndInstructionFromReadMe = async (projectName: string) => {
				const readmeContentList = (await getAPIjson(`https://raw.githubusercontent.com/Alvarian/${projectName}/master/README.md`, 'projects', 'text')).replace(/(\r\n|\n|\r)/gm, " ").split(":octocat:")
				const instructions = readmeContentList[0].trim()
				const hasSlides = (/\<\!\-\-([^}{]*)\-\-\>/g.exec(readmeContentList[1]))
				if (!hasSlides) throw "repo does not have slides"

				return {
					instructions,
					slides: JSON.parse(hasSlides[1].trim())
				}
			}

			const projects: Array<{[key:string]: any}> = []
			for (let it of projectsResponse) {
				const projectType = it.description?.split("|")[1].trim().split(" ")[2].trim()
				
				switch (projectType) {
					case "Service": projects.push({
						id: it.id,
						icon: "https://picsum.photos/id/233/620/620",
						title: it.name,
						description: it.description?.split("|")[0].trim(),
						stacks: await getAPIjson(it.languages_url, 'projects', 'json'),
						repo: it.html_url,
						lastUpdate: it.pushed_at,
						payload: {
							type: "Service",
							ref: await getServiceSlidesAndInstructionFromReadMe(it.name)
						}
					}); break;
					case "Script": projects.push({
						id: it.id,
						icon: "https://picsum.photos/id/233/620/620",
						title: it.name,
						description: it.description?.split("|")[0].trim(),
						stacks: await getAPIjson(it.languages_url, 'projects', 'json'),
						repo: it.html_url,
						lastUpdate: it.pushed_at,
						payload: {
							type: "Script",
							ref: it.homepage
						}
					}); break;
					case "Site": projects.push({
						id: it.id,
						icon: "https://picsum.photos/id/233/620/620",
						title: it.name,
						description: it.description?.split("|")[0].trim(),
						stacks: await getAPIjson(it.languages_url, 'projects', 'json'),
						repo: it.html_url,
						lastUpdate: it.pushed_at,
						payload: {
							type: "Site",
							ref: it.homepage
						}
					}); break;
				}
			}
			
			return projects
		}
		
		const cachedProjects = await env.portfolio_data.get("projectContent")

		if (!cachedProjects) {
			const projects = await getAPIProjects()

			await env.portfolio_data.put("projectContent", JSON.stringify(projects))
			hasGrandCachePayload.set("projects", projects)
		} else if (JSON.parse(cachedProjects)?.length !== projectsResponse.length) {
			const projects = await getAPIProjects()
			await env.portfolio_data.put("projectContent", JSON.stringify(projects))
			hasGrandCachePayload.set("projects", projects)
		}

		if (hasGrandCachePayload.size) {
			// get current grand cache, parse it, and store each section key into an object map
			const currentGrandCachePayload: string = await (await fetch('https://alvarian.dev/api/cache/getAllPortfolioContent')).json()
			const newGrandCachePayload = (() => {
				const newMap = new Map

				for (const [key, value] of Object.entries(JSON.parse(currentGrandCachePayload).data)) {
					newMap.set(key, value)
				}

				return newMap
			})()
			
			// replace or newly set each key from temp grand cache map into new grand cache map
			for (const [key, value] of hasGrandCachePayload) {
				newGrandCachePayload.set(key, value)
			}

			// stringify current grand cache and send it back to be rewritten
			console.log("load everything", JSON.stringify({data: Object.fromEntries(newGrandCachePayload)}))
		}

		env.portfolio_data.delete("projectContent")
	},
};
