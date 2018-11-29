import { v4 as uuid } from 'uuid';

import { IMessagePayload, IMessageResult } from './consts';
import Server from './server';

export type Executor = (...args: any[]) => Promise<any>;

interface ICommand {
  command: string;
  executor: Executor;
}

export default class RpcServer {
  private id: string;
  private commands: Map<string, ICommand> = new Map();

  constructor(private server: Server) {
    this.id = uuid();
    this.server.registerListener(this.id, this.onMessage);
  }

  async start() {
    return this.server.start();
  }

  registerCommand(command: string, executor: Executor) {
    this.commands.set(command, {
      command,
      executor,
    });
  }

  private onMessage = async (rawMessage: string, socket: any) => {
    const message = JSON.parse(rawMessage) as IMessagePayload;

    const command = this.commands.get(message.command);
    if (!command) {
      const errorResult = {
        error: `Command ${command} not found`,
        messageId: message.messageId,
      } as IMessageResult;
      this.server.sendMessage(JSON.stringify(errorResult), socket);
      return;
    }

    const result = await command.executor(...message.args);

    this.server.sendMessage(JSON.stringify(result), socket);
  }
}
