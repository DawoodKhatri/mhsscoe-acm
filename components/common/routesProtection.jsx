"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const RoutesProtection = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { isLoading } = useSelector((state) => state.common);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoading) {
      if (isLoggedIn === true) {
        if (pathname === "/login" || pathname === "/register")
          router.replace("/dashboard");
      } else if(isLoggedIn === false) {
        if (pathname.includes("/dashboard")) router.replace("/login");
      }
    }
  }, [isLoggedIn]);
  return <></>;
};

export default RoutesProtection;
