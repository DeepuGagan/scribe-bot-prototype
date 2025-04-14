import { ChatGPTAPI } from 'chatgpt'
const chatgptAPI = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY })

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
	try {
		const { title = '' } = req.query
		const prompt = `Suggest 1 news article headings on ${title}`
		let {text} = await chatgptAPI.sendMessage(prompt)
        console.log(text)
        const suggestedTitles = text.split('\n')
        debugger
		return res.status(200).json(suggestedTitles[0])
	} catch(err) {
		console.error(`err: ${err}`)
		return res.status(500).json({ error: 'Invalid request' })
	}
}
