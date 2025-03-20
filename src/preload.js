const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    minimalize: () => ipcRenderer.send('minimize-window'),
    close: () => ipcRenderer.send('close'),
});