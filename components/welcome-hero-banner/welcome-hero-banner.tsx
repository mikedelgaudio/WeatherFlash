import React, { Component } from "react";
import styles from "./welcome-hero-banner.module.scss";

export default class WelcomeHeroBanner extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      title: "WeatherFlash",
      subtitle: "Your weather update, in a flash!",
    };
  }

  public render() {
    return (
      <header onClick={this.props.resetApp} className={styles.logoWrap}>
        <div>
          <h1 className={styles.title}>WeatherFlash</h1>
          <span>SUN ICON</span>
        </div>

        <div>
          <h2 className={styles.subtitle}>{this.state.subtitle}</h2>
        </div>
      </header>
    );
  }
}
