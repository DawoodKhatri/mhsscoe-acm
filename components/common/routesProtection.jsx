"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const RoutesProtection = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { isLoading } = useSelector((state) => state.common);
  const { isLoggedIn, isAdmin, isProfileIncomplete } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!isLoading) {
      if (isLoggedIn === true) {
        if (!isAdmin && pathname.includes("/admin")) {
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
          router.replace("/dashboard/profile/update");
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
