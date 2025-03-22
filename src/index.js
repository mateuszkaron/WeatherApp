const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  //mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

ipcMain.on('window-close', () => {
  console.log('Odbiór zamykania....');
  app.quit();
});

ipcMain.on('window-minimize', () => { 
  console.log('Odbiór minimalizacji....');
  mainWindow.minimize();
});

ipcMain.on("change-window", (event, newWindow) => {
  console.log(`Ładowanie nowego okna: ${newWindow}...`);
  mainWindow.loadFile(path.join(__dirname, newWindow));
});


