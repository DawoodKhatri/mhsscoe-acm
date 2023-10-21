"use client";
import UserService from "@/services/user";
import { CameraOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
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
    <div className="h-full">
      <div className="flex justify-evenly items-center">
        <div className="text-center mt-10 mb-5 w-1/3">
          <div className="w-[192px] h-[192px] mx-auto my-4 relative">
            <img
              className="rounded-full w-full h-full"
              src={profileDetails?.profilePicture}
            />
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
      <div className="text-center">
        <Link href="/dashboard/profile/update">
          <Button type="primary" className="w-full md:w-56">
            Update Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboardProfile;
