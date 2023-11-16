import { YEARS } from "@/constants/years";
import UserService from "@/services/user";
import { Col, Empty, Flex, Row, Select, message as showMessage } from "antd";
import React, { useEffect, useState } from "react";

const SearchUser = ({ selectedUser, onUserSearched }) => {
  const [users, setUsers] = useState(selectedUser ? [selectedUser] : []);

  useEffect(() => {
    setUsers(selectedUser ? [selectedUser] : []);
  }, [selectedUser]);

  let timeout;

  const onSearch = (searchQuery) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    const currQuery = searchQuery;
    timeout = setTimeout(() => {
      if (currQuery === searchQuery) {
        if (searchQuery === "") {
          setUsers(selectedUser ? [selectedUser] : []);
        } else {
          UserService.searchUsers(searchQuery)
            .then(({ users: searchedUsers = [] }) => {
              setUsers(searchedUsers);
            })
            .catch((message) => showMessage.error(message));
        }
      }
    }, 750);
  };

  return (
    <Select
      className="w-full"
      placeholder="Search User"
      showSearch
      size="large"
      filterOption={false}
      onSearch={onSearch}
      onChange={(value) =>
        onUserSearched(users.find(({ _id }) => _id === value))
      }
      notFoundContent={
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="User not Found"
        />
      }
      value={selectedUser?._id ?? null}
      optionRender={({ value: optionUserId }) => (
        <div className="py-1 flex justify-center items-center">
          <img
            className="rounded-full w-12 aspect-square object-cover"
            src={`/api/file/${
              users.find(({ _id }) => _id === optionUserId)?.profilePicture
            }`}
          />
          <p className="flex-grow font-semibold text-sm px-1 overflow-hidden text-ellipsis">
            {users.find(({ _id }) => _id === optionUserId)?.name}
          </p>
          <p className="text-sm">
            {
              YEARS.find(
                ({ value }) =>
                  users.find(({ _id }) => _id === optionUserId)?.year === value
              )?.label
            }{" "}
            • {users.find(({ _id }) => _id === optionUserId)?.branch}
          </p>
        </div>
      )}
      options={users.map(({ _id, name, year, branch }) => ({
        value: _id,
        label: (
          <div className="py-1 flex justify-center items-center">
            <p className="flex-grow font-semibold text-sm px-1 overflow-hidden text-ellipsis">
              {name}
            </p>
            <p>
              {YEARS.find(({ value }) => year === value).label} • {branch}
            </p>
          </div>
        ),
      }))}
    />
  );
};

export default SearchUser;
