import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
const YOUR_GOOGLE_API_KEY_GOES_HERE = "";

const LoadingContainer = (props) => <div>Fancy loading container!</div>;
class BodyContainer extends Component {
  render() {
    return (
      <div style={{ margin: 2 }}>
        <Map google={this.props.google} zoom={14}>
          <Marker onClick={this.onMarkerClick} name={"Current location"} />

          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>{/* <h1>{this.state.selectedPlace.name}</h1> */}</div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: YOUR_GOOGLE_API_KEY_GOES_HERE,
  LoadingContainer: LoadingContainer,
})(BodyContainer);
