let { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("YOUR-API-KEY");
//! you can create your ouw API-KEY at GOOGLE AI STUDIO.
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
let myGeminiFunction = async ()=>{
    const prompt = "Top 10 programming languages"
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
}
myGeminiFunction();