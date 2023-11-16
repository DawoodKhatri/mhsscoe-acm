"use client";

import { ROLES } from "@/constants/roles";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const RoutesProtection = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { isLoading } = useSelector((state) => state.common);
  const { isLoggedIn, role, isProfileIncomplete } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!isLoading) {
      if (isLoggedIn === true) {
        if (!Object.values(ROLES).includes(role) && pathname.includes("/admin")) {
          router.replace("/not-found");
        }

        if (pathname === "/login" || pathname === "/register") {
          router.replace("/dashboard");
        }

        if (pathname === "/dashboard") {
          router.replace("/dashboard/profile");
        }

        if (pathname === "/admin") {
          router.replace("/admin/events");
        }

        if (isProfileIncomplete === true && pathname.includes("/dashboard")) {
          router.replace("/dashboard/profile");
        }
      } else if (isLoggedIn === false) {
        if (pathname.includes("/dashboard") || pathname.includes("/admin"))
          router.replace("/login");
      }
    }
  }, [isLoggedIn, isProfileIncomplete, pathname]);
  return <></>;
};

export default RoutesProtection;
