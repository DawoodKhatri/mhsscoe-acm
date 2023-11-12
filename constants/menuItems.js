import CommonServices from "@/services/common";
import {
  ArrowRightOutlined,
  GroupOutlined,
  HomeOutlined,
  IdcardOutlined,
  LoginOutlined,
  LogoutOutlined,
  PictureOutlined,
  TeamOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const USER_DASHBOARD_MENU_ITEMS = [
  {
    label: "Profile",
    icon: <UserOutlined />,
    href: "/dashboard/profile",
  },
];

export const ADMIN_DASHBOARD_MENU_ITEMS = [
  {
    label: "Events",
    icon: <TrophyOutlined />,
    href: "/admin/events",
  },
  // {
  //   label: "Team",
  //   icon: <TeamOutlined />,
  //   href: "/admin/team",
  // },
];

export const NAV_DESKTOP_ITEMS = [
  {
    label: "Home",
    icon: <HomeOutlined />,
    href: "/",
  },
  {
    label: "Events",
    icon: <TrophyOutlined />,
    href: "/events",
  },
  // {
  //   label: "Gallery",
  //   icon: <PictureOutlined />,
  //   href: "/gallery",
  // },
  // {
  //   label: "Team",
  //   icon: <TeamOutlined />,
  //   href: "/team",
  // },
  {
    label: "Dashboard",
    icon: <IdcardOutlined />,
    href: "/dashboard",
    requireLoggedIn: true,
    children: USER_DASHBOARD_MENU_ITEMS,
  },
  {
    label: "Admin Panel",
    icon: <IdcardOutlined />,
    href: "/admin",
    requireAdminLoggedIn: true,
    children: ADMIN_DASHBOARD_MENU_ITEMS,
  },
];

export const NAV_MOBILE_ITEMS = [
  ...NAV_DESKTOP_ITEMS,
  {
    label: "Logout",
    icon: <LogoutOutlined />,
    isButton: true,
    requireLoggedIn: true,
    onClick: () =>
      CommonServices.logout(
        () => {},
        () => {}
      ),
  },
  {
    label: "Login",
    icon: <LoginOutlined />,
    href: "/login",
    requireLoggedOut: true,
  },
  {
    label: "Register",
    icon: <ArrowRightOutlined />,
    href: "/register",
    isButton: true,
    requireLoggedOut: true,
  },
];
