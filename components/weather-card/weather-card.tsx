import React, { Component } from "react";
import Moment from "react-moment";
import styles from "./weather-card.module.scss";
export default class WeatherCard extends Component<any> {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: this.props.weatherData,
      tempMode: this.props.tempMode,
    };
  }

  componentDidMount() {}

  toCelsius = (fahrenheit) => {
    return ((fahrenheit - 32) * 5) / 9;
  };

  toFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  toMiles = (distance) => {
    return (distance / 1000).toFixed();
  };

  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className={styles.weatherCardWrapper}>
          <h1 className={styles.currentlyIn}>Currently in {this.props.weatherData.cityName} </h1>
          <div className="row justify-content-center">
            <div className={styles.todayWrapper}>
              <img src="/assets/snow.gif" width="120px" height="120px" />
              <div className="col">
                <div className="row m-0">
                  <h2>
                    {this.props.weatherData.temp.current.toFixed()}&deg;
                    {this.props.tempMode}
                  </h2>
                  <div className="col">
                    <h3>
                      {this.props.weatherData.temp.high.toFixed()}&deg;{this.props.tempMode}
                    </h3>
                    <h3>
                      {this.props.weatherData.temp.low.toFixed()}&deg;{this.props.tempMode}
                    </h3>
                  </div>
                </div>
                <h3>
                  Feels like {this.props.weatherData.temp.feelsLike.toFixed()}&deg;
                  {this.props.tempMode}
                </h3>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h4>
              {this.props.weatherData.condition.main},{" "}
              {this.props.weatherData.condition.description}.
            </h4>
          </div>
          <div className={styles.metricWrapper}>
            <ul className="list-group list-group-flush text-center">
              <li className="list-group-item">
                Sunrise <Moment date={this.props.weatherData.sunrise} format="h:mm A" unix local />{" "}
                - Sunset <Moment date={this.props.weatherData.sunset} format="h:mm A" unix local />
              </li>
              <li className="list-group-item">Humidity {this.props.weatherData.humidity}%</li>
              <li className="list-group-item">
                Visibility {this.toMiles(this.props.weatherData.visibility)}mi
              </li>
              <li className="list-group-item">Wind {this.props.weatherData.wind.speed}mph North</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

// Need to ensure this only updates when the user clicks
