import Head from "next/head";
import React, { Component } from "react";
import { Footer } from "../components/footer/footer";
import Search from "../components/search/search";
import WelcomeHeroBanner from "../components/welcome-hero-banner/welcome-hero-banner";
import styles from "../styles/Home.module.scss";

interface HomeProps {}

interface HomeState {
  weatherLookup: {
    city: string;
    location: {
      lat: number;
      long: number;
    };
  };
}

export default class Home extends Component<HomeProps, HomeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      weatherLookup: {
        city: "",
        location: {
          lat: 0,
          long: 0,
        },
      },
    };
  }

  update = (weatherLookup) => {
    this.setState({ weatherLookup: weatherLookup });
  };

  public render() {
    return (
      <div className={styles.container}>
        <Head>
          <title>WeatherFlash</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className="container">
            <WelcomeHeroBanner />
            <Search onWeatherLookup={this.update} />
            <h2>City {this.state.weatherLookup.city}.</h2>
            <h2>
              Location {this.state.weatherLookup.location.long},{" "}
              {this.state.weatherLookup.location.lat}
            </h2>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}
