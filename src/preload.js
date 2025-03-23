console.log("✅ preload.js załadowany!");

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("electronAPI", {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, callback) => {
        ipcRenderer.on(channel, (event, ...args) => {
            console.log(`📥 Otrzymano wiadomość w preload.js: ${channel}`, args);
            callback(...args);
        });
    }
});