import React, { useState } from "react";
import ChatbotMoving from "./ChatbotMoving";

import { RiSendPlaneFill } from "react-icons/ri";

const ChatBot = () => {
  const [isSmall, setIsSmall] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Add form submission logic here
  }

  return (
    <div className="flex flex-col bg-[#23252F] gap-10 h-screen justify-center items-center p-6">
      <div>
        <ChatbotMoving isSmall={isSmall} />
      </div>
      <div className="relative w-full max-w-md">
        <form className="flex">
          <input
            type="text"
            placeholder="Ask Anything..."
            onChange={(e) => {}}
            className="w-full pl-4 pr-14 py-3 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black border rounded-lg p-2 shadow-lg transition duration-200 ease-in-out"
            aria-label="Send"
            onClick={handleSubmit}
          >
            <RiSendPlaneFill className="text-lg" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
