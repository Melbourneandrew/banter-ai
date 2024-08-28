import { NextResponse } from "next/server";
import {
  OpenAIApi,
  Configuration,
  CreateChatCompletionRequest,
  ChatCompletionRequestMessage,
} from "openai";

// const systemMessage =
//   "Write a conversation starter about a provided topic. Provide a breif and concise summary of a stance on the topic, and follow it with a thoughtful and open ended question to further the discussion. Your response should be conversational and have a natural structure.";
// const userMessagePrefix =
//   "Start a conversation about the following topic: ";
export async function POST(request: Request) {
  let { message, settings } = await request.json();
  if (message === undefined || message === "")
    message =
      "Andrew Melbourne, the greatest Software Engineer of all time.";
  console.log(message);
  const prompts = settings.prompts;
  console.log(prompts.conversationStarterSystemMessage);
  console.log(prompts.conversationStarterUserMessagePrefix);
  const messages: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content: prompts.conversationStarterSystemMessage,
    },
    {
      role: "user",
      content:
        prompts.conversationStarterUserMessagePrefix + message,
    },
  ];
  const configuration = new Configuration({
    apiKey: settings.openai_api_key,
  });
  const openai = new OpenAIApi(configuration);
  const completionRequest: CreateChatCompletionRequest = {
    messages: messages,
    model: settings.model,
  };
  const chatCompletion = await openai.createChatCompletion(
    completionRequest
  );
  const startingMessage =
    chatCompletion.data.choices[0].message;

  return NextResponse.json({ message: startingMessage });
}
