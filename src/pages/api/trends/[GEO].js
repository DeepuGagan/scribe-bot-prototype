const googleTrends = require('google-trends-api');

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function trends(req, res) {
	try {
		const { GEO = 'IN' } = req.query
		const today = new Date().toISOString().split('T')[0]
		const trendOutput = await googleTrends.dailyTrends({
			trendDate: new Date(today),
			geo: GEO,
		})
		const { default: { trendingSearchesDays: [trendingToday,] } } = JSON.parse(trendOutput)
		const { trendingSearches } = trendingToday
		const trendingTopics = trendingSearches.map(({ title: { query } }) => query)
		return res.status(200).json(trendingTopics)
	} catch(err) {
		console.error(`err: ${err}`)
		return res.status(500).json({ error: 'Invalid request' })
	}  
}
