"use client";
import Glassmorphism from "@/components/common/glassmorphism";
import { USER_DASHBOARD_SIDE_ITEMS } from "@/constants/dashboard";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  IssuesCloseOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Grid } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashboardPageLayout = ({ children }) => {
  const pathname = usePathname();
  const { md } = Grid.useBreakpoint();
  const [isSiderCollapsed, setSiderCollapsed] = useState(!md);

  useEffect(() => {
    setSiderCollapsed(!md);
  }, [md]);

  const getSelectedMenuItemKey = () => {
    return `user_dashboard_side_item_${USER_DASHBOARD_SIDE_ITEMS.indexOf(
      USER_DASHBOARD_SIDE_ITEMS.filter(({ href }) => pathname.includes(href))[0]
    )}`;
  };
  return (
    <>
      <Layout className="!bg-transparent relative">
        <Layout.Sider
          className="!bg-transparent h-[calc(100vh-86px-40px)] mr-0 md:mr-5"
          width={256}
          collapsedWidth={0}
        >
          <Glassmorphism className="h-full">
            <Menu
              className="w-full !bg-transparent text-center md:text-start"
              selectedKeys={getSelectedMenuItemKey()}
            >
              {USER_DASHBOARD_SIDE_ITEMS.map(({ label, href }, index) => (
                <Menu.Item key={`user_dashboard_side_item_${index}`}>
                  <Link href={href}>{label}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Glassmorphism>
        </Layout.Sider>
        {/* {(md || (!md && isSiderCollapsed)) && ( */}
        <Layout.Content>
          {/* <Glassmorphism className="h-full"> */}
          {children}
          {/* </Glassmorphism> */}
        </Layout.Content>
        {/* )} */}
        {/* <div
          className={`h-screen fixed top-0 ${
            isSiderCollapsed ? "left-0" : "right-0"
          } flex items-center md:hidden`}
        >
          <Button
            className="!w-12 !h-12 !rounded-full !bg-transparent !shadow-2xl"
            icon={
              isSiderCollapsed ? (
                <DoubleRightOutlined />
              ) : (
                <DoubleLeftOutlined />
              )
            }
            onClick={() => setSiderCollapsed(!isSiderCollapsed)}
          />
        </div> */}
      </Layout>
    </>
  );
};

export default DashboardPageLayout;
