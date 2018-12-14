import React from "react"
class Map extends React.Component {
  componentDidMount() {
    App.carros = App.cable.subscriptions.create("MapChannel", {
      connected: function () {
        console.log("Conectado")
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
    return <h1>{this.props.greeting}</h1>
  }
}

export default Map
