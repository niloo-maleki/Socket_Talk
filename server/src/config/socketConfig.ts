import { Server } from "socket.io";
import http from "http";
import { corsConfig } from "./corsConfig";

export const initializeSocketServer = (server: http.Server): Server => {
  return new Server(server, {
    cors: corsConfig,
  });
};