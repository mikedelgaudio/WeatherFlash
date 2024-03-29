import Head from "next/head";
import React, { Component } from "react";
import { Footer } from "../components/footer/footer";
import Search from "../components/search/search";
import WeatherCard from "../components/weather-card/weather-card";
import WelcomeHeroBanner from "../components/welcome-hero-banner/welcome-hero-banner";
import styles from "../styles/Home.module.scss";

export default class Home extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      weatherLookup: {
        id: 0,
        city: "",
        location: {
          lat: 0,
          long: 0,
        },
      },
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
        stateName: "",
        cityId: 0,
        coords: { lat: 0, long: 0 },
      },
      userSearched: false,
      loading: false,
      search: {
        results: [],
      },
    };
  }

  handleSearch = async (e) => {
    if (this.state.loading) {
      try {
        e.preventDefault();
      } catch (e) {
        console.error(new Error("App was loading - rebooting"));
        this.resetApp();
      }
      return;
    }
    let element = null;

    if (typeof e !== "number") {
      e.preventDefault();
      element = e.currentTarget.id;
    }

    this.setState((prevState) => ({
      loading: true,
      userSearched: true,
      search: {
        ...prevState.search,
        results: [],
      },
    }));

    if (element === "location") {
      await this.handleLocation()
        .then((pos) => {
          this.getCoor(pos);
        })
        .catch((err) => {
          this.errorCoor(err);
          return Promise.reject("Cannot gather location");
        });

      await this.getData("coord");
    } else if (typeof e === "number") {
      await this.getData("id");
    } else {
      const searchField = document.getElementById("weatherLookupField") as HTMLInputElement;
      if (searchField.value !== "") {
        await this.getData("city");
      } else {
        this.setState({
          errorMsg: "Please provide a city name or use location.",
        });
        return;
      }
    }
    await this.getStateData();
    this.determineIcon();

    this.setState((prevState) => ({
      loading: false,
    }));
    const forms = document.getElementById("weatherLookupForm") as HTMLFormElement;
    forms.reset();
  };

  handleSuggestions = async (cityId) => {
    await this.setState((prevState) => ({
      weatherLookup: {
        ...prevState.weatherLookup,
        id: cityId,
      },
    }));

    this.handleSearch(cityId);
  };

  handleLocation = () => {
    if (navigator.geolocation) {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej, {
          maximumAge: 60000,
          timeout: 10000,
          enableHighAccuracy: true,
        });
      });
    } else {
      // Add tooltip location is disabled?
      this.errorCoor("general");
    }
  };

  handleUserInput = async (e) => {
    this.setState((prevState) => ({
      weatherLookup: {
        ...prevState.weatherLookup,
        city: e.target.value,
      },
    }));
    this.getSuggestions(e.target.value);
  };

  getSuggestions = async (query) => {
    try {
      const apiUrl = `${process.env.API_ENDPOINT}/get/search?city=${query}`;
      const response = await fetch(apiUrl, {
        method: "GET",
      });

      if (response.status !== 200) {
        // We have an error so just set state to nothing
        return;
      }

      await this.setSuggestions(response);
    } catch (err) {
      console.error(new Error("Unable to find state name."));
    }
  };

  setSuggestions = async (response) => {
    await response.json().then((data) => {
      this.setState((prevState) => ({
        search: {
          ...prevState.search,
          results: data.suggestions,
        },
      }));
    });
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
  };

  errorCoor = (err) => {
    if (err.message === "User denied Geolocation") {
      this.setState({
        errorMsg: `Unable to grab location. You have denied location access.`,
      });
    } else {
      this.setState({
        errorMsg: `Unable to grab location. Unexpected error occured.`,
      });
    }
  };

  //https://openweathermap.org/weather-conditions
  determineIcon = () => {
    let iconPath: string = "";
    switch (this.state.weatherData.condition.main) {
      case "Rain":
        iconPath = "/assets/rain.gif";
        break;
      case "Drizzle":
        iconPath = "/assets/drizzle.gif";
        break;
      case "Thunderstorm":
        iconPath = "/assets/storm.gif";
        break;
      case "Clear":
        iconPath = "/assets/sunny.gif";
        break;
      case "Clouds":
        iconPath = "/assets/clouds.png";
        break;
      case "Snow":
        iconPath = "/assets/snow.gif";
        break;
      case "Haze":
        iconPath = "/assets/haze.png";
        break;
      case "Tornado":
        iconPath = "/assets/tornado.png";
        break;
      case "Fog":
        iconPath = "/assets/fog_night.gif";
        break;
      default:
        iconPath = "/assets/wind.gif";
        break;
    }

    this.setState((prevState) => ({
      weatherData: {
        ...prevState.weatherData,
        condition: {
          ...prevState.weatherData.condition,
          icon: iconPath,
        },
      },
    }));
  };

  getData = async (mode) => {
    try {
      let apiUrl = `${process.env.API_ENDPOINT}/get/current-weather/location?`;
      if (mode === "city") {
        apiUrl += `city=${this.state.weatherLookup.city}`;
      } else if (mode === "id") {
        apiUrl += `id=${this.state.weatherLookup.id}`;
      } else {
        apiUrl += `lat=${this.state.weatherLookup.location.lat}&lon=${this.state.weatherLookup.location.long}`;
      }

      const response = await fetch(apiUrl, {
        method: "GET",
      });

      if (response.status !== 200) {
        // We had an error handler
        if (response.status === 404) {
          this.setState({
            errorMsg: `Sorry, the city is unable to be found. Please try again for example, current support is limited to certain cities.`,
          });
        } else {
          // Unexpected Error
          this.setState({
            errorMsg: `Sorry, an unexpected error occured. Please try again later.`,
          });
        }
      } else {
        // Successful response
        this.resetError();
        await this.setData(response);
      }
    } catch (e) {
      console.error(e);
      // Display error
    }
  };

  setData = async (response) => {
    await response.json().then((data) => {
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
          cityId: data.id,
          coords: {
            ...prevState.weatherData.coords,
            lat: data.coord.lat,
            long: data.coord.lon,
          },
        },
      }));
    });
  };

  getStateData = async () => {
    try {
      const apiUrl = `${process.env.API_ENDPOINT}/get/state-name?cityId=${this.state.weatherData.cityId}`;

      const response = await fetch(apiUrl, {
        method: "GET",
      });

      if (response.status !== 200) {
        // We have an error so just set state to nothing
        return;
      }

      await this.setStateData(response);
    } catch (err) {
      console.error(new Error("Unable to find state name."));
      this.setState({
        errorMsg: `Sorry, an unexpected error occured. Please try again later.`,
      });
    }
  };

  setStateData = async (response) => {
    await response.json().then((data) => {
      this.setState((prevState) => ({
        weatherData: {
          ...prevState.weatherData,
          stateName: data.state,
        },
      }));
    });
  };

  resetApp = () => {
    this.setState((prevState) => ({
      errorMsg: "",
      userSearched: false,
      loading: false,
      search: {
        ...prevState.search,
        results: [],
      },
    }));
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
            <WelcomeHeroBanner resetApp={this.resetApp} />

            <Search
              handleSearch={this.handleSearch}
              handleUserInput={this.handleUserInput}
              handleSuggestions={this.handleSuggestions}
              errorMsg={this.state.errorMsg}
              search={this.state.search}
            />

            {this.state.errorMsg === "" && this.state.userSearched && (
              <WeatherCard
                weatherData={this.state.weatherData}
                weatherLookup={this.state.weatherLookup}
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

/**
 * <!-- Global site tag (gtag.js) - Google Analytics -->
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-H7JJPMJC5Q"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-H7JJPMJC5Q');
</script>
 */
