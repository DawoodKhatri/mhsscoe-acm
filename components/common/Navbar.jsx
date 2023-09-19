"use client";
import { NAV_ITEMS } from "@/constants/navbar";
import { Button, Col, Layout, Menu, Row } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuOutlined } from "@ant-design/icons";
import Glassmorphism from "./glassmorphism";
import { colorPrimary } from "@/constants/colors";
import { useState } from "react";

const AppNavbar = () => {
  const pathname = usePathname();

  const getSelectedMenuItemKey = () => {
    return `navbar_manu_item_${NAV_ITEMS.indexOf(
      NAV_ITEMS.filter(({ href }) => href === pathname)[0]
    )}`;
  };

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="p-5 pb-0">
      <Glassmorphism>
        <nav className="flex items-center justify-between px-8 md:px-10">
          <div>
            <img src="/logo.png" className="py-2 h-16" />
          </div>
          <div className="hidden md:block">
            <ul className="flex">
              {NAV_ITEMS.map(({ label, href }, index) => (
                <li
                  key={`navbar_manu_item_${index}`}
                  className={`mx-4 border-b-primary hover:border-b-2 hover:cursor-pointer${
                    href === pathname ? " text-primary border-b-2" : ""
                  }`}
                >
                  <Link
                    href={href}
                    className="px-4 h-16 flex items-center text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:flex">
            <Button className="mr-2">Login</Button>
            <Button className="ml-2 bg-primary" type="primary">
              Signup
            </Button>
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
      </Glassmorphism>

      <Glassmorphism
        className={`transition-all ease-in-out duration-1000 md:hidden ${
          mobileNavOpen ? "my-5" : " scale-y-0 h-0"
        }`}
      >
        <Menu
          className="w-full bg-transparent text-center"
          selectedKeys={getSelectedMenuItemKey()}
          onClick={() => setMobileNavOpen(false)}
        >
          {NAV_ITEMS.map(({ label, href }, index) => (
            <Menu.Item key={`navbar_manu_item_${index}`}>
              <Link href={href} className="">
                {label}
              </Link>
            </Menu.Item>
          ))}
          <Button className="h-10 mx-1 w-[calc(100%-8px)] my-1" type="text">
            Login
          </Button>
          <Button
            className="h-10 mx-1 w-[calc(100%-8px)] bg-primary hover:!bg-primary-light !text-white mb-1"
            type="text"
          >
            Signup
          </Button>
        </Menu>
      </Glassmorphism>
    </div>
  );
};

export default AppNavbar;
