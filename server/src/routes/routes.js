const express = require('express')
const promptController = require('../controllers/prompt-controller')
const routes = express.Router()

routes.post('/api/prompt-openai', promptController.sendTextOpenAi)
routes.post('/api/prompt-googlegenerativeai', promptController.sendTextGoogleGenerativeAI)

module.exports = routes
