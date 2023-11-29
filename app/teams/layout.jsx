"use client";
import TeamService from "@/services/team";
import React, { useEffect, useState } from "react";
import { Select, message as showMessage } from "antd";
import { usePathname, useRouter } from "next/navigation";

const TeamsPageLayout = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const pathname = usePathname();
  const router = useRouter();
  const [currYear, setCurrYear] = useState(pathname.split("/")[2] ?? undefined);

  useEffect(() => {
    TeamService.getAllTeams()
      .then(({ teams = [] }) => {
        setTeams(teams);
      })
      .catch((message) => showMessage.error(message));
  }, []);

  useEffect(() => {
    if (teams.length > 0 && pathname.split("/").length === 2) {
      router.push(`/teams/${teams[0].year}`);
    }
  }, [teams]);

  useEffect(() => {
    teams.length > 0 && setCurrYear(pathname.split("/")[2] ?? undefined);
  }, [pathname]);

  return (
    <>
      <div className="my-5 flex gap-3 justify-center items-center">
        <p className="text-xl">Year:</p>
        <Select
          value={currYear}
          options={teams.map(({ year }) => ({
            label: year,
            href: `/teams/${year}`,
          }))}
          size="large"
        />
      </div>
      {children}
    </>
  );
};

export default TeamsPageLayout;
