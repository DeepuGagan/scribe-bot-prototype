const { Configuration, OpenAIApi } = require("openai")

export default async function generateArticle(req = {}, res) {
  console.log('req.body', req.body.inputText)
  const { body = '' } = req
  console.log("typeof ", typeof req.body)
  const reqBodyType = typeof req.body
  try {

    const { inputText = '' } = reqBodyType == 'string' ? JSON.parse(body) : body
    if (!inputText || !process.env.OPENAI_API_KEY) {
      return res.status(400).json({ message: 'please provide input' })
    }
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    })
    const openai = new OpenAIApi(configuration)
    console.log("now making request")
    const {
      data: {
        choices = []
      } = {}
    } = await openai.createCompletion({
      model: "text-davinci-003",
      // prompt: "Write a article on A.I dominating over humans",
      prompt: inputText,
      temperature: 1,
      max_tokens: 2056,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })

    const openAiResponses = choices.reduce((acc, { text }) => ({ ...acc, text: text.replace("\n", "") }), {})
    return res.status(200).json({ openAiResponses })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Something went wrong' })
  }

}


//without using package or modules of openAI (via axios)
// const axios = require('axios').default

// const API_ENDPOINT = 'https://api.openai.com/v1/engines/text-davinci-003/completions'

// const prompt = `Write an paragraph about the benefits of meditation.`

// const requestBody = {
//   prompt: prompt,
//   temperature: 0.5,
//   max_tokens: 2048,
//   n: 1,
//   stop: '.'
// }

// const headers = {
//   'Content-Type': 'application/json',
//   'Authorization': 'Bearer key-removed-here'
// }

// axios.post(API_ENDPOINT, requestBody, { headers: headers })
//   .then(response => {
//     console.log(response.data.choices[0].text)
//   })
//   .catch(error => {
//     console.log(error.response.data)
//   })
