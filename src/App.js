import React from 'react';
import './App.css';
import WeatherCard from './WeatherCard';
import OpenWeather from './OpenWeather.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            location: 'Mumbai, IN'
        };
        this.renderCards = this.renderCards.bind(this);
        this.getData = this.getData.bind(this);
        this.newData = this.newData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        OpenWeather.getData('Mumbai').then(data => {
            this.setState({ data: data });
        })
    }

    newData() {
        let newLoc = document.getElementById('locInput').value.trim();
        if(newLoc !== "" && newLoc.toLowerCase() !== this.state.location.toLowerCase()){
            OpenWeather.getData(newLoc).then(data => {
                let newName;
                let newCountry;
                if(data.city){
                    newName = data.city.name;
                    newCountry = data.city.country;
                } else {
                    newName = newLoc;
                    newCountry = "";
                }
                this.setState({ data: data, location: newName + ", " + newCountry });
            })
        }
    }

    renderCards() {
        if(this.state.data.list){
            let dayList = this.state.data.list;
            let dayListModified = [];
            let dayLists = [[], [], [], [], [], [], []];
            for(let dat of dayList){
                let day = new Date(dat.dt * 1000);
                day = day.getDay();
                dayLists[day].push(dat);
                /*
                if(dayBools[day] === false) {
                    dayListModified.push(dat);
                    dayBools[day] = true;
                }
                */
            }
            let today = new Date();
            today = today.getDay();
            dayListModified.push(dayLists[today][0]);
            let ind = dayLists[today].length;
            for(let i = 0; i< dayLists.length; i++){
                if(i !== today){
                    if(dayLists[i][dayLists[i].length - ind]){
                        dayListModified.push(dayLists[i][dayLists[i].length - ind]);
                    }
                }
            }
            return dayListModified.map(dat => {
                return <li key={dat.dt}><WeatherCard data={dat} /></li>;
            });
        } else {
            return <h1>No data found.</h1>
        }
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <h1>{this.state.location}</h1>
                <div className="inpArea">
                    <input type="text" id="locInput" placeholder="Enter a location"/>
                    <button onClick={this.newData}>Search</button>
                </div>
                <ul className="CardList">
                {this.renderCards()}
                </ul>
            </div>
        );
    }
}

export default App;
