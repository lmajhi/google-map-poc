import React, { Component } from "react";
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  Polygon,
} from "google-maps-react";
const YOUR_GOOGLE_API_KEY_GOES_HERE = "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo";
//sample API key AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo to be used lightly

const LoadingContainer = (props) => <div>Fancy loading container!</div>;
class BodyContainer extends Component {
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }
  onMarkerClick(props, marker, e) {
    console.log(
      "🚀 ~ file: BodyContainer.jsx:13 ~ BodyContainer ~ onMarkerClick ~ props, marker, e:",
      { props },
      { marker },
      { e }
    );
  }
  render() {
    console.log("this.props", this.prop);
    const givenPosition = {
      // odisha co-ordinates
      //22.2132362,84.7417494
      lat: 22.2132362,
      lng: 84.7417494,
    };

    const odishaBounds = [
      {
        lat: 22.5,
        lng: 87.5,
      },
      {
        lat: 22.5,
        lng: 81.2,
      },

      {
        lat: 18.0,
        lng: 81.2,
      },
      {
        lat: 18.0,
        lng: 87.5,
      },
    ];

    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < odishaBounds.length; i++) {
      bounds.extend(odishaBounds[i]);
    }
    console.log(
      "🚀 ~ file: BodyContainer.jsx:49 ~ BodyContainer ~ render ~ bounds:",
      bounds
    );

    return (
      <div>
        <Map
          style={{ margin: 20, width: "70vw", height: "80vh" }}
          google={this.props.google}
          zoom={10}
          initialCenter={givenPosition}
          bounds={bounds}
        >
          <Marker
            title={"The marker`s title will appear as a tooltip."}
            onClick={this.onMarkerClick}
            name={"Current location"}
            position={givenPosition}
          />
          <Polygon
            paths={odishaBounds}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor="red"
            fillOpacity={0.35}
          />
          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>{<h1>Hello</h1>}</div>
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
