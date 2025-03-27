import RouterProvider from './routes';
import { ConfigProvider } from "antd";

function App() {

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#5FA380',               // Updated primary color
          colorPrimaryBgHover: "#4E8968",        // Slightly darker green for hover effect
          borderRadius: 6,                       // Slightly rounded borders

          // Alias Token
          // colorBgContainer: '#E8F5EE',           // Light greenish background
          colorText: '#3A5145',                  // Softer, darker text color to match theme
        },
        components: {
          Button: {
            defaultBorderColor: "#5FA380",       // Updated button border color
            defaultBg: "transparent",            // Transparent by default for outline buttons
            defaultHoverBorderColor: "#4E8968",  // Darker border on hover
            defaultHoverBg: "#E8F5EE",           // Light background when hovered
          }
        }
      }}
    >
      <RouterProvider />
    </ConfigProvider>
  )
}

export default App;
