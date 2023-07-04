import React, { Component } from "react";
import { Map, GoogleApiWrapper, Circle, Marker } from "google-maps-react";
import dayjs from "dayjs";
import {
  DownOutlined,
  CloudFilled,
  EnvironmentFilled,
  InfoCircleFilled,
} from "@ant-design/icons";
<EnvironmentFilled />;
const YOUR_GOOGLE_API_KEY_GOES_HERE = "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo";
import {
  Card,
  DatePicker,
  Col,
  Row,
  Space,
  Skeleton,
  Typography,
  Dropdown,
  Empty,
  Input,
} from "antd";
import restClient from "../utils/restClient";

const { Title } = Typography;
const { Search } = Input;
//sample API key AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo to be used lightly

const todaysDate = () => {
  let currentDate = dayjs(new Date());

  return currentDate;
};

const formatDateinYYYYMMDD = (dateString) =>
  dayjs(dateString).format("YYYY-MM-DD");
const items = [
  {
    key: "1",
    label: "flood",
  },
];

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
    this.handleClick = this.handleClick.bind(this);
    this.getLatLngFromName = this.getLatLngFromName.bind(this);

    this.state = {
      selectLatLong: {},
      apiResponse: {},
      toDate: todaysDate(),
      fromDate: todaysDate(),
      indicator: "",
      isloading: false,
      userLocation: "",
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
      ...this.state,
      isloading: true,
      selectLatLong: {
        lat: more.latLng.lat(),
        lng: more.latLng.lng(),
      },
    });
    const response = await restClient.post("/mapIndicator", {
      lat: this.state.selectLatLong.lat,
      long: this.state.selectLatLong.lng,
      radius: 1000,
      from_date: formatDateinYYYYMMDD(this.state.fromDate),
      to_date: formatDateinYYYYMMDD(this.state.toDate),
      indicator: this.state.indicator,
    });
    /**
     * { "status": true, "latitude": 12.991630005, "longitude": 77.5088097141, "floodIndicator": "1.0000" }
     */
    this.setState({
      ...this.state,
      isloading: false,
      apiResponse: { ...response.data, indicator: this.state.indicator },
    });
  };

  handleClick = ({ key }) => {
    const filteredItem = items.find((item) => item.key === key);

    this.setState({
      indicator: filteredItem.label,
    });
  };

  getLatLngFromName = (enteredText) => {
    // console.log("this.props.google", this.props.google);

    geocoder
      .geocode({ address: enteredText })
      .then((response) => {
        console.log("response", response);
        /**
         * 1. get the latitude and logitide from here at save in state
         * 2. point this position on the map.
         * 3. Show the relevant info on the side card.
         */
      })
      .catch((err) => console.error(err));
  };
  render() {
    const givenPosition = {
      //bengaluru https://www.google.com/maps/place/Bengaluru,+Karnataka/@12.9537902,77.3012721
      lat: 12.945796668,
      lng: 77.6949208401,
    };

    return (
      <>
        <Row style={{ height: "88vh", marginTop: 20 }}>
          <Col span={18}>
            <div style={{ marginLeft: 20 }}>
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
                <p></p>
                Indicator :{" "}
                <Dropdown
                  menu={{
                    items,
                    onClick: this.handleClick,
                  }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      {this.state.indicator || "Select"}
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
                <button onClick={() => this.getLatLngFromName()}>
                  Click me
                </button>
                <Search
                  placeholder="input search text"
                  allowClear
                  enterButton="Search"
                  // size="large"
                  onSearch={this.getLatLngFromName}
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
            </div>
          </Col>
          <Col span={6}>
            <Card
              title={this.state.selectedDistrict?.name}
              style={{
                width: 300,
                height: 300,
              }}
            >
              {" "}
              {this.state.apiResponse.status === false &&
                !this.state.isloading && (
                  <Empty description={"No data found."} />
                )}
              {this.state.apiResponse.status && !this.state.isloading ? (
                <>
                  <p>
                    <EnvironmentFilled style={{ color: "#ea4335" }} />{" "}
                    {this.state.apiResponse.latitude},{" "}
                    {this.state.apiResponse.longitude}
                  </p>
                  <p>
                    <CloudFilled style={{ color: "#9AF3FF" }} /> Indicator :{" "}
                    {this.state.apiResponse.indicator}{" "}
                  </p>
                  <p>
                    <InfoCircleFilled style={{ color: "#ffcc00" }} /> Indicator
                    Value: {this.state.apiResponse.floodIndicator}
                  </p>
                </>
              ) : null}
              {this.state.isloading && <Skeleton />}
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
