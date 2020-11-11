import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import styles from "./search.module.scss";

class Search extends Component {
  render() {
    return (
      <form className={styles.search}>
        <div className="input-group">
          <label htmlFor="weather-lookup">Weather Lookup field</label>
          <input
            name="weather-lookup"
            id="weather-lookup"
            type="text"
            className="form-control"
            placeholder="Allow location or type city"
          />

          <div className="input-group-append">
            <button className="btn btn-outline-dark">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default Search;
