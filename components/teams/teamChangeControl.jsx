"use client";
import { getAllTeams } from "@/actions/teams";
import { Select, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TeamChangeControl = ({ currYear }) => {
  const router = useRouter();
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    getAllTeams().then((teams) => {
      setTeams(teams);
    });
  }, []);
  return (
    <div className="p-5 flex justify-center sm:justify-end items-center gap-3">
      <h2 className="text-2xl text-gray-700 font-bold itaic">Our Team</h2>
      {teams.length > 0 ? (
        <Select
          value={currYear}
          options={teams.map(({ year }) => ({
            label: (
              <p className="text-xl text-gray-700 font-bold itaic">{year}</p>
            ),
            value: year,
          }))}
          size="large"
          onChange={(value) => router.push(`/teams/${value}`)}
        />
      ) : (
        <Skeleton.Button size="large" active />
      )}
    </div>
  );
};

export default TeamChangeControl;
