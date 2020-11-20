import React, { Component } from "react";

interface WeatherCardProps {}

interface WeatherCardState {}

export default class WeatherCard extends Component<WeatherCardProps, WeatherCardState> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>Inside the weather-card</h1>
      </div>
    );
  }
}
