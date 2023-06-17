import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
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
      props,
      marker,
      e
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

    return (
      <div>
        <Map
          style={{ margin: 20, width: "70vw", height: "80vh" }}
          google={this.props.google}
          zoom={10}
          initialCenter={givenPosition}
        >
          <Marker
            title={"The marker`s title will appear as a tooltip."}
            onClick={this.onMarkerClick}
            name={"Current location"}
            position={givenPosition}
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
  apiKey: YOUR_GOOGLE_API_KEY_GOES_HERE,
  // LoadingContainer: LoadingContainer,
})(BodyContainer);
