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
        <h1 className={styles.title}>WeatherFlash</h1>
        <h2 className={styles.header}>Your weather update, in a flash!</h2>
        <h3>To get started, allow location in your browser or type a city</h3>
        <div>
          <Search />
        </div>
      </div>
    );
  }
}
