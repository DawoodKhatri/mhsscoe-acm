import React, { useEffect, useState } from "react";
import Glassmorphism from "../common/glassmorphism";
import {
  Button,
  Col,
  DatePicker,
  Empty,
  Row,
  Select,
  Space,
  message as showMessage,
} from "antd";
import TeamService from "@/services/team";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const AdminTeamControl = ({ allTeamsQuery, currTeamYear, setCurrTeamYear }) => {
  const { data: { teams = [] } = {} } = allTeamsQuery;

  const [newTeamYearValue, setNewTeamYearValue] = useState();

  useEffect(() => {
    setCurrTeamYear(teams[0]?.year);
  }, [teams]);

  const createTeam = () => {
    if (newTeamYearValue) {
      TeamService.createTeam(newTeamYearValue)
        .then((message) => {
          showMessage.success(message);
          allTeamsQuery.refetch();
          setNewTeamYearValue();
        })
        .catch((message) => showMessage.error(message));
    } else {
      showMessage.error("Select Team Year");
    }
  };

  const deleteTeam = () => {
    TeamService.deleteTeam(currTeamYear)
      .then((message) => {
        showMessage.success(message);
        allTeamsQuery.refetch();
      })
      .catch((message) => showMessage.error(message));
  };
  return (
    <>
      {teams.length > 0 ? (
        <Glassmorphism className="mb-5">
          <Row className="m-3 gap-5" justify="space-between" align="middle">
            <Col>
              <Row className="w-64" align="middle">
                <Col span={10}>
                  <span className="text-base">Select Team:</span>
                </Col>
                <Col span={14}>
                  <Space.Compact className="w-full">
                    <Select
                      className="w-full"
                      options={teams.map(({ year }) => ({
                        label: year,
                        value: year,
                      }))}
                      value={currTeamYear}
                      onChange={(value) => setCurrTeamYear(value)}
                    />
                    <Button
                      className="!bg-red-500 hover:!bg-red-400"
                      type="primary"
                      icon={<DeleteOutlined />}
                      onClick={deleteTeam}
                    />
                  </Space.Compact>
                </Col>
              </Row>
            </Col>

            <Col flex={1} />
            <Col>
              <Space.Compact>
                <DatePicker
                  placeholder="Select Year"
                  picker="year"
                  allowClear={false}
                  disabledDate={(current) =>
                    teams.filter(
                      ({ year }) => year.slice(0, 4) === current?.format("YYYY")
                    ).length
                  }
                  value={
                    newTeamYearValue
                      ? dayjs(newTeamYearValue.slice(0, 4))
                      : null
                  }
                  onChange={(value) =>
                    setNewTeamYearValue(
                      `${value?.format("YYYY")}-${
                        Number(value?.format("YY")) + 1
                      }`
                    )
                  }
                />
                <Button type="primary" onClick={createTeam}>
                  Create Team
                </Button>
              </Space.Compact>
            </Col>
          </Row>
        </Glassmorphism>
      ) : (
        <Glassmorphism className="h-[calc(100%+40px)] flex justify-center items-center">
          <Empty description="No Teams Created Yet">
            <Space.Compact className="mt-5">
              <DatePicker
                placeholder="Select Year"
                picker="year"
                size="large"
                allowClear={false}
                value={
                  newTeamYearValue ? dayjs(newTeamYearValue.slice(0, 4)) : null
                }
                onChange={(value) =>
                  setNewTeamYearValue(
                    `${value?.format("YYYY")}-${
                      Number(value?.format("YY")) + 1
                    }`
                  )
                }
              />
              <Button type="primary" size="large" onClick={createTeam}>
                Create Team
              </Button>
            </Space.Compact>
          </Empty>
        </Glassmorphism>
      )}
    </>
  );
};

export default AdminTeamControl;
