import React from "react"
class Map extends React.Component {
  static self;
  constructor(props) {
    super(props);
    self = this;
    self.markers = [];

    self.loadMarkers = function (coords, map) {
      coords.forEach(function (coord) {
        let city_name = Object.keys(coord)[0];
        let props = Object.values(coord)[0];
        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(props.lat, props.lon),
          map: map,
          title: city_name + ', ' + props.time + ', ' + props.temp
        });
        self.markers.push(marker);
      })
    };

    self.initMap = function (coords) {
      const myCoords = new google.maps.LatLng('0', '0');
      const mapOptions = {
        center: myCoords,
        zoom: 3
      };
      self.map = new google.maps.Map(document.getElementById('map'), mapOptions);

      self.loadMarkers(coords, self.map);
    };

    self.clearMarkers = function () {
      // drops into version method error
      // for (var i = 0; i < self.markers.length; i++) {
      //   self.markers[i].setMap(null);
      // }
      self.markers = [];
    };
  }
  
  componentDidMount() {

    App.map = App.cable.subscriptions.create("MapChannel", {
      connected: function () {
        self.initMap(self.props.coords);
      },

      disconnected: function () {
      },

      received: function (data) {
        self.clearMarkers();
        self.loadMarkers(data.coords, self.map)
      },

      speak: function(){
        this.perform('refresh_info');
      }
    });

    setInterval(function(){
      // App.map.speak();
    }, 10000)
  }

  render() {
    return(
      <div className='google-map'>
        <div id='map'></div>
      </div>
    );
  }
}

export default Map
