import React, { Component } from "react";
import { Map, GoogleApiWrapper, Circle } from "google-maps-react";
import districts from "./districts.json";
import { odishaBounds } from "./locations";
import districtDetails from "./districtDetails.json";
import {
  AreaChartOutlined,
  TeamOutlined,
  DotChartOutlined,
} from "@ant-design/icons";
const YOUR_GOOGLE_API_KEY_GOES_HERE = "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo";
import { Card, Image } from "antd";
//sample API key AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo to be used lightly

const LoadingContainer = (props) => <div>Fancy loading container!</div>;
class BodyContainer extends Component {
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.state = {
      selectedDistrict: {},
    };
  }

  onMarkerClick = (props, district) => {
    console.log("props", props);
    console.log("district", district);
    const tempDistrictItem = districtDetails.find(
      (item) => item.name === district.district
    );
    this.setState({
      selectedDistrict: tempDistrictItem,
    });
  };

  render() {
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
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "flex",
            width: "90vw",

            height: "80vh",
          }}
        >
          <Map
            style={{ /* margin: 20, */ width: "70vw", height: "80vh" }}
            google={this.props.google}
            zoom={6}
            initialCenter={givenPosition}
            bounds={bounds}
          >
            {/* {districts.map((district) => (
              <Marker
                title={district.district}
                name={district.district}
                position={{ lat: district.latitude, lng: district.longitudes }}
                // onClick={this.onMarkerClick}
              />
            ))} */}

            {districts.map((district) => (
              <Circle
                center={{ lat: district.latitude, lng: district.longitude }}
                strokeColor={"red"}
                strokeOpacity={district.population_density / 1000}
                strokeWeight={0.8}
                fillColor={"red"}
                fillOpacity={district.population_density / 1000}
                radius={28000}
                onClick={(e) => this.onMarkerClick(e, district)}
              />
            ))}
          </Map>
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",

              float: "right",
            }}
          >
            <Card
              title={this.state.selectedDistrict?.name}
              style={{
                width: 300,
                height: 300,
              }}
            >
              {Object.keys(this.state.selectedDistrict).length > 0 ? (
                <>
                  <p>
                    <TeamOutlined /> Population :{" "}
                    {this.state.selectedDistrict.population}
                  </p>
                  <p>
                    <AreaChartOutlined /> Area:{" "}
                    {this.state.selectedDistrict.area} (/km
                    <span style={{ verticalAlign: "super" }}>2</span>)
                  </p>
                  <p>
                    <DotChartOutlined />
                    Rainfall: {this.state.selectedDistrict.averageRainfall}
                  </p>
                  {/* {this.state.selectedDistrict.image && (
                    <Image
                      width={200}
                      src={this.state.selectedDistrict.image}
                    />
                  )} */}
                </>
              ) : null}
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: YOUR_GOOGLE_API_KEY_GOES_HERE,
  // LoadingContainer: LoadingContainer,
})(BodyContainer);
