import React from "react"
class Map extends React.Component {
  static self;
  constructor(props) {
    super(props);
    self = this;
  }

  componentDidMount() {
    const loadMarkers = function(coords, map){
      coords.forEach(function(coord){
        new google.maps.Marker({
          position: new google.maps.LatLng(coord.lat, coord.lon),
          map: map
        });
      })
    };

    const initMap = function (coords) {
      const myCoords = new google.maps.LatLng('0', '0');
      const mapOptions = {
        center: myCoords,
        zoom: 3
      };
      var map = new google.maps.Map(document.getElementById('map'), mapOptions);

      loadMarkers(coords, map);
    };

    App.carros = App.cable.subscriptions.create("MapChannel", {
      connected: function () {
        console.log("Conectado");
        initMap(self.props.coords);
      },

      disconnected: function () {
        // Called when the subscription has been terminated by the server
      },

      received: function (data) {
        console.log(data);
      }
    });
  }

  render() {
    // return <h1>{this.props.greeting}</h1>
    return(
      <div className='google-map'>
        <div id='map'></div>
      </div>
    );
  }
}

export default Map
