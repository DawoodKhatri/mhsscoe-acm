export const ROLES = {
  SUPER_ADMIN: "superAdmin",
  ADMIN: "admin",
  MANAGE_EVENTS: "events",
  MANAGE_TEAMS: "teams",
  MANAGE_USERS: "users",
  USER_PROFILE: "users",
};

export const ASSIGNABLE_ROLES = [...Object.values(ROLES).slice(1)];
