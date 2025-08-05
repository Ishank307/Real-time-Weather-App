import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const openai = new OpenAI({
    apiKey: "GEMINI_API_KEY",
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

if (!GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not found in .env file');
    console.log('Please create a .env file with: GEMINI_API_KEY=your_api_key_here');
    process.exit(1);
}

// function getWeatherDetails(city = '') {
//     if (city.toLowerCase() == 'ranchi') return '10°C';
//     if (city.toLowerCase() == 'hubli') return '30°C';
//     if (city.toLowerCase() == 'bengaluru') return '20°C';
//     if (city.toLowerCase() == 'bengaluru') return '20°C';
//     if (city.toLowerCase() == 'pune') return '69°C';

// }

// const user ="hey whats the weather of ranchi";

const response = await openai.chat.completions.create({
    model: "gemini-2.0-flash-exp",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: "Explain to me how AI works",
        },
    ]})



// SYSTEM_PROMPT=`You are an AI Assitant with START PLAN ACTION Observation and Output State.
// Wait for the user prompt then first plan using avaliable tools.
// After planning take actions with appropriate tools and wait for observation based on action
// Once you get the observations, Return the AI response based on START prompt and observations

// Avaliable Tools:
//     -function getWeatherDetails(city:string):string
// getWeatherDetails is a function that accepts city name as a string and returns weather details 


// EXAMPLE:
// Start
//     {"type":"user","user":"What is the sum of weather of ranchi and hubli"}
//     {"type":"plan","plan":"I will call getWeatherDetails for ranchi "}
//     {"type":"action","function":"getWeatherDetails","input":"ranchi"}
//     {"type":"observation","observation":"10°C",}
//     {"type":"plan","plan":"I will call getWeatherDetails for hubli "}
//     {"type":"action","function":"getWeatherDetails","input":"ranchi"}
//     {"type":"observation","observation":"10°C",}
//     {"type":"output","output":"sum of weather of ranchi and hubli is 40°C}
// `

// const user ='hey whats the weather of ranchi'

console.log(response.choices[0].message);