import CommonServices from "@/services/common";
import {
  ArrowRightOutlined,
  BookOutlined,
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
import { ROLES } from "./roles";

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
    conditions: {
      requiredRole: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGE_EVENTS],
    },
  },
  {
    label: "Teams",
    icon: <TeamOutlined />,
    href: "/admin/teams",
    conditions: {
      requiredRole: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGE_TEAMS],
    },
  },
  {
    label: "Users",
    icon: <UserOutlined />,
    href: "/admin/users",
    conditions: {
      requiredRole: [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.MANAGE_USERS,
        ROLES.USER_PROFILE,
      ],
    },
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
  // {
  //   label: "Gallery",
  //   icon: <PictureOutlined />,
  //   href: "/gallery",
  // },
  {
    label: "Our Team",
    icon: <TeamOutlined />,
    href: "/teams",
  },
  {
    label: "Magazines",
    icon: <BookOutlined />,
    href: "/magazines",
  },
  {
    label: "Dashboard",
    icon: <IdcardOutlined />,
    href: "/dashboard",
    conditions: {
      requireLoggedIn: true,
    },
    children: USER_DASHBOARD_MENU_ITEMS,
  },
  {
    label: "Admin Panel",
    icon: <IdcardOutlined />,
    href: "/admin",
    conditions: {
      requireLoggedIn: true,
      requiredRole: Object.values(ROLES),
    },
    children: ADMIN_DASHBOARD_MENU_ITEMS,
  },
];

export const NAV_MOBILE_ITEMS = [
  ...NAV_DESKTOP_ITEMS,
  {
    label: "Logout",
    icon: <LogoutOutlined />,
    isButton: true,
    conditions: {
      requireLoggedIn: true,
    },
    onClick: () => CommonServices.logout(),
  },
  {
    label: "Login",
    icon: <LoginOutlined />,
    href: "/login",
    conditions: {
      requireLoggedOut: true,
    },
  },
  {
    label: "Register",
    icon: <ArrowRightOutlined />,
    href: "/register",
    isButton: true,
    conditions: {
      requireLoggedOut: true,
    },
  },
];
