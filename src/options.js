document.getElementById("minimize").addEventListener("click", () => {
    window.electronAPI.minimize();
});

document.getElementById("window-all-closed").addEventListener("click", () => {
    window.electronAPI.close();
});
