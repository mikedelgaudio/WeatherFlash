import Head from "next/head";
import { Component } from "react";
import { Footer } from "../components/footer/footer";
import HeroBanner from "../components/hero-banner/hero-banner";
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
          <h1 className={styles.title}>WeatherFlash</h1>

          <HeroBanner />
        </main>

        <Footer />
      </div>
    );
  }
}
