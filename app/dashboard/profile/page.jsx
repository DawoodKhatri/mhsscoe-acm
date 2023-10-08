"use client";
import UserService from "@/services/user";
import { CameraOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserDashboardProfile = () => {
  const router = useRouter();
  const [profileDetails, setProfileDetails] = useState();

  useEffect(() => {
    UserService.getProfileDetails(
      (details) => {
        setProfileDetails(details);
      },
      (message) => {
        alert(message);
      }
    );
  }, []);

  if (!profileDetails) return <></>;
  return (
    <>
      <div className="flex justify-evenly items-center h-full">
        <div className="text-center mt-10 mb-5 w-1/3">
          <div className="w-[192px] h-[192px] mx-auto my-4 relative">
            <img
              className="rounded-full w-full h-full"
              src="https://firebasestorage.googleapis.com/v0/b/legal-connect-sih-2023.appspot.com/o/Profile%20Pictures%2Fabae1211-21f0-46ee-a77a-70c3424a177a-1695634892842.jpg?alt=media&token=7754d357-ae33-40c1-8bd0-57417a5ff011"
            />
            <div className="bg-black bg-opacity-60 absolute top-0 w-full h-full rounded-full opacity-0 hover:opacity-100 hover:cursor-pointer flex justify-center items-center">
              <CameraOutlined className="text-[32px] !text-white" />
            </div>
            <img
              className="w-[60px] h-[60px] absolute bottom-0 right-0  p-1 rounded-full shadow-2xl border-2 border-primary bg-white"
              src="/logo.png"
            />
          </div>

          <p className="font-bold text-4xl text-primary my-4">Khatri Dawood</p>
        </div>
        <div className="w-1/3 text-lg">
          <p className="my-4">
            <span className="font-bold italic">Email: </span>
            {profileDetails.email}
          </p>
          <p className="my-4">
            <span className="font-bold italic">Roll No: </span>612027
          </p>
          <p className="my-4">
            <span className="font-bold italic">Branch: </span>Information
            Technology
          </p>
          <p className="my-4">
            <span className="font-bold italic">Year: </span>Fourth
          </p>
        </div>
      </div>
    </>
  );
};

export default UserDashboardProfile;
