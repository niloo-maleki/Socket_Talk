import { SOCKET_EVENTS } from "@shared/constants/socketEvents";
import { TypedSocketPayloads } from "@shared/types/socketPayloads";
import { io, Socket } from "socket.io-client";

export interface TypedSocket extends Omit<Socket, "emit" | "on"> {
  emit<T extends keyof TypedSocketPayloads["emit"]>(
    event: T,
    payload: TypedSocketPayloads["emit"][T]
  ): this;

  on<K extends keyof TypedSocketPayloads["listen"]>(
    event: K,
    listener: (data: TypedSocketPayloads["listen"][K]) => void
  ): this;
}

export const socket: TypedSocket = io("http://localhost:3002", {
  autoConnect: false,
});

export const connectSocket = async (username: string) => {
  if (!socket.connected) {
    socket.connect();
    socket.emit(SOCKET_EVENTS.REGISTER_USER, username);
  }
};

export const connectSocketForNewUser = async (username: string) => {
  if (!socket.connected) {
    socket.connect();
    socket.emit(SOCKET_EVENTS.NEW_USER_REGISTERED, username);
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};
