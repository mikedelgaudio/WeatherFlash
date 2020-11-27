import Head from "next/head";
import React, { Component } from "react";
import { Footer } from "../components/footer/footer";
import Search from "../components/search/search";
import WeatherCard from "../components/weather-card/weather-card";
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
  placeholder: string;
  errorMsg: string;
  weatherData: {};
  tempMode: string;
  userSearched: boolean;
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
      placeholder: "Allow location or type city",
      errorMsg: "",
      weatherData: {
        temp: {
          current: 0,
          high: 0,
          low: 0,
          feelsLike: 0,
        },
        condition: {
          main: "N/A",
          description: "N/A",
        },
        sunrise: 0,
        sunset: 0,
        wind: {
          speed: 0,
          deg: 0,
        },
        humidity: 0,
        visibility: 0,
      },
      tempMode: "F",
      userSearched: false,
    };
  }

  handleSearch = (e) => {
    console.log("Hit the search");
    e.preventDefault();
    const elementID = e.currentTarget.id;
    this.setState({
      userSearched: true,
    });
    if (elementID === "location") {
      this.handleLocation();
    }

    this.getData();
  };

  handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoor, this.errorCoor, {
        maximumAge: 60000,
        timeout: 10000,
        enableHighAccuracy: true,
      });
    } else {
      // Add tooltip location is disabled?
      this.locationFailed();
    }
  };

  handleUserInput = (e) => {
    this.setState((prevState) => ({
      weatherLookup: {
        ...prevState.weatherLookup,
        city: e.target.value,
      },
    }));
  };

  getCoor = (pos) => {
    this.setState((prevState) => ({
      weatherLookup: {
        ...prevState.weatherLookup,
        location: {
          ...prevState.weatherLookup.location,
          lat: pos.coords.latitude,
          long: pos.coords.longitude,
        },
      },
    }));

    console.log(this.state.weatherLookup.location);
  };

  errorCoor = (err) => {
    console.warn("IN THE ERROR " + err.message);
    if (err.message === "User denied Geolocation") {
      this.locationFailed("You have denied location access");
    }
  };

  locationFailed = (error?) => {
    this.setState({
      errorMsg: `Unable to grab location. ${error}.`,
    });
  };

  getData = async () => {
    const apiUrl = `${process.env.API_ENDPOINT}/get/current-weather/${this.state.weatherLookup}`;
    console.log(apiUrl);
    await fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState((prevState) => ({
          weatherData: {
            ...prevState.weatherData,
            temp: {
              ...prevState.weatherData.temp,
              current: data.main.temp,
            },
          },
        }));
      });
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
            {!this.state.userSearched && <WelcomeHeroBanner />}

            <Search
              handleLocation={this.handleLocation}
              handleSearch={this.handleSearch}
              handleUserInput={this.handleUserInput}
              errorMsg={this.state.errorMsg}
              placeholder={this.state.placeholder}
            />

            {(this.state.weatherLookup.location.lat !== 0 ||
              this.state.weatherLookup.city !== "") &&
              this.state.userSearched && (
                <WeatherCard
                  weatherData={this.state.weatherData}
                  weatherLookup={this.state.weatherLookup}
                />
              )}

            <h1>{this.state.weatherData.temp.current}</h1>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}
