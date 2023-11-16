"use client";
import TeamService from "@/services/team";
import React, { useEffect } from "react";
import { message as showMessage } from "antd";
import { useRouter } from "next/navigation";

const TeamsPage = () => {
  const router = useRouter();

  useEffect(() => {
    TeamService.getAllTeams()
      .then(({ teams = [] }) => {
        teams.length > 0 && router.replace(`/teams/${teams[0].year}`);
      })
      .catch((message) => showMessage.error(message));
  });

  return <></>;
};

export default TeamsPage;
