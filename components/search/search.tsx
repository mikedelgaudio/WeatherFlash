import { faLocationArrow, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import styles from "./search.module.scss";

interface SearchProps {}

interface SearchState {}

class Search extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.handleLocation();
  }

  render() {
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
