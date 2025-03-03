const { saveChat, getChatHistory, findOrCreateUser } = require('../models/chatModel');
const { getResponse } = require('../services/ollamaService');

// Start the chat
async function handleMessage(req, res) {
    const { email, message } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    try {
        // Check if the user exists or create a new user
        const user = await findOrCreateUser(email);

        // If no message is provided, it means the user is starting a new chat
        if (!message) {
            return res.json({ message: 'Welcome to the chatbot! You can start asking questions.' });
        }

        // Get AI response from Ollama API
        const aiResponse = await getResponse(message);

        // Save chat to database
        await saveChat(email, message, aiResponse);

        // Return AI response
        return res.json({ message: aiResponse });
    } catch (error) {
        console.error('Error in chatController:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}


// Get chat history for a user
async function getChat(req, res) {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    try {
        const history = await getChatHistory(email);
        return res.json({ chatHistory: history });
    } catch (error) {
        console.error('Error fetching chat history:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

module.exports = {
    handleMessage,
    getChat
};