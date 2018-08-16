import React, {Component} from 'react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
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
    this.clickList = this.clickList.bind(this)

  }

  searchUpdated (event) {
    this.setState({searchTerm: event.target.value.trim()})
  }

  clickList (event) {
    console.log(event.target.innerHTML);
    this.setState({searchTerm: event.target.innerHTML.trim()})
  }

  getMarker(marker) {
    console.log(marker);
    this.props.callback(marker)

  }

  render() {
    let showingLocations, unShowingLocations
    if (this.state.searchTerm) { // Just searching NOT click ata list
      const match = new RegExp(escapeRegExp(this.state.searchTerm), 'i')
      showingLocations = data.filter((location) => match.test(location.name))
      unShowingLocations = data.filter((location) => !match.test(location.name))

      // Change visibility of markers
      showingLocations.map(loc => loc.marker.setVisible(true))
      unShowingLocations.map(loc => loc.marker.setVisible(false))
    } else {  // Empty search term
      showingLocations = data

      if (data[0].marker !== undefined) {
        showingLocations.map(loc => loc.marker.setVisible(true))
      }
    }

    showingLocations.sort(sortBy('name'))

    return (
      <div id="top-nav-bar">
        <input role="search" aria-label="search location" id="search-input" type="text" placeholder="Enter location" value={this.state.searchTerm} onChange={this.searchUpdated}/>
        <ul className="locations-list" onClick={this.clickList}>
        {showingLocations.map(location =>
          <Locations key={location.id} data={location} getMarker={this.getMarker.bind(this)}/>
        )}
        </ul>
      </div>
    );
  }
}

export default TopBar;
