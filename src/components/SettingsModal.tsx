import { useState } from "react";

export default function SettingsModal(props: any) {
  return (
    <dialog id="settings_modal" className="modal">
      <div className="modal-box flex flex-col w-11/12 max-w-6xl">
        <h3 className="font-bold text-xl mb-3">
          Settings!{" "}
          <span className="font-normal text-lg">
            (Click out to save)
          </span>
        </h3>
        <div className="mb-2">
          <p className="font-bold">OpenAI API Key</p>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={props.settings.openai_api_key}
            onChange={(e) => {
              props.setSettings({
                ...props.settings,
                openai_api_key: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-2">
          <p className="font-bold">Number of messages</p>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={props.settings.numberOfMessages}
            onChange={(e) => {
              () => console.log("Change");
              props.setSettings({
                ...props.settings,
                numberOfMessages: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-2">
          <p className="font-bold">Model</p>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={props.settings.model}
            onChange={(e) => {
              props.setSettings({
                ...props.settings,
                model: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-2">
          <p className="font-bold">Left Side Name</p>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={props.settings.leftSideName}
            onChange={(e) => {
              props.setSettings({
                ...props.settings,
                leftSideName: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-2">
          <p className="font-bold">Right Side Name</p>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={props.settings.rightSideName}
            onChange={(e) => {
              props.setSettings({
                ...props.settings,
                rightSideName: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-2">
          <p className="font-bold">
            Conversation starter system messsage
          </p>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Enter prompt..."
            value={
              props.settings.prompts
                .conversationStarterSystemMessage
            }
            onChange={(e) => {
              props.setSettings({
                ...props.settings,
                prompts: {
                  ...props.settings.prompts,
                  conversationStarterSystemMessage:
                    e.target.value,
                },
              });
            }}
          ></textarea>
        </div>
        <div className="mb-2">
          <p className="font-bold">
            Conversation starter user message prefix
          </p>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Enter prompt..."
            value={
              props.settings.prompts
                .conversationStarterUserMessagePrefix
            }
            onChange={(e) => {
              props.setSettings({
                ...props.settings,
                prompts: {
                  ...props.settings.prompts,
                  conversationStarterUserMessagePrefix:
                    e.target.value,
                },
              });
            }}
          ></textarea>
        </div>
        <div className="mb-2">
          <p className="font-bold">
            Conversation Holding System Message
          </p>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Enter prompt..."
            value={
              props.settings.prompts
                .conversationHoldingSystemMessage
            }
            onChange={(e) => {
              props.setSettings({
                ...props.settings,
                prompts: {
                  ...props.settings.prompts,
                  conversationHoldingSystemMessage:
                    e.target.value,
                },
              });
            }}
          ></textarea>
        </div>
        <div className="mb-2">
          <p className="font-bold">
            Conversation Ending System Message
          </p>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Enter prompt..."
            value={
              props.settings.prompts
                .conversationEndingSystemMessage
            }
            onChange={(e) => {
              props.setSettings({
                ...props.settings,
                prompts: {
                  ...props.settings.prompts,
                  conversationEndingSystemMessage:
                    e.target.value,
                },
              });
            }}
          ></textarea>
        </div>
        <div className="mb-2">
          <p className="font-bold">
            Left Side Personality Details
          </p>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Enter prompt..."
            value={props.settings.prompts.leftSidePersonality}
            onChange={(e) => {
              props.setSettings({
                ...props.settings,
                prompts: {
                  ...props.settings.prompts,
                  leftSidePersonality: e.target.value,
                },
              });
            }}
          ></textarea>
        </div>
        <div className="mb-2">
          <p className="font-bold">
            Right Side Personality Details
          </p>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Enter prompt..."
            value={props.settings.prompts.rightSidePersonality}
            onChange={(e) => {
              props.setSettings({
                ...props.settings,
                prompts: {
                  ...props.settings.prompts,
                  rightSidePersonality: e.target.value,
                },
              });
            }}
          ></textarea>
          <form method="dialog">
            <button className="btn btn-outline">Close</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
