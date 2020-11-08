import { Component } from "react";
import styles from "./footer.module.scss";

export class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className={styles.footer}>
        <p className="m-0">
          Developed by{" "}
          <a href="https://github.com/mikedelgaudio" target="_blank">
            Mike DelGaudio
          </a>
        </p>
      </footer>
    );
  }
}
