import { ConfigProvider } from "antd";
import MessagesProvider from "./helpers/MessagesContext";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import AuthenticationProvider from "./helpers/AuthenticationContext";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "rgb(244 63 94 / var(--tw-ring-opacity))",
        },
        components: {
          Button: {
            colorText: "#fff",
            textHoverBg: "rgb(146 38 56 / var(--tw-bg-opacity))",
            defaultHoverColor: "text-rose-600",
            colorLinkHover: "text-rose-600",
            colorLink: "text-rose-500",
            colorLinkActive: "text-rose-600",
          },
        },
      }}
    >
      <MessagesProvider>
        <BrowserRouter>
          <AuthenticationProvider>
            <Routes />
          </AuthenticationProvider>
        </BrowserRouter>
      </MessagesProvider>
    </ConfigProvider>
  );
}

export default App;
