import { Component } from "react";
import styles from "./hero-banner.module.scss";

export default class HeroBanner extends Component {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <main>
        <h1 className={styles.header}>Hello From Banner</h1>
      </main>
    );
  }
}
