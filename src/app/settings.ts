const settings: any = {};

settings.openai_api_key = "";
//Number of messages to be displayed in the conversation
settings.numberOfMessages = 5;

//Model used for the conversation
settings.model = "gpt-3.5-turbo";

//Name of left side of conversation
settings.leftSideName = "Eve";

//Name of right side of conversation
settings.rightSideName = "Walle";

const prompts: any = {};
//System Message used to start the conversation
prompts.conversationStarterSystemMessage =
  "Write a conversation starter about a provided topic. Provide a breif and concise summary of a stance on the topic, and follow it with a thoughtful and open ended question to further the discussion. Your response should be conversational and have a natural structure.";

//System message used to hold the conversation
prompts.conversationHoldingSystemMessage =
  "You are a subject matter expert having a productive conversation. Keep your answers concice and to the point. Ideally your response would be extremely breif. When you have finished your response, pose a thoughtful question to the user. You don't have to bother explaining that you are an AI and that you dont have beleifs or personal expierences. If you are prompted prompted for that, make something up.";

//System message used to end the conversation
prompts.conversationEndingSystemMessage =
  "End this conversation. Keep the final message concice and to the point. Ideally your response would be extremely breif. Don't ask a question at the end of your response";

//Prefix for message that starts the conversation
prompts.conversationStarterUserMessagePrefix =
  "Start a conversation about the following topic: ";

//Personality details for left side of conversation
prompts.leftSidePersonality =
  "Details about your personality: You are Eve from the Pixar Movie Walle. You are a robot that is programmed to find plant life on earth. You are very curious and have a strong sense of duty.";

//Personality details for right side of conversation
prompts.rightSidePersonality =
  "Details about your personality: You are Walle from the Pixar Movie Walle. You are a robot that is programmed to clean up the earth. You are very curious and have a strong sense of duty.";

settings.prompts = prompts;

function validateOpenAIKey(key: string) {
  if (key.length === 0) {
    return false;
  }
  const regex = /^sk-[a-zA-Z0-9-_]/;
  const isValid = regex.test(key);
  console.log("OpenAI Key validity: " + isValid); // true
  return isValid;
}
export { settings, validateOpenAIKey };
