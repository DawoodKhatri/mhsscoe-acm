import { HTTP_METHODS } from "@/constants/httpMethods";
import { login } from "@/redux/reducers/authReducer";
import { dispatch } from "@/redux/store";
import httpRequest from "@/utils/httpRequest";

const UserService = {
  getVerificationMail: async (email) => {
    const res = await httpRequest(
      `/api/user/auth/registration/verification`,
      HTTP_METHODS.POST,
      {
        email,
      }
    );
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  registerUser: async (password, token) => {
    const res = await httpRequest(
      `/api/user/auth/registration`,
      HTTP_METHODS.POST,
      {
        password,
        token,
      }
    );

    if (res.success) {
      dispatch(login());
      return res.message;
    } else {
      throw res.message;
    }
  },

  loginUser: async (email, password) => {
    const res = await httpRequest(`/api/user/auth/login`, HTTP_METHODS.POST, {
      email,
      password,
    });

    if (res.success) {
      dispatch(login());
      return res.message;
    } else {
      throw res.message;
    }
  },

  getPasswordResetMail: async (email) => {
    const res = await httpRequest(
      `/api/user/auth/resetPassword/verification`,
      HTTP_METHODS.POST,
      {
        email,
      }
    );
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  resetPassword: async (password, token) => {
    const res = await httpRequest(
      `/api/user/auth/resetPassword`,
      HTTP_METHODS.POST,
      {
        password,
        token,
      }
    );

    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  getProfileDetails: async () => {
    const res = await httpRequest(`/api/user/profile`, HTTP_METHODS.GET);
    if (res.success) {
      return res.data;
    } else {
      throw res.message;
    }
  },

  updateProfileDetails: async (details) => {
    let form = new FormData();
    Object.keys(details).forEach((key) =>
      form.append(
        key,
        key === "links" ? JSON.stringify(details[key]) : details[key]
      )
    );

    const res = await httpRequest(
      `/api/user/profile`,
      HTTP_METHODS.PUT,
      form,
      true
    );
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  searchUsers: async (searchQuery) => {
    const res = await httpRequest(
      `/api/user/search?query=${searchQuery}`,
      HTTP_METHODS.GET
    );
    if (res.success) {
      return res.data;
    } else {
      throw res.message;
    }
  },

  getUserProfile: async (profileId) => {
    const res = await httpRequest(
      `/api/user/profile/${profileId}`,
      HTTP_METHODS.GET
    );
    if (res.success) {
      return res.data;
    } else {
      throw res.message;
    }
  },

  getUserDetails: async (userId) => {
    const res = await httpRequest(`/api/user/${userId}`, HTTP_METHODS.GET);
    if (res.success) {
      return res.data;
    } else {
      throw res.message;
    }
  },

  createUser: async (details) => {
    let form = new FormData();
    Object.keys(details).forEach((key) => form.append(key, details[key]));

    const res = await httpRequest(`/api/user`, HTTP_METHODS.POST, form, true);
    if (res.success) {
      return res.data;
    } else {
      throw res.message;
    }
  },

  updateUserDetails: async (userId, details) => {
    let form = new FormData();
    Object.keys(details).forEach((key) =>
      form.append(
        key,
        key === "links" ? JSON.stringify(details[key]) : details[key]
      )
    );

    const res = await httpRequest(
      `/api/user/${userId}`,
      HTTP_METHODS.PUT,
      form,
      true
    );
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  updateMembership: async (userId, membershipId) => {
    const res = await httpRequest(
      `/api/user/${userId}/membership`,
      HTTP_METHODS.PUT,
      { membershipId }
    );
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  removeMembership: async (userId) => {
    const res = await httpRequest(
      `/api/user/${userId}/membership`,
      HTTP_METHODS.DELETE
    );
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  assignRole: async (userId, role) => {
    const res = await httpRequest(
      `/api/user/${userId}/role`,
      HTTP_METHODS.PUT,
      { role }
    );
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  removeRole: async (userId) => {
    const res = await httpRequest(
      `/api/user/${userId}/role`,
      HTTP_METHODS.DELETE
    );
    if (res.success) {
      return res.message;
    } else {
      throw res.message;
    }
  },

  getUsersWithRole: async () => {
    const res = await httpRequest(`/api/users/roles`, HTTP_METHODS.GET);
    if (res.success) {
      return res.data;
    } else {
      throw res.message;
    }
  },
};

export default UserService;
