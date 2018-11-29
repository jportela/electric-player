import { v4 as uuid } from 'uuid';

import Client from './client';
import { IMessagePayload, IMessageResult } from './consts';

// channel.loadSong('song', 'file');
// channel.play('song');

interface IMessage {
  payload: IMessagePayload;
  reject: (err: Error) => void;
  resolve: (value: any) => void;
}

export default class RpcClient {
  private messages: Map<string, IMessage> = new Map();
  private id: string;
  constructor(private client: Client) {
    this.id = uuid();
    this.client.registerListener(this.id, this.onMessage);
  }

  async connect() {
    return this.client.connect();
  }

  async execute(command: string, ...args: any[]) {
    const messageId = uuid();
    const payload = {
      args,
      command,
      messageId,
      socketId: this.id,
    };
    this.client.sendMessage(JSON.stringify(payload));

    return new Promise((resolve, reject) => {
      const message = {
        payload,
        reject,
        resolve,
      };
      this.messages.set(messageId, message);
    });
  }

  private onMessage(rawMessage: string) {
    const messageResult = JSON.parse(rawMessage) as IMessageResult;
    const message = this.messages.get(messageResult.messageId);
    if (!message) {
      message.reject(Error(`No message with ID ${messageResult.messageId} found`));
      return;
    }
    if (messageResult.error) {
      message.reject(Error(messageResult.error));
      return;
    }
    message.resolve(messageResult.result);
  }
}
