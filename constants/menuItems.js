import CommonServices from "@/services/common";
import {
  ArrowRightOutlined,
  GroupOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  PictureOutlined,
  TeamOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const DASHBOARD_MENU_ITEMS = [
  {
    label: "Profile",
    icon: <UserOutlined />,
    href: "/dashboard/profile",
  },
  {
    label: "Events",
    icon: <TrophyOutlined />,
    href: "/dashboard/events",
  },
  {
    label: "Achievements",
    icon: <TrophyOutlined />,
    href: "/dashboard/achievements",
  },
  {
    label: "Certificates",
    icon: <TrophyOutlined />,
    href: "/dashboard/certificates",
  },
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
  {
    label: "Gallery",
    icon: <PictureOutlined />,
    href: "/gallery",
  },
  {
    label: "Team",
    icon: <TeamOutlined />,
    href: "/team",
  },
  {
    label: "Dashboard",
    icon: <UserOutlined />,
    href: "/dashboard",
    requireLoggedIn: true,
    children: DASHBOARD_MENU_ITEMS,
  },
];

export const NAV_MOBILE_ITEMS = [
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
  {
    label: "Gallery",
    icon: <PictureOutlined />,
    href: "/gallery",
  },
  {
    label: "Team",
    icon: <TeamOutlined />,
    href: "/team",
  },
  {
    label: "Dashboard",
    icon: <UserOutlined />,
    href: "/dashboard",
    requireLoggedIn: true,
    children: DASHBOARD_MENU_ITEMS,
  },
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
