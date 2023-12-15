"use client";
import Glassmorphism from "@/components/common/glassmorphism";
import UserProfileUpdateForm from "@/components/profile/profileUpdateForm";
import UserService from "@/services/user";
import getRoleOptions from "@/utils/getRoleOptions";
import { CheckOutlined, CloseOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space, message as showMessage } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AdminUserDetailsPage = ({ params: { userId } }) => {
  const router = useRouter();
  const { role: currRole } = useSelector((state) => state.auth);

  const [userDetails, setUserDetails] = useState();
  const [membershipId, setMembershipId] = useState("");

  const updateMembership = (membershipId) => {
    UserService[membershipId ? "updateMembership" : "removeMembership"](
      userId,
      membershipId
    )
      .then((message) => {
        showMessage.success(message);
        setUserDetails({
          ...userDetails,
          membershipId: membershipId ?? undefined,
        });
        setMembershipId();
      })
      .catch((message) => showMessage.error(message));
  };

  const changeRole = (value) => {
    UserService[value ? "assignRole" : "removeRole"](userId, value)
      .then((message) => {
        showMessage.success(message);
        setUserDetails({ ...userDetails, role: value });
      })
      .catch((message) => showMessage.error(message));
  };

  const getDetails = () => {
    UserService.getUserDetails(userId)
      .then(({ user }) => {
        setUserDetails(user);
        setMembershipId(user.membershipId);
      })
      .catch((message) => showMessage.error(message));
  };

  const createUser = (details) => {
    UserService.createUser(details)
      .then(({ message, data: { newUserId } }) => {
        showMessage.success(message);
        router.replace(`/admin/users/${newUserId}`);
      })
      .catch((message) => showMessage.error(message));
  };

  const updateDetails = (details) => {
    UserService.updateUserDetails(userId, details)
      .then((message) => {
        showMessage.success(message);
        getDetails();
      })
      .catch((message) => showMessage.error(message));
  };

  useEffect(() => {
    if (userId !== "create") getDetails();
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
        <div className="w-full sm:w-fit  flex justify-center items-center gap-3">
          <p className="text-lg">Role:</p>
          <Select
            className="flex-grow sm:w-40"
            placeholder="Select Role"
            value={userDetails?.role ?? null}
            options={getRoleOptions(currRole, userDetails?.role)}
            onChange={changeRole}
            disabled={userId === "create"}
          />
        </div>
        <div className="w-full sm:w-fit">
          {userDetails?.membershipId ? (
            <Button
              className="!bg-red-500 hover:!bg-red-400"
              type="primary"
              icon={<CloseOutlined />}
              onClick={() => updateMembership()}
              block
            >
              Remove Membership
            </Button>
          ) : (
            <Space.Compact className="w-full sm:w-fit">
              <Input
                type="number"
                placeholder="Membership Id"
                disabled={userId === "create"}
                value={membershipId}
                onChange={({ target: { value } }) => setMembershipId(value)}
              />
              <Button
                type="primary"
                disabled={
                  userId === "create" || !membershipId || membershipId === ""
                }
                icon={<CheckOutlined />}
                onClick={() => updateMembership(membershipId)}
              >
                Save
              </Button>
            </Space.Compact>
          )}
        </div>
      </Glassmorphism>
      <Glassmorphism className="flex-grow">
        <UserProfileUpdateForm
          userDetails={userDetails}
          updateUserDetails={userId !== "create" ? updateDetails : createUser}
        />
      </Glassmorphism>
    </div>
  );
};

export default AdminUserDetailsPage;
