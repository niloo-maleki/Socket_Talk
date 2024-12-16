import { SOCKET_EVENTS } from "@shared/constants/socketEvents";

export interface JoinChatPayload {
  username: string;
  receiver: string;
}

export interface SendMessagePayload {
  from: string;
  to: string;
  message: string;
}

export interface onlineUsersPayload {
  username: string;
  isOnline: boolean;
}

export interface ReceiveMessagePayload {
  id: string;
  from: string;
  to: string;
  message: string;
  timestamp: string;
}

export interface EmitSocketEvents {
  [SOCKET_EVENTS.REGISTER_USER]: string;
  [SOCKET_EVENTS.JOIN_CHAT]: JoinChatPayload;
  [SOCKET_EVENTS.SEND_MESSAGE]: SendMessagePayload;
  [SOCKET_EVENTS.NEW_USER_REGISTERED]: string;
}

export interface TypedListenEvents {
  [SOCKET_EVENTS.SEND_MESSAGE]: ReceiveMessagePayload;
  [SOCKET_EVENTS.RECEIVED_MESSAGE]: ReceiveMessagePayload;
  [SOCKET_EVENTS.ONLINE_USERS]: onlineUsersPayload[];
  [SOCKET_EVENTS.CHAT_HISTORY]: ReceiveMessagePayload[];
  [SOCKET_EVENTS.NEW_USER_REGISTERED]: {
    username:string;
    isOnline:boolean
  };

}

export type TypedSocketPayloads = {
  emit: EmitSocketEvents;
  listen: TypedListenEvents;
};
