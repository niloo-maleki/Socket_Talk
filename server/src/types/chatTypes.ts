export interface IChatMessage {
  id: string;
  from: string;
  to: string;
  message: string;
  timestamp: string;
  unread: boolean;
}

export type ChatMessages = Record<string, Record<string, IChatMessage[]>>;
