import { useState } from "react";

import AppHeader from "./pages/AppHeader";
import BodyContainer from "./pages/BodyContainer";
import "./App.css";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", top: 0 }}>
      <AppHeader />
      <BodyContainer />
      {/* <Grid container spacing={2}></Grid> */}
    </div>
  );
}

export default App;
