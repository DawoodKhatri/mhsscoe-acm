import React, { useEffect, useState } from "react";
import Glassmorphism from "../common/glassmorphism";
import {
  Avatar,
  Button,
  Col,
  Input,
  Row,
  Select,
  Space,
  message as showMessage,
} from "antd";
import { CheckOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { POST_LEVELS } from "@/constants/postLevels";
import TeamService from "@/services/team";
import SearchUser from "../common/searchUser";

const AdminTeamSectionPostControl = ({
  refresh,
  teamYear,
  sectionId,
  isNew,
  _id: postId,
  title,
  level,
  user,
}) => {
  const [postDetails, setPostDetails] = useState({
    title,
    level,
    user: user,
  });

  useEffect(() => {
    setPostDetails({
      title,
      level,
      user: user,
    });
  }, [postId]);

  const assignPost = () => {
    TeamService.assignPost(teamYear, sectionId, {
      ...postDetails,
      userId: postDetails.user?._id,
      user: undefined,
    })
      .then((message) => {
        showMessage.success(message);
        refresh();
      })
      .catch((message) => showMessage.error(message));
  };

  const updatePostDetails = () => {
    TeamService.updatePostDetails(teamYear, sectionId, postId, {
      ...postDetails,
      userId: postDetails.user._id,
      user: undefined,
    })
      .then((message) => {
        showMessage.success(message);
        refresh();
      })
      .catch((message) => showMessage.error(message));
  };

  const removePost = () => {
    TeamService.removePost(teamYear, sectionId, postId)
      .then((message) => {
        showMessage.success(message);
        refresh();
      })
      .catch((message) => showMessage.error(message));
  };

  return (
    <Glassmorphism className="p-5 flex flex-col justify-center items-center">
      {postDetails.user ? (
        <img
          className="rounded-full w-3/4 aspect-square object-cover mb-3"
          src={`/api/file/${postDetails.user?.profilePicture}`}
        />
      ) : (
        <div className="rounded-full w-3/4 aspect-square mb-3 bg-gray-400 flex justify-center items-center text-white">
          <UserOutlined className="text-7xl" />
        </div>
      )}

      <SearchUser
        selectedUser={postDetails.user}
        onUserSearched={(userDetails) =>
          setPostDetails({ ...postDetails, user: userDetails })
        }
      />

      <Space.Compact className="my-3 w-full">
        <Select
          className="min-w-[60px]"
          size="large"
          options={POST_LEVELS}
          value={postDetails.level}
          onChange={(value) => setPostDetails({ ...postDetails, level: value })}
        />
        <Input
          placeholder="Enter Post Title"
          value={postDetails.title}
          onChange={({ target: { value } }) =>
            setPostDetails({ ...postDetails, title: value })
          }
        />
      </Space.Compact>
      <Row className="w-full" justify={isNew ? "center" : "space-between"}>
        <Col>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={isNew ? assignPost : updatePostDetails}
          >
            Save
          </Button>
        </Col>

        {!isNew && (
          <Col>
            <Button
              className="!bg-red-500 hover:!bg-red-400"
              type="primary"
              icon={<DeleteOutlined />}
              onClick={removePost}
            >
              Delete
            </Button>
          </Col>
        )}
      </Row>
    </Glassmorphism>
  );
};

export default AdminTeamSectionPostControl;
