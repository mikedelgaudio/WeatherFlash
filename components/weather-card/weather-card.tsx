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
              <img src="/assets/icons8-sun.gif" width="120px" height="120px" />
              <div className="col">
                <div className="row m-0">
                  <h2>60&deg;F</h2>
                  <div className="col">
                    <h3>72&deg;F</h3>
                    <h3>53&deg;F</h3>
                  </div>
                </div>
                <h3>Feels like 62&deg;F</h3>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h4>Cloudy, overcast clouds.</h4>
          </div>
          <div className={styles.metricWrapper}>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Morbi leo risus</li>
              <li className="list-group-item">Porta ac consectetur ac</li>
              <li className="list-group-item">Vestibulum at eros</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
