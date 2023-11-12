import { useState } from "react";

import { ChatPopup } from "../chat-popup";

export const Chat: React.FC = () => {
  const [isChatOpen, setChatOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-4 right-4 bg-accent text-white p-4 rounded-full shadow-lg"
      >
        Chat with us!
      </button>
      <ChatPopup isOpen={isChatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
};
