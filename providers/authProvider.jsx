"use client";
import CommonServices from "@/services/common";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const AuthProvider = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    CommonServices.checkAuth();
  }, [isLoggedIn]);
  return children;
};

export default AuthProvider;
