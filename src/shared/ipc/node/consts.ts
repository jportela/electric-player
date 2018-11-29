export const APP_SPACE = 'electric-player';

export interface IMessagePayload {
  messageId: string;
  socketId: string;
  command: string;
  args: any[];
}

export interface IMessageResult {
  messageId: string;
  result?: any;
  error?: string;
}
