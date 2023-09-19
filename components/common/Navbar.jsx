"use client";
import { NAV_ITEMS } from "@/constants/navbar";
import { Button, Col, Layout, Menu, Row } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Glassmorphism from "./glassmorphism";
import { colorPrimary } from "@/constants/colors";

const AppNavbar = () => {
  const pathname = usePathname();

  const getSelectedMenuItemKey = () => {
    return `navbar_manu_item_${NAV_ITEMS.indexOf(
      NAV_ITEMS.filter(({ href }) => href === pathname)[0]
    )}`;
  };

  return (
    <div className="p-5 pb-0">
      <Glassmorphism>
        <Layout.Header className="bg-transparent">
          <Row className="w-full h-full" justify="space-between">
            <Col className="h-full">
              <img src="/logo.png" className="py-2 h-full" />
            </Col>
            <Col span={12} className="text-center">
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
            <Col>
              <Button className="mr-2">Login</Button>
              <Button className={`ml-2 bg-[${colorPrimary}]`} type="primary">
                Signup
              </Button>
            </Col>
          </Row>
        </Layout.Header>
      </Glassmorphism>
    </div>
  );
};

export default AppNavbar;
