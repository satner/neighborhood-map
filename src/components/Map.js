import React, { Component } from 'react';
import '../components-css/Map.css';
import TopBar from './TopBar'
import data from './Data'

class Map extends Component {
  componentDidMount() {
    window.initMap = this.initMap
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyBpwGfErKJ4ETHmPgCespJe4LOj8P7AahU&callback=initMap')
  }

  initMap() {
    // init map
    let map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.632846, lng: 22.952740},
          zoom: 16
        });

    // init markers
    data.forEach(function(location) {
      let latLng = new window.google.maps.LatLng(location.lat, location.log)
      let marker = new window.google.maps.Marker({
        position: latLng,
        animation: window.google.maps.Animation.DROP
      })
      marker.setMap(map)
    })


  }
  render() {
    return (
        <div id="map"></div>
    );
  }
}

export default Map;

function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}
