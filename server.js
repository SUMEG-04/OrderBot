const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
const dotenv = require('dotenv').config({ path: './.env' });
const app = express();
const port = process.env.SERVER_PORT || 3001;

const openai = new OpenAI({
  apiKey: process.env.MY_OPENAI_API_KEY,
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post('/services', async (req, res) => {
  const { prompt } = req.body;

  try {
    // Send the entire conversation history (prompt) to OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: prompt,
      temperature: 0,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const assistantResponse = response.choices[0].message.content;

    // Send the assistant's response back to the client
    res.json({ response: assistantResponse });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
