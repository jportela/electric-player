import { BrowserWindow } from 'electron';

export function setupBackgroundWindows() {
  const audioWorker = new BrowserWindow({
    focusable: false,
    show: false,
    skipTaskbar: true,
  });
  audioWorker.loadFile('./dist/audio-worker.html');
  audioWorker.webContents.openDevTools();

  // TODO: destroy
}
