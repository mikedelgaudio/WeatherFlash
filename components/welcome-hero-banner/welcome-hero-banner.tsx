import { faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      <div>
        <div onClick={this.props.resetApp} className={styles.logoWrap}>
          <div className="d-flex m-0">
            <h1 className={styles.title}>WeatherFlash</h1>
            <span>
              <FontAwesomeIcon icon={faSun} className={styles.icon} />
            </span>
          </div>

          <div>
            <h2 className={styles.subtitle}>{this.state.subtitle}</h2>
          </div>
        </div>
      </div>
    );
  }
}
