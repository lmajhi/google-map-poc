import { useState } from "react";
import { Breadcrumb, Layout, Menu, ConfigProvider, theme } from "antd";
const { Header, Content, Footer } = Layout;
import AppHeader from "./pages/AppHeader";
import BodyContainer from "./pages/BodyContainer";
// import "./App.css";
function App() {
  const [count, setCount] = useState(0);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.lightAlogirthm,
      }}
    >
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <AppHeader />
        </Header>
        <Content className="site-layout">
          <BodyContainer />
        </Content>

        <Footer style={{ textAlign: "center" }}>3 Muskeeters | 2023 </Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
