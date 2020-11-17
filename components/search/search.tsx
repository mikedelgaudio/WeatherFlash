import { faLocationArrow, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import styles from "./search.module.scss";

interface SearchProps {
  onWeatherLookup: Function;
}

interface SearchState {
  placeholder: string;
  weatherLookup: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props) {
    super(props);
    this.state = {
      weatherLookup: "",
      placeholder: "Allow location or type city",
      //geolocation: {},
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.findLocation = this.findLocation.bind(this);
  }

  findLocation() {
    if ("geolocation" in navigator) {
      console.log("Finding your location");
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
      });
    } else {
      console.log("Could not find your location");
    }
  }

  handleSearch(e) {
    const elementID = e.currentTarget.id;
    if (elementID === "location") {
      //Grab Location
      console.log("Requested Click on Location");
      this.findLocation();
    } else {
      //Search City
      console.log("Requested Click on City");
      this.handleWeatherLookup(this.state.weatherLookup);
    }
  }

  handleWeatherLookup = (location) => {
    console.log(location);
    this.props.onWeatherLookup(location);
  };

  handleUserInput(e) {
    this.setState({ weatherLookup: e.target.value });
  }

  componentDidMount() {
    //window.addEventListener("load", this.test);
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
              value={this.state.weatherLookup}
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
      </div>
    );
  }
}

export default Search;
