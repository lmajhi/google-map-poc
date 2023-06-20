import React, { Component } from "react";
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  Polygon,
} from "google-maps-react";
import districts from "./districts.json";
import { odishaBounds } from "./locations";

const YOUR_GOOGLE_API_KEY_GOES_HERE = "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo";
//sample API key AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo to be used lightly

const LoadingContainer = (props) => <div>Fancy loading container!</div>;
class BodyContainer extends Component {
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.state = {
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
    };
  }

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true,
    });

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true,
    });
  render() {
    console.log("this.props", this.prop);
    const givenPosition = {
      // odisha co-ordinates
      //22.2132362,84.7417494
      lat: 22.2132362,
      lng: 84.7417494,
    };

    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < odishaBounds.length; i++) {
      bounds.extend(odishaBounds[i]);
    }

    return (
      <div>
        <Map
          style={{ margin: 20, width: "70vw", height: "80vh" }}
          google={this.props.google}
          zoom={10}
          initialCenter={givenPosition}
          bounds={bounds}
        >
          {districts.map((district) => (
            <Marker
              title={district.name}
              name={district.name}
              position={{ lat: district.lat, lng: district.lng }}
              onClick={this.onMarkerClick}
            />
          ))}
          <Polygon
            paths={odishaBounds}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor="red"
            fillOpacity={0.35}
          />

          <InfoWindow
            marker={this.state.activeMarker}
            onClose={this.onInfoWindowClose}
            visible={this.state.showingInfoWindow}
          >
            <small>{this.state.selectedPlace.name}</small>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  // apiKey: YOUR_GOOGLE_API_KEY_GOES_HERE,
  // LoadingContainer: LoadingContainer,
})(BodyContainer);
