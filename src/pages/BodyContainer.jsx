import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper, Circle } from "google-maps-react";
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
              title={district.district}
              name={district.district}
              position={{ lat: district.latitude, lng: district.longitudes }}
              onClick={this.onMarkerClick}
            />
          ))}

          {districts.map((district) => (
            <Circle
              center={{ lat: district.latitude, lng: district.longitude }}
              strokeColor={district.color}
              strokeOpacity={0.8}
              strokeWeight={0.8}
              fillColor={district.color}
              fillOpacity={0.35}
              radius={district.population_density * 80}
            />
          ))}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: YOUR_GOOGLE_API_KEY_GOES_HERE,
  // LoadingContainer: LoadingContainer,
})(BodyContainer);
