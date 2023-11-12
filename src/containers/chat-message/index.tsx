export interface IChatMessageProps {
  text: string;
  isUser: boolean;
}

export const ChatMessage: React.FC<IChatMessageProps> = ({ text, isUser }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-2/3 p-2 rounded-lg ${
          isUser ? "bg-blue-300" : "bg-gray-200"
        }`}
      >
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
};
