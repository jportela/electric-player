import { BrowserWindow } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import { v4 as uuid } from 'uuid';

const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 600;

export default class PlayerWindows {
  private pool: Map<string, BrowserWindow> = new Map<string, BrowserWindow>();

  createWindow() {
    const window = new BrowserWindow({
      height: WINDOW_HEIGHT,
      width: WINDOW_WIDTH,
    });

    window.loadFile('./dist/player.html');

    const id = uuid();

    // Emitted when the window is closed.
    window.on('closed', () => {
      this.pool.delete(id);
    });

    if (process.env.NODE_ENV === 'development') {
      installExtension(REACT_DEVELOPER_TOOLS);
    }

    this.pool.set(id, window);

    return id;
  }

  getPlayerWindows() {
    return [...this.pool.values()];
  }
}
