"use client";

import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const details = useSelector((state) => state.auth);
  return <div>{JSON.stringify(details)}</div>;
};

export default AdminDashboard;
