import Head from "next/head";
import React, { Component } from "react";
import { Footer } from "../components/footer/footer";
import WelcomeHeroBanner from "../components/welcome-hero-banner/welcome-hero-banner";
import styles from "../styles/Home.module.scss";

export default class Home extends Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className={styles.container}>
        <Head>
          <title>WeatherFlash</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <WelcomeHeroBanner />
        </main>

        <Footer />
      </div>
    );
  }
}
