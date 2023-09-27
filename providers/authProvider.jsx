"use client";
import { login, logout } from "@/redux/reducers/authReducer";
import { dispatch } from "@/redux/store";
import CommonServices from "@/services/common";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const AuthProvider = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    CommonServices.checkAuth(
      (details) => {
        dispatch(login(details));
      },
      (message) => {
        dispatch(logout());
      }
    );
  }, [isLoggedIn]);
  return children;
};

export default AuthProvider;
