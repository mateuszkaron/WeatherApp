const { ipcMain, ipcRenderer } = require("electron");

const _apiKey = "fVrDhhLOZdWRehiImpRkgrcEHAwYFU3r";

//showWeather("Warsaw");

console.log(city);

ipcRenderer.on("update-city", (event, newCity) => {
    console.log("Received city: ", newCity);
    document.getElementById("city").innerText = newCity;
});

// Get location key
async function getLocationKey(city) 
{
    const cityUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${_apiKey}&q=${city}`;

    try{
        const response = await fetch(cityUrl);

        if(!response.ok) throw new Error("We failed to get your city infomation");

        const data = await response.json();
        
        if(data.length === 0) throw new Error("Your city is out of range");
        
        const locationKey = data[0].Key;
        return locationKey;

    }catch(error){
        console.error("Error: ", error);
        return error;
    }
}

// Get weather
async function getWeather(locationKey) 
{
    if(!locationKey) throw new Error("We didn't get your location key");

    const weatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${_apiKey}`;

    try{
        const response = await fetch(weatherUrl);

        if(!response.ok) throw new Error("We failed to get your weather infomation");

        const data = await response.json();

        const isDayTime = data[0].IsDayTime; // Get day time
        const weatherText = data[0].WeatherText;  // Weather description
        const weatherIcon = data[0].WeatherIcon;  // Weather icon

        const temperatureCelcius = data[0].Temperature.Metric.Value;  // Get temperature in Celcius
        const temperatureFarenheit = data[0].Temperature.Imperial.Value; // Get temperature in Farenheit

        

        return {
            isDayTime,
            weatherText,
            weatherIcon,
            temperatureCelcius,
            temperatureFarenheit, 
        };

    } catch(error){
        console.error("Error: ", error);
        return error;
    }
}

async function showWeather(city)
{
    try{
        const locationKey = await getLocationKey(city);
        const {isDayTime,weatherText,weatherIcon,temperatureCelcius, temperatureFarenheit} = await getWeather(locationKey);
        
        console.log("City: ", city);
        console.log("Day time: ", isDayTime);
        console.log("Weather: ", weatherText);
        console.log("Weather icon: ", weatherIcon);
        console.log("Temperature in Celcius: ", temperatureCelcius);
        console.log("Temperature in Farenheit: ", temperatureFarenheit);

    }catch(error){
        console.error("Error: ", error);
        return error;
    }
}

//showWeather(city.value);
