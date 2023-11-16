"use client";
import Glassmorphism from "@/components/common/glassmorphism";
import UserProfileUpdateForm from "@/components/profile/profileUpdateForm";
import { ROLES } from "@/constants/roles";
import { YEARS } from "@/constants/years";
import UserService from "@/services/user";
import getRoleOptions from "@/utils/getRoleOptions";
import { CheckOutlined } from "@ant-design/icons";
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

  useEffect(() => {
    UserService.getUserDetails(userId)
      .then(({ user }) => setUserDetails(user))
      .catch((message) => showMessage.error(message));
  }, [userId]);

  return (
    <>
      <UserProfileUpdateForm userId={userId} />
      <Glassmorphism className="h-full p-5 flex flex-col justify-center items-center text-black">
        <div className="flex-grow flex flex-col justify-center items-center">
          <div className="w-[192px] h-[192px] mx-auto my-4 relative">
            <img
              className="rounded-full w-full h-full"
              src={`/api/file/${userDetails?.profilePicture}`}
            />
            {userDetails?.isMember && (
              <img
                className="w-[60px] h-[60px] absolute bottom-0 right-0  p-1 rounded-full shadow-2xl border-2 border-primary bg-white"
                src="/logo.png"
              />
            )}
          </div>
          <p className="font-semibold text-3xl">{userDetails?.name}</p>
          <p className="text-lg">
            {YEARS.find(({ value }) => userDetails?.year === value)?.label} •{" "}
            {userDetails?.branch} • {userDetails?.rollno}
          </p>

          <div className="flex justify-center items-center gap-3 my-3">
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
        </div>
        <div className="p-5 flex justify-center items-center">
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={() => router.back()}
          >
            Done
          </Button>
        </div>
      </Glassmorphism>
    </>
  );
};

export default AdminUserDetailsPage;
