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
          <div className="row justify-content-center">
            <div className={styles.todayWrapper}>
              <img src="/assets/icons8-sun.gif" width="120px" height="120px" />
              <div className="col">
                <h2>60&deg;F</h2>
                <h3>Feels like 62&deg;F</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
