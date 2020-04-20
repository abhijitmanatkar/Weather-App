import React from 'react';
import './WeatherCard.css';

class WeatherCard extends React.Component {

    formatTemp(t_k) {
        let t_c = t_k - 273;
        t_c = Math.round(t_c);
        t_c = t_c.toString() + " °C";
        return t_c;
    }

    formatDate(dt){
        let dts = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let d = new Date(dt * 1000);
        return dts[d.getDay()];
    }

    render() {
        return (
            <div className="WeatherCard">
                <img src={`http://openweathermap.org/img/wn/${this.props.data.weather[0].icon}@2x.png`} alt="icon"/>
                <div className="info">
                    <h4>{this.props.data.weather[0].main}</h4>
                    <h3>{this.formatTemp(this.props.data.main.temp)}</h3>
                    <h4>{this.formatDate(this.props.data.dt)}</h4>
                </div>
            </div>
        );
    }
}

export default WeatherCard;
