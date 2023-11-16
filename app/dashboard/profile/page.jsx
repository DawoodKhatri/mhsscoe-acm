"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { message as showMessage } from "antd";
import Glassmorphism from "@/components/common/glassmorphism";
import UserService from "@/services/user";
import UserProfileUpdateForm from "@/components/profile/profileUpdateForm";

const UserDashboardProfileUpdate = () => {
  const [profileDetails, setProfileDetails] = useState();

  const getProfileDetails = () => {
    UserService.getProfileDetails(
      (details) => {
        setProfileDetails(details);
      },
      (message) => {
        showMessage.error(message);
      }
    );
  };

  const updateProfileDetails = (details) => {
    UserService.updateProfileDetails(
      details,
      (message) => {
        showMessage.success(message);
        getProfileDetails();
      },
      (message) => {
        showMessage.error(message);
      }
    );
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  return (
    <div className="flex flex-col gap-5 mb-10">
      <Glassmorphism className="p-5">
        <h2 className="text-3xl font-bold text-center">Profile Details</h2>
      </Glassmorphism>
      <Glassmorphism>
        <UserProfileUpdateForm
          userDetails={profileDetails}
          updateUserDetails={updateProfileDetails}
        />
      </Glassmorphism>
    </div>
  );
};

export default UserDashboardProfileUpdate;
