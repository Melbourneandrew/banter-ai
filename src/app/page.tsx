/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { useState } from "react";
import { settings, validateOpenAIKey } from "./settings";
import SettingsIcon from "@/components/SettingsIcon";
import SettingsModal from "@/components/SettingsModal";

type ChatMessage = {
  role: string;
  content: string;
};
declare const window: any;

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [chatSettings, setChatSettings] = useState(settings);
  const [showGetStartedMessage, setShowGetStartedMessage] =
    useState(true);

  const startChat = async () => {
    var messageList = [];
    setMessages([]);
    console.log(chatSettings);
    if (chatSettings.openai_api_key === "") {
      alert(
        "Please enter an OpenAI API Key in the settings menu"
      );
      return;
    }
    if (
      validateOpenAIKey(chatSettings.openai_api_key) === false
    ) {
      alert(
        "The OpenAI API Key you entered is invalid. Please enter a valid key in the settings menu"
      );
      return;
    }
    if (message === "") {
      alert("Please enter a message to start the chat");
      return;
    }
    setShowGetStartedMessage(false);

    const data = await fetch("/api/start-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: message,
        settings: chatSettings,
      }),
    });
    const response = await data.json();
    console.log(response);
    setMessages([response.message]);
    messageList.push(response.message);
    for (let i = 0; i < chatSettings.numberOfMessages; i++) {
      console.log(messageList);
      const data = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messageList,
          settings: chatSettings,
        }),
      });
      const response = await data.json();
      console.log(response);
      setMessages(response.messages);
      messageList = response.messages;
    }
  };
  return (
    <div className="max-w-[1200px] min-w-[800px] m-auto pb-10">
      <div className="flex items-center justify-center p-5 space-x-2">
        <input
          type="text"
          placeholder="Get the conversation started..."
          className="input input-bordered w-full max-w-xs "
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button className="btn btn-outline" onClick={startChat}>
          Start
        </button>
        <div className="relative">
          <button
            className="btn btn-outline"
            onClick={() => window.settings_modal.showModal()}
          >
            <SettingsIcon />
          </button>
          {showGetStartedMessage && (
            <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 whitespace-nowrap">
              ⬅️ Enter an OpenAI API key to get started!
            </span>
          )}
        </div>
        <SettingsModal
          settings={chatSettings}
          setSettings={setChatSettings}
        />
      </div>
      {/*For some reason, I need to put blank chat bubbles in before list rendering or it looks wrong*/}
      <div className="chat chat-start opacity-0 h-0">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full"></div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50"></time>
        </div>
        <div className="chat-bubble"></div>
        <div className="chat-footer opacity-50"></div>
      </div>
      <div className="chat chat-end opacity-0 h-0">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full"></div>
        </div>
        <div className="chat-header"></div>
        <div className="chat-bubble"></div>
        <div className="chat-footer opacity-50"></div>
      </div>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`chat chat-${
            message?.role === "assistant" ? "start" : "end"
          }`}
          // className={`chat chat-start`}
        >
          <div className="chat-image avatar">
            <div className="w-14 rounded-full">
              <img
                src={
                  message.role === "assistant"
                    ? "/assets/evepfp.png"
                    : "/assets/wallepfp.jpeg"
                }
                alt="Profile pic"
              />
            </div>
          </div>
          <div className="chat-header">
            {message?.role === "assistant"
              ? settings.leftSideName
              : settings.rightSideName}
          </div>
          <div className="chat-bubble text-gray-300 text-lg p-4 px-5">
            {message?.content}
          </div>
        </div>
      ))}
    </div>
  );
}
