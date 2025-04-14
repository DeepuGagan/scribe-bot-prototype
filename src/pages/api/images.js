const { Configuration, OpenAIApi } = require("openai")

export default async function generateArticle({ body }, res) {
    const {
        inputText: prompt,
        n = 2,
        size = "1024x1024",
    } = body // Extracting values from the POST request body

    try {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        })
        const openai = new OpenAIApi(configuration)
        const {
            data: {
                data: generatedImagesLinks = []
            } = {}
        } = await openai.createImage({
            prompt,
            n,
            size,
        })
        return res.status(200).json(generatedImagesLinks)
    } catch (error) {
        console.error(error)
        return res.status(504)
    }
}