import { Server, Socket } from "socket.io";
import { handleSendMessage, handleJoinChat } from "@src/events/chatHandlers";
import {
  handleDisconnect,
  registerNewUser,
  registerOnlineUser,
  usersMap,
} from "@src/events/onlineUsers";
import { Request, Response } from "express";

import { SOCKET_EVENTS } from "@shared/constants/socketEvents";
import { getUnreadMessages, markMessagesAsRead } from "@src/utils/messageUtils";

export const handleSocketConnection = (io: Server, socket: Socket) => {
  socket.on(SOCKET_EVENTS.NEW_USER_REGISTERED, (username: string) => {
    registerNewUser(io, socket, username);
  });

  socket.on(SOCKET_EVENTS.REGISTER_USER, (username: string) => {
    registerOnlineUser(io, socket, username);
  });

  socket.on(SOCKET_EVENTS.SEND_MESSAGE, async (data) => {
    await handleSendMessage(socket, data, usersMap);
  });

  socket.on(SOCKET_EVENTS.JOIN_CHAT, async ({ username, receiver }) => {
    await handleJoinChat(socket, username, receiver);
  });

  socket.on(SOCKET_EVENTS.DISCONNECT, () => {
    handleDisconnect(io, socket);
  });
};

export const getUnread = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.query;
  console.log("username", username);
  if (!username || typeof username !== "string") {
    res.status(400).json({ error: "Username is required" });
    return;
  }
  try {
    const unreadMessages = await getUnreadMessages(username as string);
    res.status(200).json(unreadMessages);
  } catch (error) {
    console.error("Error fetching unread messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postReadMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, from } = req.body;
  if (!username || !from) {
    res.status(400).json({ error: "Username and from are required" });
    return;
  }
  try {
    await markMessagesAsRead(username, from);
    res.status(200).json({ message: "Messages marked as read" });
  } catch (error) {
    console.error("Error fetching unread messages:", error);
    res.status(500).json({ error: "Failed to mark messages as read" });
  }
};
