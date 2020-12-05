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
  weatherData: {
    temp: {
      current: number;
      high: number;
      low: number;
      feelsLike: number;
    };
    condition: {
      main: string;
      description: string;
      icon: string;
    };
    sunrise: number;
    sunset: number;
    wind: {
      speed: number;
      deg: number;
    };
    humidity: number;
    visibility: number;
    timezone: number;
    cityName: string;
    coords: { lat: number; long: number };
  };
  tempMode: string;
  userSearched: boolean;
  loading: boolean;
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
      placeholder: "Type city or use location",
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
          icon: "",
        },
        sunrise: 0,
        sunset: 0,
        wind: { speed: 0, deg: 0 },
        humidity: 0,
        visibility: 0,
        timezone: 0,
        cityName: "N/A",
        coords: { lat: 0, long: 0 },
      },
      tempMode: "F",
      userSearched: false,
      loading: false,
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
      this.getData("coord");
    } else {
      this.getData("city");
    }
    this.setState({
      loading: true,
    });

    ///e.target.reset();
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
    if (err.message === "User denied Geolocation") {
      this.locationFailed("You have denied location access");
    }
  };

  locationFailed = (error?) => {
    this.setState({
      errorMsg: `Unable to grab location. ${error}.`,
    });
  };

  getData = async (mode) => {
    try {
      let apiUrl = `${process.env.API_ENDPOINT}/get/current-weather/location?`;
      if (mode === "city") {
        apiUrl += `city=${this.state.weatherLookup.city}`;
      } else {
        apiUrl += `lat=${this.state.weatherLookup.location.lat}&lon=${this.state.weatherLookup.location.long}`;
      }

      const response = await fetch(apiUrl, {
        method: "GET",
        mode: "same-origin",
      });

      if (response.status !== 200) {
        // We had an error handler
        if (response.status === 404) {
          this.setState({
            errorMsg: `Sorry, the location / city is unable to be found. Please try again.`,
          });
        }
      } else {
        this.resetError();
        // Successful response
        response.json().then((data) => {
          this.setState((prevState) => ({
            weatherData: {
              ...prevState.weatherData,
              temp: {
                ...prevState.weatherData.temp,
                current: data.main.temp,
                high: data.main.temp_max,
                low: data.main.temp_min,
                feelsLike: data.main.feels_like,
              },
              condition: {
                ...prevState.weatherData.condition,
                main: data.weather[0].main,
                description: data.weather[0].description,
              },
              sunrise: data.sys.sunrise,
              sunset: data.sys.sunset,
              wind: {
                ...prevState.weatherData.wind,
                speed: data.wind.speed,
                deg: data.wind.deg,
              },
              humidity: data.main.humidity,
              visibility: data.visibility,
              timezone: data.timezone,
              cityName: data.name,
              coords: {
                ...prevState.weatherData.coords,
                lat: data.coord.lat,
                long: data.coord.lon,
              },
            },
          }));
        });
      }

      this.setState({
        loading: false,
      });
    } catch (e) {
      console.error(e);
      // Display error
    }
  };

  resetError = () => {
    this.setState({
      errorMsg: "",
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
            <WelcomeHeroBanner userSearched={this.state.userSearched} />

            <Search
              handleLocation={this.handleLocation}
              handleSearch={this.handleSearch}
              handleUserInput={this.handleUserInput}
              errorMsg={this.state.errorMsg}
              placeholder={this.state.placeholder}
            />

            {this.state.errorMsg === "" &&
              (this.state.weatherLookup.location.lat !== 0 ||
                this.state.weatherLookup.city !== "") &&
              this.state.userSearched && (
                <WeatherCard
                  weatherData={this.state.weatherData}
                  weatherLookup={this.state.weatherLookup}
                  tempMode={this.state.tempMode}
                  loading={this.state.loading}
                />
              )}
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}
