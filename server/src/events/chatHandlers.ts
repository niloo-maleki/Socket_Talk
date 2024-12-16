import { Socket } from "socket.io";
import { addMessage, getMessagesBetweenUsers } from "@src/utils/messageUtils";
import { SOCKET_EVENTS } from "@shared/constants/socketEvents";
import { UserMap } from "./onlineUsers";

export const handleSendMessage = async (
  socket: Socket,
  data: { from: string; to: string; message: string },
  usersMap: UserMap
) => {
  try {
    const newMessage = await addMessage(data);
    const receiverSocketId = Array.from(usersMap.entries()).find(
      ([_, username]) => username === data.to
    );

    if (receiverSocketId) {
      const socketId = receiverSocketId[0];

      socket.to(socketId).emit(SOCKET_EVENTS.RECEIVED_MESSAGE, newMessage);
    } else {
      console.error("Receiver not found in usersMap.");
    }
  } catch (error) {
    console.error("Failed to handle send message:", error);
  }
};

export const handleJoinChat = async (
  socket: Socket,
  username: string,
  receiver: string
) => {
  try {
    const chatHistory = await getMessagesBetweenUsers(username, receiver);
    
    socket.emit(SOCKET_EVENTS.CHAT_HISTORY, chatHistory);
  } catch (error) {
    console.error("Failed to fetch chat history:", error);
  }
};
