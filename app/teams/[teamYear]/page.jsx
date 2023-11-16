"use client";
import TeamService from "@/services/team";
import React, { useEffect, useState } from "react";
import { Empty, message as showMessage } from "antd";
import TeamSectionCard from "@/components/teams/teamSectionCard";
import Glassmorphism from "@/components/common/glassmorphism";

const TeamDetailsPage = ({ params: { teamYear } }) => {
  const [teamSections, setTeamSections] = useState([]);

  useEffect(() => {
    TeamService.getTeamDetails(teamYear)
      .then(({ team: { sections = [] } = {} }) => setTeamSections(sections))
      .catch((message) => showMessage.error(message));
  }, []);

  return (
    <>
      {teamSections.length > 0 ? (
        <div className="flex flex-col gap-10 pb-10">
          {teamSections.map(({ _id }, index) => (
            <TeamSectionCard
              key={`teams_page_section_${index}`}
              teamYear={teamYear}
              sectionId={_id}
            />
          ))}
        </div>
      ) : (
        <Glassmorphism className="h-full p-5 flex justify-center items-center">
          <Empty description="No Members found" />
        </Glassmorphism>
      )}
    </>
  );
};

export default TeamDetailsPage;
