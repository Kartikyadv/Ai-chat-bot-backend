const axios = require('axios');
require('dotenv').config();

// Get AI response from Ollama API
async function getResponse(prompt) {
    try {
        const response = await axios.post('http://localhost:11434/api/generate', {
            prompt: prompt,
            model: "llama3",
            stream: false
        });
        return response.data.response;
    } catch (error) {
        console.error('Error calling Ollama API:', error);
        return {
            Message: 'Sorry, I could not process your request.',
            error: error
        };
    }
}

module.exports = {
    getResponse
};