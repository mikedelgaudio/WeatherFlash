import React, { Component } from "react";
import styles from "./weather-card.module.scss";

interface WeatherCardProps {}

interface WeatherCardState {}

export default class WeatherCard extends Component<WeatherCardProps, WeatherCardState> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className={styles.weatherCardWrapper}>
          <h1 className={styles.currentlyIn}>Currently in Hoboken, NJ</h1>
          <div className="row justify-content-center">
            <div className={styles.todayWrapper}>
              <img src="/assets/snow.gif" width="120px" height="120px" />
              <div className="col">
                <div className="row m-0">
                  <h2>23&deg;F</h2>
                  <div className="col">
                    <h3>34&deg;</h3>
                    <h3>21&deg;</h3>
                  </div>
                </div>
                <h3>Feels like 18&deg;</h3>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h4>Snowing, light snow showers.</h4>
          </div>
          <div className={styles.metricWrapper}>
            <ul className="list-group list-group-flush text-center">
              <li className="list-group-item">Sunrise 6:20AM - Sunset 5:53PM </li>
              <li className="list-group-item">Humidity 10%</li>
              <li className="list-group-item">Visibility 8mi</li>
              <li className="list-group-item">Wind 1.5mph North</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
