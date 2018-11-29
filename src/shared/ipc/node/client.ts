import { IPC } from 'node-ipc';
import { v4 as uuid } from 'uuid';

import { APP_SPACE } from './consts';

type Listener = (message: string) => void;

export default class Client {
  private id: string;
  private ipc: any;
  private listeners: Map<string, Listener> = new Map();

  constructor(private serverId: string) {
    this.id = uuid();
    this.ipc = new IPC();
    this.ipc.config.appspace = APP_SPACE;
    this.ipc.config.id = this.id;
  }

  async connect() {
    this.ipc.connectTo(this.serverId);

    return new Promise((resolve) => {
      this.client.on('connect', resolve);
    });
  }

  get client() {
    return this.ipc.of[this.serverId];
  }

  sendMessage(message: string) {
    this.client.emit('message', message);
  }

  onMessage = (message: string) => {
    this.listeners.forEach((listener) => listener(message));
  }

  registerListener(id: string, listener: Listener) {
    this.listeners.set(id, listener);
  }

  disposeListener(id: string) {
    this.listeners.delete(id);
  }

  dispose() {
    this.listeners.clear();
  }

}
