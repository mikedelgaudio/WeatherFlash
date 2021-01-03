import { faLocationArrow, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import styles from "./search.module.scss";

class Search extends Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      placeholder: "Type city or use location",
    };
  }

  render() {
    // tabbing not working as expected
    const searchSuggestions = this.props.search.results.map((result, index) => {
      return (
        <li
          className={`${styles.searchResultsItem}`}
          onClick={this.props.handleSuggestions}
          key={result.id}
          tabIndex={index + 1}
        >
          {result.name}
          {result.state ? ", " + result.state : ""} <span>Country: {result.country}</span>
        </li>
      );
    });

    return (
      <div className={styles.searchForm}>
        <form onSubmit={this.props.handleSearch} id="weatherLookupForm" autoComplete="off">
          <div className="input-group flex-nowrap">
            <label htmlFor="weatherLookup">{this.state.placeholder}</label>
            <input
              name="weatherLookup"
              type="text"
              id="weatherLookupField"
              className="form-control"
              placeholder={this.state.placeholder}
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

        {this.props.search.results.length > 0 && (
          <div className={styles.searchResultsWrapper}>
            <ul className={styles.searchResultsList}>{searchSuggestions}</ul>
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
