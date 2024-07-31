const Chat = require('../models/chat.js');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

exports.getChatResponse = async (req, res) => {
  const { user, message } = req.body;
  try {
    const aiResponse = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: message,
      max_tokens: 150,
    });

    const responseText = aiResponse.data.choices[0].text.trim();
    const chat = new Chat({ user, message, response: responseText });
    await chat.save();

    res.status(200).json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
