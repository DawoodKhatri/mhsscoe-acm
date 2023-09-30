"use client";
import Glassmorphism from "@/components/common/glassmorphism";
import { USER_DASHBOARD_SIDE_ITEMS } from "@/constants/dashboard";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DashboardPageLayout = ({ children }) => {
    const pathname = usePathname();
    
  const getSelectedMenuItemKey = () => {
    return `user_dashboard_side_item_${USER_DASHBOARD_SIDE_ITEMS.indexOf(
        USER_DASHBOARD_SIDE_ITEMS.filter(({ href }) => href === pathname)[0]
    )}`;
  };

  return (
    <>
      <Layout className="!bg-transparent">
        <Layout.Sider
          className="!bg-transparent h-[calc(100vh-86px-40px)] mr-3"
          width={256}
        >
          <Glassmorphism className="h-full">
            <Menu
              className="w-full !bg-transparent"
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
        <Layout.Content className="ml-2">
          <Glassmorphism className="h-full">{children}</Glassmorphism>
        </Layout.Content>
      </Layout>
    </>
  );
};

export default DashboardPageLayout;
