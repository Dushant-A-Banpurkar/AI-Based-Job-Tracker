import * as z from "zod"
import {createAgent,tool} from "langchain";
import {ChatOpenAI} from "@langchain/openai"
import * as dotenv from  "dotenv"

dotenv.config();


const resumeAnalysis=tool(({city})=>`It's always sunny in ${city}`,
{
    name:"get_weather",
    description:"Get the weather for a give city.",
    schema:z.object({
        city: z.string(),
    })
})

const model=new ChatOpenAI({
    modelName:"gpt-4o-mini",
    apiKey:process.env.OPENAI_API_KEY,
    temperature:0,
})

const agent=createAgent({
    model:model,
    tools:[getWeather],
});

console.log(
    await agent.invoke({
        messages:[{role:"user",content:"What's the weather in Chinchwad?"}]
    })
)