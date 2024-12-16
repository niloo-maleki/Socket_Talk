import app from "./app";
import { Server, Socket } from "socket.io";
import http from "http";
import { handleSocketConnection } from "@controllers/chat.controller";
import { SOCKET_EVENTS } from "@shared/constants/socketEvents";
import { TypedSocketPayloads } from "@shared/types/socketPayloads";

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

const PORT = 3002;
const server = http.createServer(app);
const io = new Server<TypedSocket>(server, {
  cors: { origin: ["http://localhost:5173", "http://localhost:5174"] },
});

io.on(SOCKET_EVENTS.CONNECTION, (socket:Socket) => handleSocketConnection(io, socket));

server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});