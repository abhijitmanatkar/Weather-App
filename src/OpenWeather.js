const apiKey = ''; // OpenWeatherMap API key here

const OpenWeather = {
    getData: (cityName) => {
        let url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
        return fetch(url).then(response => response.json());
    }
};

export default OpenWeather;
