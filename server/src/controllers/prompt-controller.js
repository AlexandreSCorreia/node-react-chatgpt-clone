const inputPrompt = require("../models/input-prompt")
const openai = require("../config/openai")
const GoogleGenAI = require('../config/googleGenerativeAI');

module.exports = {
	async sendTextOpenAi(req, res){
		const openaiAPI = openai.configuration()
		const inputModel = new inputPrompt(req.body)

		try {
			const response = await openaiAPI.createCompletion(
				openai.textCompletion(inputModel)
			)

			return res.status(200).json({
				sucess: true,
				data: response.data.choices[0].text
			})
		} catch (error) {
			return res.status(400).json({
				sucess: false,
				error: error.response
				? error.response.data
				: 'There was an inssue on the server'
			})
		}
	},
	async sendTextGoogleGenerativeAI(req, res){
		const { prompt } = new inputPrompt(req.body)

		try {
			const googleGenAI = new GoogleGenAI();
			const result = await googleGenAI.generateText({ modelName: "gemini-1.5-flash", prompt: prompt });
			return res.status(200).json({
				sucess: true,
				data: result
			})
		} catch (error) {
			return res.status(400).json({
				sucess: false,
				error: error.response
				? error.response.data
				: 'There was an inssue on the server'
			})
		}
	}
}
