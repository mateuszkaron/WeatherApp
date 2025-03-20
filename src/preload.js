const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    minimalize: () => ipcRenderer.send('minimize'),
    close: () => ipcRenderer.send('window-all-closed'),
});