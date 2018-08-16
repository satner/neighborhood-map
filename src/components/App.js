import React, { Component } from 'react';
import '../components-css/App.css';
import data from './Data'
import TopBar from './TopBar'

class App extends Component {
  constructor(p) {
    super(p)
    this.state = {
      infoWindow: ''
    }
    this.initMap =this.initMap.bind(this)
    this.openInfo = this.openInfo.bind(this)
  }

  componentDidMount() {
    window.initMap = this.initMap
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyBpwGfErKJ4ETHmPgCespJe4LOj8P7AahU&callback=initMap')
  }

  initMap() {
    var self = this // solve event Listener problem link https://stackoverflow.com/questions/31753036/xxx-is-not-a-function-in-my-viewmodel
    // init map
    var map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.632846, lng: 22.952740},
          zoom: 16
        });

    // init markers
    data.forEach(function(location) {
      var latLng = new window.google.maps.LatLng(location.lat, location.log)
      var marker = new window.google.maps.Marker({
        position: latLng,
        title: location.name,
        animation: window.google.maps.Animation.DROP
      })
      //this.openInfo(marker, map)
      marker.setMap(map)
      location.marker = marker

      marker.addListener('click', function() {
            self.openInfo(marker);
      } )
    })

    // init info window (only one info open at the same time)
    var infoWindow = new window.google.maps.InfoWindow({});
    this.setState({infoWindow: infoWindow, map: map});
  }

  openInfo(marker) {
    console.log(marker);
    marker.setAnimation(window.google.maps.Animation.BOUNCE)

    this.state.infoWindow.open(this.state.map,marker)
    this.state.map.setCenter(marker.getPosition())

  }

  render() {
    return (
      <div>
        <TopBar callback={this.openInfo}/>
        <div id="map"></div>
      </div>
    );
  }
}

export default App;

function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}
