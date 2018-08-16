import React, {Component} from 'react'
import '../components-css/TopBar.css'
import Locations from './Locations'
import data from './Data'

class TopBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
    this.searchUpdated = this.searchUpdated.bind(this)
  }

  searchUpdated (term) {
    this.setState({searchTerm: term})
  }

  render() {
    return (
      <div id="top-nav-bar">
        <input id="search-input" type="text" name="firstname" placeholder="Enter location" />
        <ul className="locations-list">
        {data.map(location =>
          <Locations name={location.name} />
        )}
        </ul>
      </div>
    );
  }
}

export default TopBar;
