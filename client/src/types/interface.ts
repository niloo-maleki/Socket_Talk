
export interface IChatMessage {
  id?: string;
  from: string;
  to: string;
  message: string;
  timestamp?: string;
}