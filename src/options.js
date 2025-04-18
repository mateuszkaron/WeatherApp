console.log("Plik options.js został załadowany!");
const changeLocation = document.getElementById("changeLocation");
const searchButton = document.getElementById("searchButton");
const temperature = document.getElementById("temperature");

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

if(temperature){
    document.getElementById("temperature").addEventListener("click", () => {
        const tempC = document.querySelectorAll(".tempC");
        const tempF = document.querySelectorAll(".tempF");
        const isTempHidden = tempC[0]?.style.display === "none" || tempC[0]?.style.display === "";

        if (isTempHidden) {
            tempC.forEach(el => el.style.display = "block");
            tempF.forEach(el => el.style.display = "none");
        } else {
            tempC.forEach(el => el.style.display = "none");
            tempF.forEach(el => el.style.display = "block");
        }
    });
}

if (searchButton) {
    document.getElementById("searchButton").addEventListener("click", () => {
        console.log("Szukanie lokalizacji....");
        const newCity = document.getElementById("searchBar").value.trim();
        if (newCity) {
            window.electronAPI.send("city", newCity); // Send the new city to the main process
            window.electronAPI.send("change-window", "index.html"); // Navigate back to index.html
        } else {
            console.log("Nie podano nazwy miasta.");
        }
    });
}
