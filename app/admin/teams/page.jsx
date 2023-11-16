"use client";

import Glassmorphism from "@/components/common/glassmorphism";
import AdminTeamControl from "@/components/teams/adminTeamControl";
import AdminTeamSectionControl from "@/components/teams/adminTeamSectionControl";
import TeamService from "@/services/team";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Empty,
  Input,
  Row,
  Select,
  Space,
  message as showMessage,
} from "antd";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

const AdminTeamsPage = () => {
  const allTeamsQuery = useQuery(
    "teams",
    async () => TeamService.getAllTeams(),
    { retry: false }
  );

  const [currTeamYear, setCurrTeamYear] = useState();

  const teamSectionsQuery = useQuery(
    ["teamSections", currTeamYear],
    async () => currTeamYear && TeamService.getTeamDetails(currTeamYear),
    { retry: false }
  );
  const { data: { team: { sections = [] } = {} } = {} } = teamSectionsQuery;

  const createNewSection = () => {
    TeamService.createTeamSection(currTeamYear)
      .then((message) => {
        showMessage.success(message);
        teamSectionsQuery.refetch();
      })
      .catch((message) => showMessage.error(message));
  };

  return (
    <div className="mx-3 h-full flex flex-col">
      <AdminTeamControl
        allTeamsQuery={allTeamsQuery}
        currTeamYear={currTeamYear}
        setCurrTeamYear={setCurrTeamYear}
      />
      {currTeamYear && (
        <>
          {sections && sections.length > 0 ? (
            <div className="flex flex-col gap-5 pb-10">
              {sections.map((section, index) => (
                <AdminTeamSectionControl
                  key={`admin_team_section_control_${index}`}
                  teamYear={currTeamYear}
                  refresh={() => teamSectionsQuery.refetch()}
                  {...section}
                />
              ))}
              <Glassmorphism className="p-5 flex justify-center items-center">
                <Button
                  type="primary"
                  size="large"
                  onClick={createNewSection}
                  icon={<PlusOutlined />}
                >
                  Add Section
                </Button>
              </Glassmorphism>
            </div>
          ) : (
            <Glassmorphism className="flex-grow flex justify-center items-center">
              <Empty description="No Sections Created Yet">
                <Button type="primary" size="large" onClick={createNewSection}>
                  Create Section
                </Button>
              </Empty>
            </Glassmorphism>
          )}
        </>
      )}
    </div>
  );
};

export default AdminTeamsPage;
