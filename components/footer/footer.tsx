import { Component } from "react";
import styles from "./footer.module.scss";

export class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className={styles.footer}>
        Designed and Developed by&nbsp;
        <a href="https://github.com/mikedelgaudio" target="_blank">
          Mike DelGaudio
        </a>
      </footer>
    );
  }
}
