import { NAVBAR_AUTH_LINKS } from "@/constants/navbarItems";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Divider, Menu, Popover } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const NavbarDesktopAccount = ({ getFilteredLinksByRole, logoutUser }) => {
  const pathname = usePathname();

  const { isLoggedIn, role, profilePicture, name, email } = useSelector(
    (state) => state.auth
  );

  return isLoggedIn ? (
    <div className="py-1">
      <Popover
        content={
          <div className="w-56">
            {name && email && (
              <>
                <Link
                  href={`/user?email=${email}`}
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
                    <div className="h-10 aspect-square">
                      <img
                        className="rounded-full w-full h-full"
                        src={`/api/file/${
                          profilePicture ?? "Profile%20Pictures/default"
                        }`}
                      />
                    </div>
                  </div>
                </Link>
                <Divider className="!mb-2" />
              </>
            )}
            <Menu
              className="w-56"
              mode="inline"
              selectedKeys={[pathname]}
              items={getFilteredLinksByRole(NAVBAR_AUTH_LINKS, role)}
            />
            <Button
              className="!mx-1 !my-1 !px-4 w-[calc(100%-8px)] !text-start"
              type="primary"
              icon={<LogoutOutlined />}
              onClick={() => logoutUser()}
              block
            >
              Logout
            </Button>
          </div>
        }
      >
        <img
          className="rounded-full h-10 aspect-square"
          src={`/api/file/${profilePicture ?? "Profile%20Pictures/default"}`}
        />
      </Popover>
    </div>
  ) : (
    <div>
      <Link href="/login">
        <Button className="mr-2">Login</Button>
      </Link>
      <Link href="/register">
        <Button className="ml-2" type="primary">
          Register
        </Button>
      </Link>
    </div>
  );
};

export default NavbarDesktopAccount;
