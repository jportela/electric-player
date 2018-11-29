import { IPC } from 'node-ipc';

import { APP_SPACE } from './consts';

interface IClient {
  id: string;
  socket: any;
}

interface IListener {
  id: string;
  listener: (message: string, socket: any) => any;
}

export default class Server {
  private ipc: any;
  private listeners: Map<string, IListener> = new Map();

  constructor(private id: string) {
    this.ipc = new IPC();
    this.ipc.config.appspace = APP_SPACE;
    this.ipc.config.id = id;
  }

  async start() {
    return new Promise((resolve) => {
      this.ipc.serve(() => {
        this.ipc.server.on('message', this.onMessage);
        this.ipc.server.on('error', this.onError);
        resolve();
      });
      this.ipc.server.start();
    });
  }

  onError = (err: Error) => {
    console.log('error', err);
  }

  broadcastMessage(message: string) {
    this.ipc.server.broadcast('message', message);
  }

  sendMessage(message: string, socket: any) {
    this.ipc.server.emit(socket, 'message', message);
  }

  registerListener(id: string, listener: (message: string, socket: any) => any) {
    this.listeners.set(id, {
      id,
      listener,
    });
  }

  dispose() {
    this.listeners.clear();
  }

  private onMessage = (message: string, socket: any) => {
    this.listeners.forEach((listener) => listener.listener(message, socket));
  }
}
