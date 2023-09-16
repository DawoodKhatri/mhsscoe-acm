"use client";
import { ConfigProvider } from "antd";

const ThemeProvider = ({ children }) => {
  return (
    <ConfigProvider
      // theme={{
      //   token: {
      //     colorPrimary: "#8a2be2",
      //     colorLink: "#8a2be2",
      //     colorLinkHover: "#aa54f0",
      //   },
      // }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
