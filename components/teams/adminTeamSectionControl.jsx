import React, { useEffect, useState } from "react";
import Glassmorphism from "../common/glassmorphism";
import { Button, Col, Input, Row, Space, message as showMessage } from "antd";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import TeamService from "@/services/team";
import { useQuery } from "react-query";
import AdminTeamSectionPostControl from "./adminTeamSectionPostControl";

const AdminTeamSectionControl = ({ teamYear, refresh, _id: sectionId }) => {
  const teamSectionDetailsQuery = useQuery(
    ["teamSectionDetails", sectionId],
    async () => TeamService.getTeamSectionDetails(teamYear, sectionId),
    { retry: false }
  );

  const { data: { section: { title = "", posts = [] } = {} } = {} } =
    teamSectionDetailsQuery;

  const [sectionTitle, setSectionTitle] = useState(title);

  useEffect(() => {
    setSectionTitle(title);
  }, [title]);

  const updateSectionTitle = () => {
    TeamService.updateTeamSectionTitle(teamYear, sectionId, sectionTitle)
      .then((message) => {
        showMessage.success(message);
        teamSectionDetailsQuery.refetch();
      })
      .catch((message) => showMessage.error(message));
  };

  const deleteSection = () => {
    TeamService.deleteTeamSection(teamYear, sectionId)
      .then((message) => {
        showMessage.success(message);
        refresh();
      })
      .catch((message) => showMessage.error(message));
  };
  return (
    <>
      <Glassmorphism className="p-5">
        <Row justify="space-between">
          <Col>
            <Space.Compact>
              <Input
                placeholder="Enter Section Title"
                value={sectionTitle}
                onChange={({ target: { value } }) => setSectionTitle(value)}
              />
              <Button
                icon={<CheckOutlined />}
                onClick={updateSectionTitle}
                type="primary"
              >
                Save
              </Button>
            </Space.Compact>
          </Col>
          <Col>
            <Button
              className="!bg-red-500 hover:!bg-red-400"
              icon={<DeleteOutlined />}
              onClick={deleteSection}
              type="primary"
            >
              Delete Section
            </Button>
          </Col>
        </Row>
      </Glassmorphism>
      <Row gutter={[32, 32]}>
        {[...posts, { isNew: true }].map((post, index) => (
          <Col
            span={24}
            sm={{ span: 12 }}
            md={{ span: 8 }}
            key={`admin_teams_sections_posts_${index}`}
          >
            <AdminTeamSectionPostControl
              refresh={() => teamSectionDetailsQuery.refetch()}
              teamYear={teamYear}
              sectionId={sectionId}
              {...post}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default AdminTeamSectionControl;
