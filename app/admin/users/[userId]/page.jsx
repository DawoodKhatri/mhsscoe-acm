"use client";
import Glassmorphism from "@/components/common/glassmorphism";
import UserProfileUpdateForm from "@/components/profile/profileUpdateForm";
import UserService from "@/services/user";
import getRoleOptions from "@/utils/getRoleOptions";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Select, Switch, message as showMessage } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AdminUserDetailsPage = ({ params: { userId } }) => {
  const router = useRouter();
  const { role: currRole } = useSelector((state) => state.auth);

  const [userDetails, setUserDetails] = useState({});

  const changeMembership = (isMember) => {
    UserService[isMember ? "assignMembership" : "removeMembership"](
      userDetails._id
    )
      .then((message) => {
        showMessage.success(message);
        setUserDetails({ ...userDetails, isMember });
      })
      .catch((message) => showMessage.error(message));
  };

  const changeRole = (value) => {
    UserService[value ? "assignRole" : "removeRole"](userDetails._id, value)
      .then((message) => {
        showMessage.success(message);
        setUserDetails({ ...userDetails, role: value });
      })
      .catch((message) => showMessage.error(message));
  };

  const updateDetails = (details) => {
    UserService.updateUserDetails(userDetails._id, details)
      .then((message) => {
        delete details.profilePicture;
        showMessage.success(message);
        setUserDetails({ ...userDetails, ...details });
      })
      .catch((message) => showMessage.error(message));
  };

  useEffect(() => {
    UserService.getUserDetails(userId)
      .then(({ user }) => setUserDetails(user))
      .catch((message) => showMessage.error(message));
  }, [userId]);

  return (
    <div className="h-full flex flex-col gap-5 mb-10">
      <Glassmorphism className="flex flex-col sm:flex-row items-center gap-5 p-5">
        <div className="w-full sm:w-fit flex-grow">
          <Button
            className="w-full sm:w-fit"
            type="primary"
            icon={<LeftOutlined />}
            onClick={() => router.back()}
          >
            Back
          </Button>
        </div>
        <div className="flex justify-center items-center gap-3">
          <p className="text-lg">Role:</p>
          <Select
            className="w-40"
            placeholder="Select Role"
            value={userDetails?.role ?? null}
            options={getRoleOptions(currRole, userDetails?.role)}
            onChange={changeRole}
          />
        </div>
        <div className="flex justify-center items-center gap-3">
          <p className="text-lg">Membership:</p>
          <Switch
            checked={userDetails?.isMember}
            onChange={changeMembership}
            className={userDetails?.isMember ? "" : "bg-gray-300"}
          />
        </div>
      </Glassmorphism>
      <Glassmorphism className="flex-grow">
        <UserProfileUpdateForm
          userDetails={userDetails}
          updateUserDetails={updateDetails}
        />
      </Glassmorphism>
    </div>
  );
};

export default AdminUserDetailsPage;
