import OpenAI from "openai";

import dotenv from "dotenv";
dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;


if (!GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not found in .env file');
    console.log('Please create a .env file with: GEMINI_API_KEY=your_api_key_here');
    process.exit(1);
}

const client = new OpenAI({
    apiKey: GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});



function getWeatherDetails(city = '') {
    if (city.toLowerCase() == 'ranchi') return '10°C';
    if (city.toLowerCase() == 'hubli') return '30°C';
    if (city.toLowerCase() == 'bengaluru') return '20°C';
    if (city.toLowerCase() == 'bengaluru') return '20°C';
    if (city.toLowerCase() == 'pune') return '69°C';

}

const SYSTEM_PROMPT=`You are an AI Assitant with START PLAN ACTION Observation and Output State.
Wait for the user prompt then first plan using avaliable tools.
After planning take actions with appropriate tools and wait for observation based on action
Once you get the observations, Return the AI response based on START prompt and observations

Avaliable Tools:
    -function getWeatherDetails(city:string):string
getWeatherDetails is a function that accepts city name as a string and returns weather details 


EXAMPLE:
Start
    {"type":"user","user":"What is the sum of weather of ranchi and hubli"}
    {"type":"plan","plan":"I will call getWeatherDetails for ranchi "}
    {"type":"action","function":"getWeatherDetails","input":"ranchi"}
    {"type":"observation","observation":"10°C",}
    {"type":"plan","plan":"I will call getWeatherDetails for hubli "}
    {"type":"action","function":"getWeatherDetails","input":"hubli"}
    {"type":"observation","observation":"30°C",}
    {"type":"output","output":"sum of weather of ranchi and hubli is 40°C}
`

const user ='hey whats the weather of ranchi'



async function chat() {
    const result=await client.chat.completions.create({
        model:"gemini-2.0-flash-exp",
        messages:[
            {role:'system',content: SYSTEM_PROMPT},
            {role:'developer',content: JSON.stringify({"type":"plan","plan":"I will call getWeatherDetails for ranchi to get the weather information."})},
            {role:'developer',content: JSON.stringify({"type":"action","function":"getWeatherDetails","input":"ranchi"})},
            {role:'developer',content: JSON.stringify({"type":"observation","observation":"40°C"})},
            
            // {role:'developer',
            //     content:'{"type":"plan","plan":"I will call getWeatherDetails for ranchi "}' 
            // },
            // {role:'developer',
            //     content:'{"type":"observation","observation":"I will call getWeatherDetails for ranchi "}' 
            // },
            {role:'user',content: user}
            
        ]
    })

    console.log(result.choices[0].message.content);
}

chat()