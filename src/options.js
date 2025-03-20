const { ipcRenderer } = require("electron");

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("minimize").addEventListener("click", () => {
    ipcRenderer.send("window-minimize"); // Updated event name
  });

  document.getElementById("close").addEventListener("click", () => {
    ipcRenderer.send("window-close"); // Updated event name
  });
});
