import { IChatMessage } from "@src/types/interface";

interface ChatMessageProps extends IChatMessage {
  isOwnMessage: boolean;
}

const ChatMessage = (props: ChatMessageProps) => {
  const { message, isOwnMessage } = props;

  return (
    <div
      className={`flex w-full ${
        isOwnMessage ? "justify-end" : "justify-start"
      } my-1`}
    >
      <p
        className={`max-w-lg px-4 py-2 rounded-xl shadow-inner text-sm break-words 
            ${
              isOwnMessage
                ? "bg-purple-500 text-white self-end"
                : "bg-sky-500 text-white self-start"
            }`}
      >
        {message}
      </p>
    </div>
  );
};

export default ChatMessage;
