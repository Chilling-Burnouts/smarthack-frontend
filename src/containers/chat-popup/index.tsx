import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@src/components/button";
import { Input } from "@src/components/input";

import { ChatMessage } from "../chat-message";

import { schema } from "./schema";

type FormValues = yup.InferType<typeof schema>;

export interface IChatMessageProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatPopup: React.FC<IChatMessageProps> = ({ isOpen, onClose }) => {
  const form = useForm<FormValues>({
    resolver: yupResolver(schema),

    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const [conversation, setConversation] = useState([
    { text: "Hello, how can I help you?", isUser: false },
  ]);

  if (!isOpen) return null;

  const onSubmit = async (data: FormValues) => {
    setConversation([...conversation, { text: data.message, isUser: true }]);

    reset();
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 h-96 bg-white shadow-lg rounded-lg p-4 flex flex-col">
      <div className="flex justify-end items-center mb-4">
        <button onClick={onClose} className="mb-4 px-2 rounded-full">
          X
        </button>
      </div>

      <div className="overflow-y-auto flex-grow mb-2">
        {conversation.map((msg, index) => (
          <ChatMessage key={index} text={msg.text} isUser={msg.isUser} />
        ))}
      </div>

      <div className="flex justify-around">
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full justify-between"
          >
            <Input
              id="message"
              type="text"
              className="flex-grow p-2 border border-gray-300 rounded-l"
              placeholder="Type your message..."
            />

            <Button
              type="submit"
              className="ml-2 bg-blue-500 text-white p-2 rounded-r"
            >
              Send
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
