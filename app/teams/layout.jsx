"use client";
import TeamService from "@/services/team";
import React, { useEffect, useState } from "react";
import { message as showMessage } from "antd";
import DashboardLayout from "@/components/layouts/dashboardLayout";
import { useRouter } from "next/navigation";

const TeamsPageLayout = ({ children }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    TeamService.getAllTeams()
      .then(({ teams = [] }) => {
        setTeams(teams);
      })
      .catch((message) => showMessage.error(message));
  }, []);

  return (
    <>
      <DashboardLayout
        SIDER_ITEMS={teams.map(({ year }) => ({
          label: year,
          href: `/teams/${year}`,
        }))}
      >
        {children}
      </DashboardLayout>
    </>
  );
};

export default TeamsPageLayout;
