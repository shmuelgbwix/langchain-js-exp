import { OpenAI } from 'langchain/llms/openai';
import { SerpAPI } from 'langchain/tools';
import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import { BufferMemory } from 'langchain/memory';
import { ConversationChain } from 'langchain/chains';
import * as dotenv from 'dotenv';

dotenv.config();
const key = process.env.OPENAI_API_KEY;

export const runSimple = async () => {
  try {
    const model = new OpenAI({ openAIApiKey: key, temperature: 0.1 });
    const res = await model.call('css for green button');

    console.log({ res });
    return res;
  } catch (err) {
    console.log({ err });
  }
};
runSimple();

export const runAgent = async () => {
  try {
    const model = new OpenAI({ openAIApiKey: key, temperature: 0.1 });
    const tools = [new SerpAPI()];
    const agent = await initializeAgentExecutorWithOptions(tools, model);
    const input = 'List countries in Afrika';
    const res = await agent.call({ input });

    console.log({ res });
    return res;
  } catch (err) {
    console.log({ err });
  }
};

export const runWithMemory = async () => {
  try {
    const model = new OpenAI({ openAIApiKey: key, temperature: 0.1 });
    const memory = new BufferMemory();
    const chain = new ConversationChain({ llm: model, memory });
    const firstRes = await chain.call({ input: 'Hello! my name is Shmuel' });
    console.log({ firstRes });
    const secondRes = await chain.call({ input: "What's my name?" });
    console.log({ secondRes });

    return { firstRes, secondRes };
  } catch (err) {
    console.log({ err });
  }
};
