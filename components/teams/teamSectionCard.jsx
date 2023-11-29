import TeamService from "@/services/team";
import React, { useEffect, useState } from "react";
import { Col, Empty, Row, message as showMessage } from "antd";
import Glassmorphism from "../common/glassmorphism";
import TeamSectionsPostCard from "./teamSectionsPostCard";

const TeamSectionCard = ({ teamYear, sectionId }) => {
  const [sectionDetails, setSectionDetails] = useState({});

  useEffect(() => {
    TeamService.getTeamSectionDetails(teamYear, sectionId)
      .then(({ section = {} }) => setSectionDetails(section))
      .catch((message) => showMessage.error(message));
  }, []);
  return (
    <div>
      <Glassmorphism className="p-5 mb-5">
        <h3 className="text-center text-4xl font-bold italic">
          {sectionDetails?.title}
        </h3>
      </Glassmorphism>
      {sectionDetails?.posts?.length > 0 ? (
        <Row gutter={[32, 32]} justify="space-evenly" align="middle">
          {sectionDetails?.posts?.map((post, index) => (
            <Col
              key={`teams_page_section_post_${index}`}
              span={12}
              sm={{ span: 8 }}
              md={{ span: 6 }}
              lg={{ span: 5 }}
            >
              <TeamSectionsPostCard {...post} />
            </Col>
          ))}
        </Row>
      ) : (
        <Glassmorphism className="h-full p-10 flex justify-center items-center">
          <Empty description="No Members found" />
        </Glassmorphism>
      )}
    </div>
  );
};

export default TeamSectionCard;
