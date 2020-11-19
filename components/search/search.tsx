import { faLocationArrow, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import styles from "./search.module.scss";

interface SearchProps {
  onWeatherLookup: Function;
}

interface SearchState {
  placeholder: string;
  weatherLookup: {
    city: string;
    location: {
      lat: number;
      long: number;
    };
  };
  errorMsg: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props) {
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
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.findLocation = this.findLocation.bind(this);
  }

  findLocation() {
    let location$ = {
      lat: -1,
      lng: -1,
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    if (navigator.geolocation) {
      console.log("Finding your location");
      const timeout = setTimeout("locationFailed()", 10000);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timeout);
          location$.lat = position.coords.latitude;
          location$.lng = position.coords.longitude;
          console.log(location$.lng + "HERE");
          console.log(location$);
        },
        (error) => {
          clearTimeout(timeout);
          this.locationFailed(error);
        },
        options
      );
    } else {
      this.locationFailed();
    }

    console.log(location$, "AT THENDEs");
    return location$;
  }

  async findingLocation() {
    const pos: any = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    return {
      lat: pos.coords.latitude,
      long: pos.coords.longitude,
    };
  }

  async handleLocationInput() {
    console.log(`Inside handle location input`);
    let locationFound = await this.findingLocation();
    console.log(locationFound + " LOCATION FOUND");
    this.setState((prevState) => ({
      weatherLookup: {
        ...prevState.weatherLookup,
        location: locationFound,
      },
    }));
  }

  locationFailed(error?) {
    this.setState({
      errorMsg: "Unable to grab location. Please ensure you have location allowed.",
    });
  }

  handleSearch(e) {
    const elementID = e.currentTarget.id;
    if (elementID === "location") {
      //Grab Location
      this.handleLocationInput();
    } else {
      //Search City
      console.log("Requested Click on City");
    }
    this.handleWeatherLookup(this.state.weatherLookup);
  }

  handleWeatherLookup = (location) => {
    console.log(location);
    this.props.onWeatherLookup(location);
  };

  handleUserInput(e) {
    this.setState((prevState) => ({
      weatherLookup: {
        ...prevState.weatherLookup,
        city: e.target.value,
      },
    }));
  }

  render() {
    return (
      <div className={styles.searchForm}>
        <form>
          <div className="input-group">
            <label htmlFor="weatherLookup">{this.state.placeholder}</label>
            <input
              name="weatherLookup"
              id="weatherLookup"
              type="text"
              className="form-control"
              placeholder={this.state.placeholder}
              value={this.state.weatherLookup.city}
              onChange={this.handleUserInput}
            />

            <div className="input-group-append">
              <button
                id="city"
                type="button"
                className="btn btn-outline-dark"
                aria-label="Search"
                onClick={this.handleSearch}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
            <div className="input-group-append">
              <button
                id="location"
                type="button"
                className="btn btn-outline-dark"
                aria-label="Find Location"
                onClick={this.handleSearch}
              >
                <FontAwesomeIcon icon={faLocationArrow} />
              </button>
            </div>
          </div>
        </form>
        {this.state.errorMsg.length > 0 && (
          <div className={styles.errorContainer}>
            <h3>Error</h3>
            <span>{this.state.errorMsg}</span>
          </div>
        )}
      </div>
    );
  }
}

export default Search;
