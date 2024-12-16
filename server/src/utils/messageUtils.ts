import { IChatMessage } from "@src/types/chatTypes";
import { v4 as uuidv4 } from "uuid";
import { readFileData, writeFileData } from "./helper";
import { CHAT_FILE_PATH } from "@src/config/config";

const initialData = { messages: [] };

export const addMessage = async (
  message: Omit<IChatMessage, "id" | "timestamp" | "unread">
): Promise<IChatMessage> => {
  const allMessages = await readFileData<{ messages: IChatMessage[] }>(
    CHAT_FILE_PATH,
    initialData
  );
  
  const newMessage: IChatMessage = {
    id: uuidv4(),
    ...message,
    timestamp: new Date().toISOString(),
    unread: true,
  };

  allMessages.messages.push(newMessage);
  await writeFileData(CHAT_FILE_PATH, allMessages);
  return newMessage;
};

export const getMessagesBetweenUsers = async (
  user1: string,
  user2: string
): Promise<IChatMessage[]> => {
  const allMessages = await readFileData<{ messages: IChatMessage[] }>(
    CHAT_FILE_PATH,
    initialData
  );
  const filterMessage = allMessages.messages.filter(
    (msg) =>
      (msg.from === user1 && msg.to === user2) ||
      (msg.from === user2 && msg.to === user1)
  );
  return filterMessage;
};

export const getUnreadMessages = async (username: string) => {
  const { messages } = await readFileData<{ messages: IChatMessage[] }>(
    CHAT_FILE_PATH,
    initialData
  );

  return messages.filter(
    (message) => message.to === username && message.unread
  );
};

export const markMessagesAsRead = async (username: string,from:string) => {
  const data = await readFileData<{ messages: IChatMessage[] }>(
    CHAT_FILE_PATH,
    initialData
  );

  const updatedMessages = data.messages.map((message) => {
    if (message.to === username && message.from === from) {
      return { ...message, unread: false };
    }
    return message;
  });

  await writeFileData(CHAT_FILE_PATH, { messages: updatedMessages });
}
