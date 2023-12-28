import React from "react";
import NavbarLogo from "./logo";
import NavbarMobileToggle from "./mobileToggel";
import { Button, Divider, Menu } from "antd";
import Link from "next/link";
import {
  CheckCircleOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Glassmorphism from "../common/glassmorphism";
import { NAVBAR_AUTH_LINKS, NAVBAR_LINKS } from "@/constants/navbarItems";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const NavbarMobileView = ({
  getFilteredLinksByRole,
  closeMobileNav,
  logoutUser,
}) => {
  let pathname = usePathname();
  if (pathname.includes("/teams/") && !pathname.includes("/admin/"))
    pathname = "/teams";

  const { isLoggedIn, role, name, email, profilePicture } = useSelector(
    (state) => state.auth
  );

  return (
    <div
      className="w-full h-screen fixed top-0 left-0 right-0 bg-white overflow-y-scroll z-[6]"
      onClick={() => closeMobileNav()}
    >
      <Glassmorphism className="border-transparent border-b-white rounded-none !sticky top-0 z-[7]">
        <nav className="flex items-center justify-between px-8 py-2">
          <NavbarLogo />
          <NavbarMobileToggle closeMobileNav={closeMobileNav} open />
        </nav>
      </Glassmorphism>
      <div className="px-8 py-5">
        {isLoggedIn && name && email && (
          <>
            <Link
              href={`/user/${email.split("@")[0]}`}
              className="text-black hover:text-gray-500"
            >
              <div className="px-2 w-full flex gap-2 items-center">
                <div className="flex-grow">
                  <p className="font-semibold text-ellipsis line-clamp-1">
                    {name}
                  </p>
                  <p className="text-ellipsis line-clamp-1 break-all">
                    {email}
                  </p>
                </div>
                {profilePicture && (
                  <div className="h-10 aspect-square">
                    <img
                      className="rounded-full w-full h-full"
                      src={`/api/file/${
                        profilePicture ?? "Profile%20Pictures/default"
                      }`}
                    />
                  </div>
                )}
              </div>
            </Link>
            <Divider className="!mb-2" />
          </>
        )}
        <Menu
          className="w-full"
          selectedKeys={[pathname]}
          items={NAVBAR_LINKS}
        />
        {isLoggedIn ? (
          <>
            <Divider className="!my-2" />
            <Menu
              className="w-full"
              mode="inline"
              selectedKeys={[pathname]}
              items={getFilteredLinksByRole(NAVBAR_AUTH_LINKS, role)}
              onClick={() => closeMobileNav()}
            />
            <Button
              className="!mx-1 !my-1 !px-4 w-[calc(100%-8px)] !text-start"
              type="primary"
              icon={<LogoutOutlined />}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                logoutUser();
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Divider className="!mt-2" />
            <Link href="/login">
              <Button
                className="!mx-1 !mb-2 !px-4 w-[calc(100%-8px)] !text-start"
                icon={<LoginOutlined />}
                block
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button
                className="!mx-1 !mt-2 !px-4 w-[calc(100%-8px)] !text-start"
                type="primary"
                icon={<CheckCircleOutlined />}
                block
              >
                Register
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavbarMobileView;
