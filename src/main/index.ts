import { app } from 'electron';
import { setupBackgroundWindows } from './windows/background';
import PlayerWindows from './windows/player';

const playerWindows = new PlayerWindows();

function createWindows() {
  setupBackgroundWindows();
  playerWindows.createWindow();
}

app.on('ready', createWindows);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (playerWindows.getPlayerWindows().length === 0) {
    playerWindows.createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
