const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 8082;

// Initialize Google Generative AI with your API key
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
const genAI = new GoogleGenerativeAI("AIzaSyCyvvw1MVUFdaWrzKh0cdujcAoxA85HIK8"); //! you can generate the api key from Google AI Studio
// API endpoint to generate data based on user's prompt
app.post("/generate", async (req, res) => {
  console.log("Received request:", req.body); // Log the request body
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const userPrompt = req.body.prompt;
    // Verify the model call
    const result = await model.generateContent(userPrompt);
    // const result = await model.generateContent("Hello World Program in c++");
    const generatedText = await result.response.text();

    if (generatedText) {
      res.json({ text: generatedText });
    } else {
      res.status(500).json({ error: "No content generated." });
    }
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Error generating content." });
  }
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
