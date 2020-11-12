import { faLocationArrow, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import styles from "./search.module.scss";

class Search extends Component {
  test() {
    if ("geolocation" in navigator) {
      console.log("HELLO");
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
      });
    } else {
      console.log("NO");
    }
  }

  handleSearch(e) {
    console.warn("I HAVE BEEN CLICKED" + e);
  }

  componentDidMount() {
    window.addEventListener("load", this.test);
  }

  render() {
    return (
      <div className={styles.searchForm}>
        <form>
          <div className="input-group">
            <label htmlFor="weather-lookup">Allow location or type city</label>
            <input
              name="weather-lookup"
              id="weather-lookup"
              type="text"
              className="form-control"
              placeholder="Allow location or type city"
            />

            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-outline-dark"
                aria-label="Search"
                onClick={this.handleSearch.bind(this)}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-outline-dark"
                aria-label="Find Location"
                onClick={this.handleSearch.bind(this)}
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
