import { faLocationArrow, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import styles from "./search.module.scss";

class Search extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  colorState = (e) => {
    console.log(e.target);
    e.target.classList.add(styles.selected);
  };

  render() {
    return (
      <div className={styles.searchForm}>
        <form onSubmit={this.props.handleSearch} id="weatherLookupForm">
          <div className="input-group flex-nowrap">
            <label htmlFor="weatherLookup">{this.props.placeholder}</label>
            <input
              name="weatherLookup"
              type="text"
              id="weatherLookupField"
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

        {this.props.displayDropdown && (
          <div className={styles.searchResultsWrapper}>
            <ul className={styles.searchResultsList}>
              <li className={`${styles.searchResultsItem} `} onClick={this.colorState}>
                Hoboken, NJ <span>US</span>
              </li>
              <hr></hr>
              <li className={`${styles.searchResultsItem}`} onClick={this.colorState}>
                New York, NY <span>US</span>
              </li>
              <hr></hr>
              <li className={`${styles.searchResultsItem}`} onClick={this.colorState}>
                Cupertino, CA <span>US</span>
              </li>
            </ul>
          </div>
        )}
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
