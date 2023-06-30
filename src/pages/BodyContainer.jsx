import React, { Component } from "react";
import { Map, GoogleApiWrapper, Circle, Marker } from "google-maps-react";
import dayjs from "dayjs";

const YOUR_GOOGLE_API_KEY_GOES_HERE = "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo";
import { Card, Image, DatePicker, Col, Row, Space, Skeleton } from "antd";
import restClient from "../utils/restClient";
//sample API key AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo to be used lightly

const todaysDate = () => {
  let currentDate = dayjs(new Date());

  return currentDate;
};
const LoadingContainer = (props) => (
  <Row style={{ height: "84vh", marginTop: 20 }}>
    <Col span={18} style={{ justifyContent: "center", alignItems: "center" }}>
      <Skeleton />
    </Col>
  </Row>
);
class BodyContainer extends Component {
  constructor(props) {
    super(props);

    this.onMapClick = this.onMapClick.bind(this);
    this.onFromDateChange = this.onFromDateChange.bind(this);
    this.onToDateChange = this.onToDateChange.bind(this);

    this.state = {
      selectLatLong: {},
      apiResponse: {},
      toDate: todaysDate(),
      fromDate: todaysDate(),
    };
  }
  onFromDateChange = (date, dateString) => {
    this.setState({
      fromDate: dateString,
    });
  };

  onToDateChange = (date, dateString) => {
    this.setState({
      toDate: dateString,
    });
  };
  onMapClick = async (props, someMore, more) => {
    this.setState({
      selectLatLong: {
        lat: more.latLng.lat(),
        lng: more.latLng.lng(),
      },
    });
    const response = await restClient.post("/mapIndicator", {
      lat: more.latLng.lat(),
      long: more.latLng.lng(),
      radius: 1000,
      from_date: this.state.fromDate,
      to_date: this.state.toDate,
      indicator: "flood",
    });
    /**
     * { "status": true, "latitude": 12.991630005, "longitude": 77.5088097141, "floodIndicator": "1.0000" }
     */
    this.setState({
      ...this.state,

      apiResponse: response.data,
    });
  };

  render() {
    const givenPosition = {
      //bengaluru https://www.google.com/maps/place/Bengaluru,+Karnataka/@12.9537902,77.3012721
      lat: 12.945796668,
      lng: 77.6949208401,
    };

    return (
      <>
        <Row style={{ height: "84vh", marginTop: 20 }}>
          <Col span={18}>
            <Space direction="horizontal">
              From:{" "}
              <DatePicker
                defaultValue={this.state.fromDate}
                onChange={this.onFromDateChange}
              />
              <p></p>
              To:{" "}
              <DatePicker
                defaultValue={this.state.toDate}
                onChange={this.onToDateChange}
              />
            </Space>

            <Map
              style={{ width: "60vw", height: "60vh", marginTop: 20 }}
              google={this.props.google}
              zoom={11}
              initialCenter={givenPosition}
              onClick={this.onMapClick}
            >
              <Marker position={this.state.selectLatLong} />
            </Map>
          </Col>
          <Col span={6}>
            <Card
              title={this.state.selectedDistrict?.name}
              style={{
                width: 300,
                height: 300,
              }}
            >
              {Object.keys(this.state.apiResponse).length > 0 ? (
                <>
                  <p>{JSON.stringify(this.state.apiResponse, null, 2)}</p>
                </>
              ) : null}
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: YOUR_GOOGLE_API_KEY_GOES_HERE,
  LoadingContainer: LoadingContainer,
})(BodyContainer);
