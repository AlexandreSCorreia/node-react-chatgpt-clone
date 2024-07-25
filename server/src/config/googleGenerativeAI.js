const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

module.exports = class GoogleGenAI {
    constructor() {
        this.apiKey = process.env.GOOGLE_GENERATIVE_AI_KEY;
        if (!this.apiKey) {
            throw new Error("API key is not defined in the environment variables.");
        }
        this.client = new GoogleGenerativeAI(this.apiKey);
    }

    getModel(modelName) {
        return this.client.getGenerativeModel({ model: modelName });
    }

    async generateText({ modelName, prompt }) {
        try {
            const model = this.getModel(modelName);
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error("Error generating text:", error);
            throw error;
        }
    }
}
