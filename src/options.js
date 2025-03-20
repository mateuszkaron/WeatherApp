const { remote } = require('electron');

document.getElementById("minimize").addEventListener("click", () => {
    remote.getCurrentWindow().minimize();
});

document.getElementById("close").addEventListener("click", () => {
    remote.getCurrentWindow().close();
});
