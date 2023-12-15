import { NAVBAR_LINKS } from "@/constants/navbarItems";
import { Menu } from "antd";
import { usePathname } from "next/navigation";
import React from "react";

function NavbarDesktopLinks() {
  let pathname = usePathname();
  if (pathname.includes("/teams/")) pathname = "/teams";
  return (
    <div className="flex flex-1 text-center justify-center">
      <Menu
        className="w-full !bg-transparent"
        mode="horizontal"
        disabledOverflow={true}
        selectedKeys={[pathname]}
        items={NAVBAR_LINKS}
      />
    </div>
  );
}

export default NavbarDesktopLinks;
