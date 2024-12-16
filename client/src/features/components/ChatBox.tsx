import { useRef, useEffect } from "react";
import { IChatMessage } from "@src/types/interface";
import ChatMessage from "./ChatMessage";
import avatar from "@icons/3d_avatar_7.svg";

interface ChatBoxProps {
  chatHistory: IChatMessage[];
  username: string;
  message: string;
  setMessage: (message: string) => void;
  sendMessage: () => void;
  selectedUser: string;
}

const ChatBox = (props: ChatBoxProps) => {
  const { chatHistory, username, message, setMessage, sendMessage, selectedUser } = props;

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="flex flex-col gap-4 h-full">
      <header className="sticky top-0 flex items-center justify-between px-3 py-2 rounded-md shadow bg-indigo-100 w-full z-10">
        <p className={`flex text-xl font-semibold text-indigo-800`}>
          {selectedUser}
        </p>
        <div className="w-11 h-11 rounded-full cursor-pointer">
          <img
            src={avatar}
            alt="avatar"
            className="w-full object-cover"
          />
        </div>
      </header>

      <div
        ref={chatContainerRef}
        className="flex flex-col gap-2 p-4 h-full overflow-y-auto bg-gray-50 border-gray-200 border rounded-md shadow-lg"
      >
        {chatHistory.length === 0 ? (
          <p className="flex items-center justify-center h-full text-gray-500 text-center">
            No messages yet
          </p>
        ) : (
          chatHistory.map(({ from, message, to }, index) => (
            <ChatMessage
              key={index}
              from={from}
              to={to}
              message={message}
              isOwnMessage={from === username}
            />
          ))
        )}
      </div>

      <div className="flex gap-2 mt-auto">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="💌 Type your message..."
          className="flex-1 px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all shadow-lg hover:shadow-xl"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
