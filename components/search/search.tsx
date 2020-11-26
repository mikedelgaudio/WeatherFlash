import { faLocationArrow, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import styles from "./search.module.scss";

interface SearchProps {}

interface SearchState {}

class Search extends Component<any, any> {
  constructor(props) {
    super(props);

    // this.handleSearch = this.handleSearch.bind(this);
    // this.handleUserInput = this.handleUserInput.bind(this);
    // this.handleLocation = this.handleLocation.bind(this);
    // this.getCoor = this.getCoor.bind(this);
    // this.errorCoor = this.errorCoor.bind(this);
    // this.handleWeatherLookup = this.handleWeatherLookup.bind(this);
    // this.locationFailed = this.locationFailed.bind(this);
  }

  // handleSearch(e) {
  //   const elementID = e.currentTarget.id;
  //   if (elementID === "location") {
  //     this.handleLocation();
  //   }
  //   this.handleWeatherLookup(this.state.weatherLookup);
  // }

  // handleUserInput(e) {
  //   e.preventDefault();
  //   this.setState((prevState) => ({
  //     weatherLookup: {
  //       ...prevState.weatherLookup,
  //       city: e.target.value,
  //     },
  //   }));
  // }

  // handleLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(this.getCoor, this.errorCoor, {
  //       maximumAge: 60000,
  //       timeout: 10000,
  //       enableHighAccuracy: true,
  //     });
  //   } else {
  //     // Add tooltip location is disabled?
  //     this.locationFailed();
  //   }
  // }

  // getCoor(pos) {
  //   this.setState((prevState) => ({
  //     weatherLookup: {
  //       ...prevState.weatherLookup,
  //       location: {
  //         ...prevState.weatherLookup.location,
  //         lat: pos.coords.latitude,
  //         long: pos.coords.longitude,
  //       },
  //     },
  //   }));

  //   console.log(this.state.weatherLookup.location);
  //   this.handleWeatherLookup(this.state.weatherLookup);
  // }

  // errorCoor(err) {
  //   console.warn("IN THE ERROR " + err.message);
  //   if (err.message === "User denied Geolocation") {
  //     this.locationFailed("You have denied location access");
  //   }
  // }

  // locationFailed(error?) {
  //   this.setState({
  //     errorMsg: `Unable to grab location. ${error}.`,
  //   });
  // }

  componentDidMount() {
    this.props.handleLocation();
  }

  render() {
    console.log(this.props);
    return (
      <div className={styles.searchForm}>
        <form onSubmit={this.props.handleUserInput}>
          <div className="input-group">
            <label htmlFor="weatherLookup">{this.props.placeholder}</label>
            <input
              name="weatherLookup"
              id="weatherLookup"
              type="text"
              className="form-control"
              placeholder={this.props.placeholder}
              onChange={this.props.handleUserInput}
            />

            <div className="input-group-append">
              <button
                id="city"
                type="button"
                className="btn btn-outline-dark"
                aria-label="Search"
                onClick={this.props.handleSearch}
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
                onClick={this.props.handleSearch}
              >
                <FontAwesomeIcon icon={faLocationArrow} />
              </button>
            </div>
          </div>
        </form>
        {this.props.errorMsg?.length > 0 && (
          <div className={styles.errorContainer}>
            <h3>Error</h3>
            <span>{this.props.errorMsg}</span>
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
