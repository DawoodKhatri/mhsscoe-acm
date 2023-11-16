"use client";
import { NAV_DESKTOP_ITEMS, NAV_MOBILE_ITEMS } from "@/constants/navbarItems";
import { Button, Grid, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuOutlined } from "@ant-design/icons";
import Glassmorphism from "./glassmorphism";
import { useState } from "react";
import { useSelector } from "react-redux";
import CommonServices from "@/services/common";
import checkNavItemAccess from "@/utils/checkNavItemAccess";

const AppNavbar = () => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const pathname = usePathname();

  const { md, lg } = Grid.useBreakpoint();

  let NAV_ITEMS = md ? NAV_DESKTOP_ITEMS : NAV_MOBILE_ITEMS;

  NAV_ITEMS = NAV_ITEMS.filter(({ conditions }) =>
    checkNavItemAccess(conditions, { isLoggedIn, role })
  );

  NAV_ITEMS = NAV_ITEMS.map(({ children, ...items }) => ({
    ...items,
    children: children
      ? children.filter(({ conditions }) =>
          checkNavItemAccess(conditions, { isLoggedIn, role })
        )
      : undefined,
  }));

  const getSelectedMenuItemKey = ({ isMobile } = { isMobile: false }) => {
    const item = NAV_ITEMS.filter(({ href }) => pathname.includes(href)).slice(
      -1
    )[0];

    const itemIndex = NAV_ITEMS.indexOf(item);

    if (!item.children || lg) return `navbar_menu_item_${itemIndex}`;

    const subItemIndex = item.children.indexOf(
      item.children.filter(({ href }) => pathname.includes(href)).slice(-1)[0]
    );

    return [
      `navbar_menu_item_${itemIndex}`,
      `navbar_menu_item_${itemIndex}_${subItemIndex}`,
    ];
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
      <Glassmorphism className="border-transparent border-b-white rounded-none !sticky top-0 z-10">
        <nav className="flex items-center justify-between px-8 md:px-10">
          <div>
            <img src="/logo.png" className="py-2 h-16" />
          </div>
          {md ? (
            <>
              <div className="flex flex-1 text-center justify-center">
                <Menu
                  className="w-full !bg-transparent "
                  mode="horizontal"
                  disabledOverflow={true}
                  selectedKeys={getSelectedMenuItemKey()}
                >
                  {NAV_ITEMS.map(({ label, icon, href, children }, index) =>
                    children && !lg ? (
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
              <div className="flex">
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
            </>
          ) : (
            <div>
              <Button
                className="w-14"
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
              >
                <MenuOutlined style={{ verticalAlign: 0 }} />
              </Button>
            </div>
          )}
        </nav>

        {!md ? (
          <div
            className={`transition-all duration-700 ease-in-out md:hidden ${
              mobileNavOpen ? "max-h-[468px] py-2" : "max-h-0"
            }`}
          >
            <Menu
              className="!bg-transparent"
              mode="inline"
              selectedKeys={getSelectedMenuItemKey({ isMobile: true })}
            >
              {NAV_ITEMS.map(
                (
                  { label, icon, href, children, isButton, onClick = () => {} },
                  index
                ) =>
                  children ? (
                    <Menu.SubMenu
                      key={`navbar_menu_item_${index}`}
                      title={label}
                      icon={icon}
                      className="[&>ul]:!bg-transparent"
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
        ) : (
          <></>
        )}
      </Glassmorphism>
    </>
  );
};

export default AppNavbar;
