"use client";
import { NAV_ITEMS } from "@/constants/navbar";
import { Button, Col, Layout, Menu, Row } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuOutlined } from "@ant-design/icons";
import Glassmorphism from "./glassmorphism";
import { useState } from "react";

const AppNavbar = () => {
  const pathname = usePathname();

  const getSelectedMenuItemKey = () => {
    return `navbar_manu_item_${NAV_ITEMS.indexOf(
      NAV_ITEMS.filter(({ href }) => href === pathname)[0]
    )}`;
  };

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <Glassmorphism className="m-5 mb-0">
        <Layout.Header className="bg-transparent">
          <Row className="w-full h-full" justify="space-between">
            <Col className="h-full">
              <img src="/logo.png" className="py-2 h-full" />
            </Col>
            <Col span={0} md={{ span: 12 }} className="text-center">
              <Menu
                mode="horizontal"
                className="w-full bg-transparent"
                selectedKeys={getSelectedMenuItemKey()}
              >
                {NAV_ITEMS.map(({ label, href }, index) => (
                  <Menu.Item
                    key={`navbar_manu_item_${index}`}
                    className="w-1/4"
                  >
                    <Link href={href} className="">
                      {label}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu>
            </Col>
            <Col
              className="text-end"
              span={0}
              md={{ span: 7 }}
              lg={{ span: 5 }}
              xl={{ span: 4 }}
            >
              <Button className="mr-2">Login</Button>
              <Button className="ml-2 bg-[#1677ff]" type="primary">
                Signup
              </Button>
            </Col>
            <Col className="text-end" span={4} md={{ span: 0 }}>
              <Button
                className="w-14"
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
              >
                <MenuOutlined style={{verticalAlign:0}}/>
              </Button>
            </Col>
          </Row>
        </Layout.Header>
      </Glassmorphism>

      <Glassmorphism
        className={`transition-all ease-in-out duration-1000 ${
          mobileNavOpen ? "m-5" : "mx-5 scale-y-0 h-0"
        }`}
      >
        <Menu
          className="w-full bg-transparent text-center"
          selectedKeys={getSelectedMenuItemKey()}
          onClick={() => setMobileNavOpen(false)}
        >
          {NAV_ITEMS.map(({ label, href }, index) => (
            <Menu.Item key={`navbar_manu_item_${index}`}>
              <Link href={href} className="">
                {label}
              </Link>
            </Menu.Item>
          ))}
          <Button className="h-10 mx-1 w-[calc(100%-8px)]" type="text">
            Login
          </Button>
          <Button
            className="h-10 mx-1 w-[calc(100%-8px)] bg-[] hover:bg-[] mb-1"
            type="text"
          >
            Signup
          </Button>
        </Menu>
      </Glassmorphism>
    </>
  );
};

export default AppNavbar;
