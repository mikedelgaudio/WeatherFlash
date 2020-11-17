import { faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import styles from "./welcome-hero-banner.module.scss";

interface MyProps {}

interface MyState {
  title: string;
  subtitle: string;
}

export default class WelcomeHeroBanner extends Component<MyProps, MyState> {
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
    );
  }
}
