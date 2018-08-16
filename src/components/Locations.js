import React, {Component} from 'react'

class Locations extends Component {

  render() {
    return (
      <li role='button' aria-label={this.props.data.name} tabIndex='0' onClick={this.props.getMarker.bind(this, this.props.data.marker)}>{this.props.data.name} </li>
    );
  }
}

export default Locations;
