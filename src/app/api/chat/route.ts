import { NextResponse } from "next/server";
import {
  OpenAIApi,
  Configuration,
  CreateChatCompletionRequest,
  ChatCompletionRequestMessage,
} from "openai";

export async function POST(request: Request) {
  let { messages, settings } = (await request.json()) as {
    messages: ChatCompletionRequestMessage[];
    settings: any;
  };
  const prompts = settings.prompts;
  //Check if messages will need to be reversed
  let reverse = false;
  let personalityDetails =
    settings.prompts.rightSidePersonality;
  if (messages[messages.length - 1].role === "assistant") {
    reverse = true;
    personalityDetails = settings.prompts.leftSidePersonality;
  }
  //Check if the conversation needs to end
  let endConversation = false;
  console.log(
    "Replying to message: " +
      messages.length +
      " of " +
      settings.numberOfMessages +
      ""
  );
  if (messages.length == settings.numberOfMessages) {
    endConversation = true;
  }

  //Switch user and assistant messages
  if (reverse) messages = reverseMessages(messages);
  //Set system message
  const systemMessage = endConversation
    ? prompts.conversationEndingSystemMessage
    : prompts.conversationHoldingSystemMessage;
  messages.unshift({
    role: "system",
    content: systemMessage + " " + personalityDetails,
  });

  //Get chat completion
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

  //Switch user and assistant messages
  let completedMessages = [
    ...messages,
    chatCompletion.data.choices[0].message,
  ];
  completedMessages.shift();
  if (reverse)
    completedMessages = reverseMessages(completedMessages);
  return NextResponse.json({
    messages: completedMessages,
  });
}

function reverseMessages(
  messages: ChatCompletionRequestMessage[] | any
): ChatCompletionRequestMessage[] {
  return messages.map(
    (message: ChatCompletionRequestMessage) => {
      if (message.role === "system") {
        return null;
      }
      if (message.role === "assistant") {
        return {
          role: "user",
          content: message.content,
        };
      }
      return {
        role: "assistant",
        content: message.content,
      };
    }
  );
}
