import { SOCKET_EVENTS } from "@shared/constants/socketEvents";
import { USER_FILE_PATH } from "@src/config/config";
import { IUser } from "@src/types/interface";
import { readFileData } from "@src/utils/helper";
import { Server, Socket } from "socket.io";

export type UserMap = Map<string, string>;
export const usersMap: UserMap = new Map();
export const onlineUsers: Set<string> = new Set();

const getOnlineUsers = () => {
  return Array.from(onlineUsers).map((username) => ({
    username,
    isOnline: true,
  }));
};
export const registerNewUser = (
  io: Server,
  socket: Socket,
  username: string
) => {
  usersMap.set(socket.id, username);
  io.emit(SOCKET_EVENTS.NEW_USER_REGISTERED, { username, isOnline: false });
};

export const registerOnlineUser = async (
  io: Server,
  socket: Socket,
  username: string
) => {
  if (!username) {
    console.error("Username is missing.");
    return;
  }
  usersMap.set(socket.id, username);
  const isAlreadyOnline = onlineUsers.has(username);
  if (!isAlreadyOnline) {
    onlineUsers.add(username);
    io.emit(SOCKET_EVENTS.ONLINE_USERS, getOnlineUsers());
  }
};

export const handleDisconnect = (io: Server, socket: Socket) => {
  const username = usersMap.get(socket.id);

  if (username) {
    usersMap.delete(socket.id);

    const isStillConnected = Array.from(usersMap.values()).some(
      (user) => user === username
    );

    if (!isStillConnected) {
      onlineUsers.delete(username);
    }

    io.emit(SOCKET_EVENTS.ONLINE_USERS, getOnlineUsers());
  }
};
