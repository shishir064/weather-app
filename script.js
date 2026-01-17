document.addEventListener("DOMContentLoaded", function(){
    const userInput = document.getElementById("userInput");
    const searchBtn = document.getElementById("search-btn");
    const weatherIcon = document.getElementById("weatherIcon");
    const weathertemp = document.getElementById("weather-temp");
    const citysName = document.getElementById("city-name");
    const windspc = document.getElementById("wind-spd");
    const humidtper = document.getElementById("humidt-per");

    function cityValidation(cityName){
        if(cityName.trim() === ""){
            alert("city name should not be empty!");
            return false;
        }
        const regex = /^[A-Za-z]+(?:[\s-][A-Za-z]+)*$/;
        const isMatching = regex.test(cityName);
        if (!isMatching){
            alert("Invalid city");
        }
        return isMatching;
    }
    

    async function fetchdata(cityName) { 
        const apiKey = "cbcfe3fff3b79fee5a7798fef9ff57fd";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        console.log(url);
        try{
            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch weather data");
            }
            let data = await response.json();
            console.log(data);
            weatherData(data,cityName);
        }
        catch(error){
            alert("something in wrong");
        }
    }

    function weatherData(data,cityName){
        const temp = `${data.main.temp}`;
        const cityname = `${cityName}`;
        const humidity = `${data.main.humidity}`;
        const speed = `${data.wind.speed}`;
        const id = `${data.weather[0].id}`;
        console.log(id)
        weathertemp.textContent = Math.round(temp) + "°C";
        citysName.textContent = cityname;
        humidtper.textContent = humidity + " %";
        windspc.textContent = speed + " km/h";

        if (id <= 232 ){
            weatherIcon.src = "image/thunderstorm.svg";
        }
        else if (id <= 321){
            weatherIcon.src = "image/drizzle.svg";
        }
        else if (id <= 531){
            weatherIcon.src = "image/rain.svg";
        }
        else if (id <= 622){
            weatherIcon.src = "image/snow.svg";
        }
        else if (id <= 781){
            weatherIcon.src = "image/atmosphere.svg";
        }
        else if (id <= 800){
            weatherIcon.src = "image/clear.svg";
        }
        else{
            weatherIcon.src = "image/clouds.svg";
        }

    }

    searchBtn.addEventListener("click", function(){
        const cityName = userInput.value;
        console.log(cityName);
        cityValidation(cityName);
        fetchdata(cityName);
    })

})