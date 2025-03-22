console.log("Plik options.js został załadowany!");
const changeLocation = document.getElementById("changeLocation");
const searchButton = document.getElementById("searchButton");

document.getElementById("minimize").addEventListener("click", () => {
    console.log("Minimalizacja....");
    window.electronAPI.send("window-minimize"); // Updated event name
});

document.getElementById("close").addEventListener("click", () => {
    console.log("Zamykanie....");
    window.electronAPI.send("window-close"); // Updated event name
});

if(changeLocation){
    document.getElementById("changeLocation").addEventListener("click", () => {
        console.log("Zmiana lokalizacji....");
        window.electronAPI.send("change-window", "changeLocation.html");
    });
}else{
    document.getElementById("back").addEventListener("click", () => {
        console.log("Powrót....");
        window.electronAPI.send("change-window", "index.html");
    });
}

if(searchButton){
    document.getElementById("searchButton").addEventListener("click", () => {
        console.log("Szukanie lokalizacji....");
        const newCity = document.getElementById("searchBar").value;
        window.electronAPI.newCity("city", newCity);
        window.electronAPI.send("change-window", "index.html");
    });
}