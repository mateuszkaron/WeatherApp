console.log("options.js załadowany!");


document.getElementById("minimize").addEventListener("click", () => {
    console.log("Minimalizacja....");
    window.electronAPI.send("window-minimize"); // Updated event name
});

document.getElementById("close").addEventListener("click", () => {
    console.log("Zamykanie....");
    window.electronAPI.send("window-close"); // Updated event name
});

document.getElementById("changeLocation").addEventListener("click", () => {
    console.log("Zmiana lokalizacji....");
    window.electronAPI.send("change-location", "changeLocation.html");
});
