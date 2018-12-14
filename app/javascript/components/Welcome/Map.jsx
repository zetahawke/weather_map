import React from "react"
class Map extends React.Component {
  componentDidMount() {
    const loadMarkers = function(coords, map){
      forEach(coords, function(coord){
        new google.maps.Marker({
          position: coord,
          map: map
        });
      })
    };

    const initMap = function (coords) {
      var myCoords = new google.maps.LatLng('0', '0');
      var mapOptions = {
        center: myCoords,
        zoom: 3
      };
      var map = new google.maps.Map(document.getElementById('map'), mapOptions);

      loadMarkers(coords, map);
    };

    App.carros = App.cable.subscriptions.create("MapChannel", {
      connected: function () {
        console.log("Conectado");
        initMap([]);
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
