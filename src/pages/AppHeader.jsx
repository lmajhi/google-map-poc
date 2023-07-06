import * as React from "react";
import { Typography, Menu } from "antd";
const { Text } = Typography;
export default function AppHeader() {
  return (
    <div
      style={{
        flexGrow: 1,
        display: "flex",
        // backgroundColor: "blanchedalmond",
      }}
    >
      <div className="demo-logo" />

      <Text
        style={{
          color: "white",
        }}
      >
        Weatherman
      </Text>
    </div>
  );
}
