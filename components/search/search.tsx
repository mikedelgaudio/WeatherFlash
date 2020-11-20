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
    this.handleLocation = this.handleLocation.bind(this);
    this.getCoor = this.getCoor.bind(this);
    this.errorCoor = this.errorCoor.bind(this);
    this.handleWeatherLookup = this.handleWeatherLookup.bind(this);
    this.locationFailed = this.locationFailed.bind(this);
  }

  handleSearch(e) {
    const elementID = e.currentTarget.id;
    if (elementID === "location") {
      this.handleLocation();
    }
    this.handleWeatherLookup(this.state.weatherLookup);
  }

  handleUserInput(e) {
    e.preventDefault();
    this.setState((prevState) => ({
      weatherLookup: {
        ...prevState.weatherLookup,
        city: e.target.value,
      },
    }));
  }

  handleLocation() {
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
  }

  getCoor(pos) {
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
    this.handleWeatherLookup(this.state.weatherLookup);
  }

  errorCoor(err) {
    console.warn("IN THE ERROR " + err.message);
    if (err.message === "User denied Geolocation") {
      this.locationFailed("You have denied location access");
    }
  }

  locationFailed(error?) {
    this.setState({
      errorMsg: `Unable to grab location. ${error}.`,
    });
  }

  handleWeatherLookup = (location) => {
    this.props.onWeatherLookup(location);
  };

  componentDidMount() {
    this.handleLocation();
  }

  render() {
    return (
      <div className={styles.searchForm}>
        <form onSubmit={this.handleUserInput}>
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

// Handle when user hits enter on textbox
// Add tooltips over location or search icon to make UX more apparent for user instructions
// Handle more error scenarios for location
