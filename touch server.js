const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/analyze", async (req, res) => {
  const { resume } = req.body;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Analyze this resume:\n${resume}`
      }
    ],
  });

  res.json({
    result: response.choices[0].message.content
  });
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
