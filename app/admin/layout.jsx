"use client";
import DashboardLayout from "@/components/layouts/dashboardLayout";
import { ADMIN_DASHBOARD_MENU_ITEMS } from "@/constants/navbarItems";
import React from "react";

const AdminPageLayout = ({ children }) => {
  return (
    <DashboardLayout SIDER_ITEMS={ADMIN_DASHBOARD_MENU_ITEMS}>
      {children}
    </DashboardLayout>
  );
};

export default AdminPageLayout;
