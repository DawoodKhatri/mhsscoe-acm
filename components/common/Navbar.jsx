"use client";
import { NAV_DESKTOP_ITEMS, NAV_MOBILE_ITEMS } from "@/constants/menuItems";
import { Button, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuOutlined } from "@ant-design/icons";
import Glassmorphism from "./glassmorphism";
import { useState } from "react";
import { useSelector } from "react-redux";
import CommonServices from "@/services/common";

const AppNavbar = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const pathname = usePathname();

  const getSelectedMenuItemKey = ({ isMobile } = { isMobile: false }) => {
    let NAV_ITEMS = isMobile ? NAV_MOBILE_ITEMS : NAV_DESKTOP_ITEMS;

    NAV_ITEMS = NAV_ITEMS.filter(({ requireLoggedIn, requireLoggedOut }) =>
      requireLoggedIn ? isLoggedIn : requireLoggedOut ? !isLoggedIn : true
    );

    const item = NAV_ITEMS.filter(({ href }) => pathname.includes(href)).slice(
      -1
    )[0];

    const itemIndex = NAV_ITEMS.indexOf(item);

    if (!item.children) return `navbar_menu_item_${itemIndex}`;

    const subItemIndex = item.children.indexOf(
      item.children.filter(({ href }) => pathname === href).slice(-1)[0]
    );

    return `navbar_menu_item_${itemIndex}_${subItemIndex}`;
  };

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const logout = () => {
    CommonServices.logout(
      () => {},
      () => {}
    );
  };
  return (
    <>
      <Glassmorphism className="border-transparent border-b-white rounded-none">
        <nav className="flex items-center justify-between px-8 md:px-10">
          <div>
            <img src="/logo.png" className="py-2 h-16" />
          </div>
          <div className="hidden md:flex flex-1 text-center justify-center">
            <Menu
              className="w-full !bg-transparent "
              mode="horizontal"
              disabledOverflow={true}
              selectedKeys={getSelectedMenuItemKey()}
            >
              {NAV_DESKTOP_ITEMS.filter(({ requireLoggedIn }) =>
                requireLoggedIn ? isLoggedIn : true
              ).map(({ label, icon, href, children }, index) =>
                children ? (
                  <Menu.SubMenu
                    key={`navbar_menu_item_${index}`}
                    title={label}
                    icon={icon}
                  >
                    {children.map(
                      (
                        { label: subLabel, icon: subIcon, href: subHref },
                        subIndex
                      ) => (
                        <Menu.Item
                          key={`navbar_menu_item_${index}_${subIndex}`}
                          icon={subIcon}
                        >
                          <Link href={subHref ?? ""}>{subLabel}</Link>
                        </Menu.Item>
                      )
                    )}
                  </Menu.SubMenu>
                ) : (
                  <Menu.Item
                    key={`navbar_menu_item_${index}`}
                    icon={icon}
                    className="!font-semibold !px-4 lg:!px-6 hover:!text-primary-light"
                  >
                    <Link href={href}>{label}</Link>
                  </Menu.Item>
                )
              )}
            </Menu>
          </div>
          <div className="hidden md:flex">
            {isLoggedIn ? (
              <>
                <Button
                  className="ml-2 bg-primary"
                  type="primary"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button className="mr-2">Login</Button>
                </Link>
                <Link href="/register">
                  <Button className="ml-2 bg-primary" type="primary">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden">
            <Button
              className="w-14"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              <MenuOutlined style={{ verticalAlign: 0 }} />
            </Button>
          </div>
        </nav>

        <div
          className={`transition-all duration-1000 ease-in-out md:hidden ${
            mobileNavOpen ? "h-[284px] py-2" : "h-0 py-0"}`}
        >
          <Menu
            className="!bg-transparent"
            mode="inline"
            selectedKeys={getSelectedMenuItemKey({ isMobile: true })}
          >
            {NAV_MOBILE_ITEMS.filter(({ requireLoggedIn, requireLoggedOut }) =>
              requireLoggedIn
                ? isLoggedIn
                : requireLoggedOut
                ? !isLoggedIn
                : true
            ).map(
              (
                { label, icon, href, children, isButton, onClick = () => {} },
                index
              ) =>
                children ? (
                  <Menu.SubMenu
                    key={`navbar_menu_item_${index}`}
                    title={label}
                    icon={icon}
                  >
                    {children.map(
                      (
                        { label: subLabel, icon: subIcon, href: subHref },
                        subIndex
                      ) => (
                        <Menu.Item
                          key={`navbar_menu_item_${index}_${subIndex}`}
                          icon={subIcon}
                          onClick={() => {
                            setMobileNavOpen(false);
                            onClick();
                          }}
                        >
                          <Link href={subHref ?? ""}>{subLabel}</Link>
                        </Menu.Item>
                      )
                    )}
                  </Menu.SubMenu>
                ) : (
                  <Menu.Item
                    key={`navbar_menu_item_${index}`}
                    icon={icon}
                    className={`${
                      isButton
                        ? "!bg-primary !text-white hover:!bg-primary-light"
                        : ""
                    }`}
                    onClick={() => {
                      setMobileNavOpen(false);
                      onClick();
                    }}
                  >
                    <Link href={href ?? ""}>{label}</Link>
                  </Menu.Item>
                )
            )}
          </Menu>
        </div>
      </Glassmorphism>
    </>
  );
};

export default AppNavbar;
