import React, { Component } from "react";
import Moment from "react-moment";
import Spinner from "../spinner/spinner";
import styles from "./weather-card.module.scss";
export default class WeatherCard extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      tempMode: this.props.tempMode,
      icon: "",
    };
  }

  componentDidMount() {
    this.determineIcon();
  }

  componentDidUpdate() {}

  toCelsius = (fahrenheit) => {
    return ((fahrenheit - 32) * 5) / 9;
  };

  toFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  toMiles = (distance) => {
    return (distance / 1000).toFixed();
  };

  toDirection = (degrees) => {
    const val = Math.floor(degrees / 22.5 + 0.5);
    console.log(degrees);
    const arr = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    return arr[val % 16];
  };

  //https://openweathermap.org/weather-conditions
  determineIcon = () => {
    let iconPath: string = "";
    switch (this.props.weatherData.condition.main) {
      case "Rain":
        iconPath = "/assets/rain.gif";
        break;
      case "Drizzle":
        iconPath = "/assets/drizzle.gif";
        break;
      case "Thunderstorm":
        iconPath = "/assets/storm.gif";
        break;
      case "Clear":
        iconPath = "/assets/sunny.gif";
        break;
      case "Clouds":
        iconPath = "/assets/clouds.png";
        break;
      case "Snow":
        iconPath = "/assets/snow.gif";
        break;
      case "Haze":
        iconPath = "/assets/haze.png";
        break;
      case "Tornado":
        iconPath = "/assets/tornado.png";
        break;
      case "Fog":
        iconPath = "/assets/fog_night.gif";
        break;
      default:
        iconPath = "/assets/wind.gif";
        break;
    }

    console.log(iconPath);

    this.setState({
      icon: iconPath,
    });
  };
  // /https://stackoverflow.com/questions/49497270/autocomplete-only-city-name-list-using-google-maps-api

  displayCard = () => {
    return (
      <div>
        <h1 className={styles.currentlyIn}>Currently in {this.props.weatherData.cityName} </h1>
        <div className="row justify-content-center">
          <div className={styles.todayWrapper}>
            <img src={this.state.icon} width="120px" height="120px" />
            <div className="col">
              <div className="row m-0">
                <h2>
                  {this.props.weatherData.temp.current.toFixed()}&deg;
                  {this.props.tempMode}
                </h2>
                <div className="col">
                  <h3 className="font-weight-light">
                    {this.props.weatherData.temp.high.toFixed()}&deg;{this.props.tempMode}
                  </h3>
                  <h3 className="font-weight-light">
                    {this.props.weatherData.temp.low.toFixed()}&deg;{this.props.tempMode}
                  </h3>
                </div>
              </div>
              <h3 className="font-weight-light">
                Feels like {this.props.weatherData.temp.feelsLike.toFixed()}&deg;
                {this.props.tempMode}
              </h3>
            </div>
          </div>
        </div>
        <div className="text-center pt-1">
          <h4>
            {this.props.weatherData.condition.main}, {this.props.weatherData.condition.description}.
          </h4>
        </div>
        <div className={styles.metricWrapper}>
          <ul className="list-group list-group-flush text-center">
            <li className="list-group-item">
              Sunrise <Moment date={this.props.weatherData.sunrise} format="h:mm A" unix local /> -
              Sunset <Moment date={this.props.weatherData.sunset} format="h:mm A" unix local />
            </li>
            <li className="list-group-item">Humidity {this.props.weatherData.humidity}%</li>
            <li className="list-group-item">
              Visibility {this.toMiles(this.props.weatherData.visibility)}mi
            </li>
            <li className="list-group-item">
              Wind {this.props.weatherData.wind.speed}mph{" "}
              {this.toDirection(this.props.weatherData.wind.deg)}
            </li>
          </ul>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="d-flex justify-content-center pt-5">
        <div className={styles.weatherCardWrapper}>
          {this.props.loading ? <Spinner /> : <this.displayCard />}
        </div>
      </div>
    );
  }
}
