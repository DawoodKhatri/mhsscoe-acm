"use client";
import Glassmorphism from "@/components/common/glassmorphism";
import { USER_DASHBOARD_SIDE_ITEMS } from "@/constants/dashboard";
import { Layout, Menu, Grid } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashboardPageLayout = ({ children }) => {
  const pathname = usePathname();
  const { lg } = Grid.useBreakpoint();
  const [isSiderCollapsed, setSiderCollapsed] = useState(!lg);

  useEffect(() => {
    setSiderCollapsed(!lg);
  }, [lg]);

  const getSelectedMenuItemKey = () => {
    return `user_dashboard_side_item_${USER_DASHBOARD_SIDE_ITEMS.indexOf(
      USER_DASHBOARD_SIDE_ITEMS.filter(({ href }) => pathname.includes(href))[0]
    )}`;
  };
  return (
    <>
      <Layout className="!bg-transparent relative">
        <Layout.Sider
          className="!bg-transparent h-[calc(100vh-86px-40px)] mr-0 lg:mr-5"
          width={256}
          collapsedWidth={0}
          collapsed={isSiderCollapsed}
        >
          <Glassmorphism className="h-full">
            <Menu
              className="w-full !bg-transparent text-center lg:text-start"
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
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </>
  );
};

export default DashboardPageLayout;
