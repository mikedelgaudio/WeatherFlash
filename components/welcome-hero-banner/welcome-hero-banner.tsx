import { faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import Search from "../search/search";
import styles from "./welcome-hero-banner.module.scss";

export default class WelcomeHeroBanner extends Component {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div className="container">
        <div className="d-flex m-0">
          <h1 className={styles.title}>WeatherFlash</h1>
          <span>
            <FontAwesomeIcon icon={faSun} className={styles.icon} />
          </span>
        </div>

        <div>
          <h2 className={styles.subtitle}>Your weather update, in a flash!</h2>
        </div>

        <Search />
      </div>
    );
  }
}
