const apiKey = '908420bcf01a2925bcd5c7bb4d2d96bf';

const OpenWeather = {
    getData: (cityName) => {
        let url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
        return fetch(url).then(response => response.json());
    }
};

export default OpenWeather;
