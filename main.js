// This imports the new Gemini LLM
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// This imports the mechanism that helps create the messages
// called `prompts` we send to the LLM
import { PromptTemplate } from "langchain/prompts";

// This imports the tool called `chains` that helps combine 
// the model and prompts so we can communicate with the LLM
import { LLMChain } from "langchain/chains";

// This helps connect to our .env file
import dotenv from "dotenv";
 
// Import the userInput module using ES module syntax
import userInput from './userInput.js';

import fs from 'fs';

dotenv.config();

async function main() {
  // Get user input for the prompt
  const userPrompt = await userInput.prompt('Enter system input: ');


  // Get user input for the prompt
  const userPrompt2 = await userInput.prompt('Enter user input: ');


  // Create a prompt template with user inputs
  const promptTemplate = new PromptTemplate({
    template: userPrompt,
    inputVariables: ["prompt"],
  });

  // Create the model instance
  const geminiModel = new ChatGoogleGenerativeAI({
    modelName: "gemini-pro",
  });

  // Create an LLM chain
  const llmChain = new LLMChain({
    llm: geminiModel,
    prompt: promptTemplate,
  });

  // Call the LLM chain with user input prompt
  const result = await llmChain.call({
    prompt: userPrompt2,
  });

  // Log the result to the console
  console.log(result.text);
  appendToLogFile('Model Output: ' + result.text);

}

// Function to append log information to a text file
function appendToLogFile(log) {
  fs.appendFileSync('log.txt', log + '\n', 'utf8');
}


// Call the main function
main();
