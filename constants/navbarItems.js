import {
  BookOutlined,
  HomeOutlined,
  ProfileOutlined,
  TeamOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ROLES } from "./roles";
import Link from "next/link";

export const NAVBAR_LINKS = [
  {
    key: "/",
    icon: <HomeOutlined />,
    label: <Link href="/">Home</Link>,
  },
  {
    key: "/events",
    icon: <TrophyOutlined />,
    label: <Link href="/events">Events</Link>,
  },
  {
    key: "/teams",
    icon: <TeamOutlined />,
    label: <Link href="/teams">Our Team</Link>,
  },
  {
    key: "/magazines",
    icon: <BookOutlined />,
    label: <Link href="/magazines">Magazines</Link>,
  },
];

export const NAVBAR_AUTH_LINKS = [
  {
    key: "/myaccount",
    label: "My Account",
    type: "group",
    children: [
      {
        key: "/myaccount/update-profile",
        icon: <ProfileOutlined />,
        label: <Link href="/myaccount/update-profile">Update Profile</Link>,
      },
    ],
  },

  {
    key: "/admin",
    label: "Admin",
    type: "group",
    children: [
      {
        key: "/admin/events",
        icon: <TrophyOutlined />,
        label: <Link href="/admin/events">Events</Link>,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGE_EVENTS],
      },
      {
        key: "/admin/teams",
        icon: <TeamOutlined />,
        label: <Link href="/admin/teams">Teams</Link>,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGE_TEAMS],
      },
      {
        key: "/admin/users",
        icon: <UserOutlined />,
        label: <Link href="/admin/users">Users</Link>,
        roles: [
          ROLES.SUPER_ADMIN,
          ROLES.ADMIN,
          ROLES.MANAGE_USERS,
          ROLES.USER_PROFILE,
        ],
      },
    ],
  },
];
