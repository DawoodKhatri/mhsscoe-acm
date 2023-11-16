"use client";
import DashboardLayout from "@/components/layouts/dashboardLayout";
import { USER_DASHBOARD_MENU_ITEMS } from "@/constants/navbarItems";
import React from "react";

const DashboardPageLayout = ({ children }) => {
  return (
    <DashboardLayout SIDER_ITEMS={USER_DASHBOARD_MENU_ITEMS}>
      {children}
    </DashboardLayout>
  );
};

export default DashboardPageLayout;
