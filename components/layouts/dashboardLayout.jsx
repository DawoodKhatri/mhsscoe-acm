"use client";
import Glassmorphism from "@/components/common/glassmorphism";
import { Layout, Menu, Grid } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DashboardLayout = ({ SIDER_ITEMS = [], children }) => {
  const pathname = usePathname();
  const { lg } = Grid.useBreakpoint();

  const getSelectedMenuItemKey = () => {
    return `user_dashboard_side_item_${SIDER_ITEMS.indexOf(
      SIDER_ITEMS.filter(({ href }) => pathname.includes(href))[0]
    )}`;
  };
  return (
    <>
      <Layout className="!bg-transparent relative">
        <Layout.Sider
          className="!bg-transparent h-[calc(100vh-86px-40px)] mr-0 lg:mr-5"
          width={256}
          collapsedWidth={0}
          collapsed={!lg}
        >
          <Glassmorphism className="h-full">
            <Menu
              className="w-full !bg-transparent text-center lg:text-start"
              selectedKeys={getSelectedMenuItemKey()}
            >
              {SIDER_ITEMS.map(({ label, icon, href }, index) => (
                <Menu.Item
                  key={`dashboard_layout_side_item_${index}`}
                  icon={icon}
                >
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

export default DashboardLayout;
