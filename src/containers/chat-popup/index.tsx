import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@src/components/button";
import { Input } from "@src/components/input";
import { useAppSelector } from "@src/redux/hooks";

import { ChatMessage } from "../chat-message";
import { LoadingDots } from "../loading-dots";

import { schema } from "./schema";

type FormValues = yup.InferType<typeof schema>;

export interface IChatMessageProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatPopup: React.FC<IChatMessageProps> = ({ isOpen, onClose }) => {
  const portfolioState = useAppSelector((state) => state.portfolio);

  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: yupResolver(schema),

    mode: "onBlur",
  });

  const messagesEndRef = useRef<any>(null);

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const [conversation, setConversation] = useState([
    { text: "Hello, how can I help you?", isUser: false },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  if (!isOpen) return null;

  const onSubmit = async (data: FormValues) => {
    setConversation([...conversation, { text: data.message, isUser: true }]);
    scrollToBottom();

    let question = data.message;

    if (conversation.length < 3) {
      question += `Here is some additional context:

        ${portfolioState.portfolio.map(
          (company) => `Company name: ${company.company_name}
        
        News about it: ${company.news}

        Sentiment: ${company.sentiment!.label} (${company.sentiment!.value})
        `
        )}
        
        
        Please write the answer directly, without refering to the data that I gave you.

        Just give me a suggestion about the questions, and try to omit the "As an AI model, I do not [...]" part.
        Try to describe your decision, using multiple factors, elaborate.
`;
    }

    setLoading(true);
    reset();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_COSMIN_API_URL}/ask`,
      {
        question,
      }
    );

    console.log({ response });

    const answer = response.data.answer;

    setConversation((conv) => [...conv, { text: answer, isUser: false }]);
    scrollToBottom();

    setLoading(false);
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

        {loading && <LoadingDots />}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex justify-around">
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full justify-between"
          >
            <Input
              autoComplete="off"
              id="message"
              disabled={loading}
              type="text"
              className="flex-grow p-2 border border-gray-300 rounded-l"
              placeholder="Type your message..."
            />

            <Button
              type="submit"
              disabled={loading}
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
