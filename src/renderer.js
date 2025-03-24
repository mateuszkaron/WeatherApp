const _apiKey = "################################"; // Your API key

console.log(city);

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
        let formatedWeatherText = weatherText.split('').join('<br>');
        document.getElementById("desc").innerHTML = formatedWeatherText;
        console.log("Weather icon: ", weatherIcon);
        weatherIcon = weatherIcon(weatherIcon);
        document.getElementById("weather").style.backgroundImage = `./assets/backgrounds/${weatherIcon}.png`;
        console.log("Temperature in Celcius: ", temperatureCelcius);
        document.getElementById("tempC").innerText = temperatureCelcius + "°C";
        console.log("Temperature in Farenheit: ", temperatureFarenheit);
        document.getElementById("tempF").innerText = temperatureFarenheit + "°F";

    }catch(error){
        console.error("Error: ", error);
        return error;
    }
}

function weatherIcon(iconCode) {
    if ([1, 2].includes(iconCode)) return "sunny-day";
    if ([33, 34].includes(iconCode)) return "clear-night";
    
    if ([3, 4, 5].includes(iconCode)) return "partly-cloudy-day";
    if ([35, 36, 37].includes(iconCode)) return "partly-cloudy-night";
    
    if ([6, 7, 8, 11].includes(iconCode)) return "cloudy-day";
    if ([38].includes(iconCode)) return "cloudy-night";
    
    if ([12, 13, 14, 18].includes(iconCode)) return "rainy-day";
    if ([39, 40].includes(iconCode)) return "rainy-night";
    
    if ([15, 16, 17].includes(iconCode)) return "storm-day";
    if ([41, 42].includes(iconCode)) return "storm-night";
    
    if ([19, 20, 21, 22, 23].includes(iconCode)) return "snow-day";
    if ([43, 44].includes(iconCode)) return "snow-night";
    
    if ([24, 25, 26, 29].includes(iconCode)) return "mist";
    if ([30].includes(iconCode)) return "hot";
    if ([31].includes(iconCode)) return "cold";
    if ([32].includes(iconCode)) return "windy";

    return "unknown"; // If there is no icon match
}



electronAPI.on("update-city", (data) => {
    console.log("Renderer received city: ", data);
    const cityElement = document.getElementById("city");
    if (cityElement) {
        cityElement.innerText = data; // Update the city in index.html
        showWeather(data); // Fetch and display weather for the new city
    }
});
