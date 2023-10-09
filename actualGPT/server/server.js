import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import {OpenAI} from "openai";

dotenv.config();

// const configuration = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

const openai = new OpenAI({
    apiKey: "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",
  });

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello fro Codex',
    })
});

app.post('/', async (req, res) => {
    try {
      const prompt = req.body.prompt;
  
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ "role": "user", "content": `${prompt}` }],
        temperature: 1, // Higher values means the model will take more risks.
        max_tokens: 256, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
        top_p: 1, // alternative to sampling with temperature, called nucleus sampling
        frequency_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
        presence_penalty: 0,
    });
    
  
      res.status(200).send({
        bot: response.choices[0].message.content
      });
  
    } catch (error) {
      console.error(error)
      res.status(500).send(error || 'Something went wrong');
    }
  })
  
  app.listen(5000, () => console.log('AI server started on http://localhost:5000'))