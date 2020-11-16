import { faLocationArrow, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import styles from "./search.module.scss";

class Search extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
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
    console.log(elementID);
    if (elementID === "location") {
      //Grab Location
      console.log("Requested Click on Location");
      this.findLocation();
    } else {
      //Search City
      console.log("Requested Click on City");
      this.state.weatherLookup;
    }
  }

  handleWeatherLookupChange(e) {
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
            <label htmlFor="weatherLookup">Allow location or type city</label>
            <input
              name="weatherLookup"
              id="weatherLookup"
              type="text"
              className="form-control"
              placeholder="Allow location or type city"
              value={this.state.weatherLookup}
              onChange={this.handleWeatherLookup}
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
