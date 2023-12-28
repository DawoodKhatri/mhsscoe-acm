"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { message as showMessage } from "antd";
import Glassmorphism from "@/components/common/glassmorphism";
import UserService from "@/services/user";
import UserProfileUpdateForm from "@/components/profile/profileUpdateForm";

const MyProfileUpdatePage = () => {
  const [profileDetails, setProfileDetails] = useState();

  const getProfileDetails = () => {
    UserService.getProfileDetails()
      .then((details) => setProfileDetails(details))
      .catch((message) => showMessage.error(message));
  };

  const updateProfileDetails = (details) => {
    UserService.updateProfileDetails(details)
      .then((message) => {
        showMessage.success(message);
        getProfileDetails();
        UserService.getAuthStatus();
      })
      .catch((message) => showMessage.error(message));
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  return (
    <div className="flex flex-col gap-5 mb-10">
      <Glassmorphism className="p-5">
        <h2 className="text-3xl font-bold text-center text-gray-700">
          Update Profile Details
        </h2>
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

export default MyProfileUpdatePage;
