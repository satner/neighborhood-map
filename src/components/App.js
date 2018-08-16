import React, { Component } from 'react';
import '../components-css/App.css';
import data from './Data'
import TopBar from './TopBar'

class App extends Component {
  constructor(p) {
    super(p)
    this.state = {
      infoWindow: '',
      currentMarker: ''
    }
    this.initMap =this.initMap.bind(this)
    this.openInfo = this.openInfo.bind(this)
    this.getDataFromAPI= this.getDataFromAPI.bind(this)
    this.closeInfo = this.closeInfo.bind(this)
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
    window.google.maps.event.addListener(infoWindow, 'closeclick', function () {
      self.closeInfo();
    });
    this.setState({infoWindow: infoWindow, map: map});

  }

  openInfo(marker) {
    this.closeInfo()
    marker.setAnimation(window.google.maps.Animation.BOUNCE)
    this.setState({
      currentMarker: marker
    });
    this.state.infoWindow.open(this.state.map,marker)
    this.state.map.setCenter(marker.getPosition())
    this.getDataFromAPI(marker);
  }

  getDataFromAPI(marker) {
    var self= this;
    const clientID = 'H02K1H2QJWFTALUSRC2RYTIOJKSKXEUKJAPG4KSPUCA05HK3'
    const clientSecret = 'GK1VLMUPWQ0XTZWFEDYOKEZHRBOCWO41YABR3T3HLXBZPT0O'
    fetch('https://api.foursquare.com/v2/venues/explore?client_id='+ clientID + '&client_secret=' + clientSecret + '&v=20180323&limit=1&ll=' + marker.getPosition().lat() +','+ marker.getPosition().lng())
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
      if (data.meta.code !== 200) {
        self.state.infoWindow.setContent("1Error while retriving data")
      }

      let name = '<div tabIndex=0 role="text" aria-label="location name"> <b>Name </b>: ' + data.response.groups[0].items[0].venue.name + '</div> <hr>'
      let address = '<div tabIndex=0 role="text" aria-label="location address"> <b>Adrress </b>: ' +  data.response.groups[0].items[0].venue.location.address + '</div> <hr>'
      let postalCode = '<div tabIndex=0 role="text" aria-label="location postal code"> <b>Postal code </b>: ' +  data.response.groups[0].items[0].venue.location.postalCode + '</div> <hr>'
      let city = '<div tabIndex=0 role="text" aria-label="city name"> <b>City </b>: ' +  data.response.groups[0].items[0].venue.location.city + '</div> <hr>'
      self.state.infoWindow.setContent(name + address + postalCode + city)
    })
    .catch(function(err) {
      self.state.infoWindow.setContent("Error while retriving data", err)
    });
  }

  closeInfo() {
    if (this.state.currentMarker) {
      this.state.currentMarker.setAnimation(null)
    }

    this.setState({
      currentMarker: ''
    });

    this.state.infoWindow.close();
  }

  render() {
    return (
      <div>
        <TopBar callback={this.openInfo} closeWinInfo={this.closeInfo}/>
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
