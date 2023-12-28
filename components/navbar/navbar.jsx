"use client";
import React, { useEffect, useState } from "react";
import Glassmorphism from "../common/glassmorphism";
import { Grid, message as showMessage } from "antd";
import NavbarLogo from "./logo";
import NavbarDesktopLinks from "./desktopLinks";
import NavbarDesktopAccount from "./desktopAccount";
import NavbarMobileToggle from "./mobileToggel";
import NavbarMobileView from "./mobileView";
import UserService from "@/services/user";
import { useRouter } from "next/navigation";

const AppNavbar = () => {
  const { sm } = Grid.useBreakpoint();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const router = useRouter();

  const logoutUser = async () => {
    UserService.logout()
      .then((message) => {
        showMessage.success(message);
        router.replace("/login");
      })
      .catch((message) => showMessage.error(message));
  };

  const getFilteredLinksByRole = (LINKS, role) => {
    return LINKS.filter(({ key, children }) => {
      if (key === "/admin") {
        return children.filter(({ roles }) => roles.includes(role)).length > 0;
      } else {
        return true;
      }
    }).map(({ key, children, ...item }) => {
      if (key !== "/admin") return { key, children, ...item };
      return {
        key,
        children: children.filter(({ roles }) => roles.includes(role)),
        ...item,
      };
    });
  };

  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.position = "fixed";
    } else {
      document.body.style.position = null;
    }
  }, [isMobileNavOpen]);
  return (
    <>
      <Glassmorphism className="border-transparent border-b-white rounded-none !sticky top-0 z-[5]">
        <nav className="flex items-center justify-between px-8 md:px-10 py-2">
          <NavbarLogo />
          {sm ? (
            <>
              <NavbarDesktopLinks />
              <NavbarDesktopAccount
                getFilteredLinksByRole={getFilteredLinksByRole}
                logoutUser={logoutUser}
              />
            </>
          ) : (
            <NavbarMobileToggle openMobileNav={() => setMobileNavOpen(true)} />
          )}
        </nav>
      </Glassmorphism>
      {!sm && isMobileNavOpen && (
        <NavbarMobileView
          getFilteredLinksByRole={getFilteredLinksByRole}
          closeMobileNav={() => setMobileNavOpen(false)}
          logoutUser={logoutUser}
        />
      )}
    </>
  );
};

export default AppNavbar;
