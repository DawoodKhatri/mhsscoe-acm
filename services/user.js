import { HTTP_METHODS } from "@/constants/httpMethods";
import { login } from "@/redux/reducers/authReducer";
import { dispatch } from "@/redux/store";
import httpRequest from "@/utils/httpRequest";

const UserService = {
  getVerificationMail: ({ email }, onSuccess, onError) => {
    httpRequest(`/api/user/auth/verification`, HTTP_METHODS.POST, {
      email,
    }).then((res) => {
      if (res.success) {
        onSuccess(res.message);
      } else {
        onError(res.message);
      }
    });
  },

  registerUser: ({ password, token }, onSuccess, onError) => {
    httpRequest(`/api/user/auth/registration`, HTTP_METHODS.POST, {
      password,
      token,
    }).then((res) => {
      if (res.success) {
        dispatch(login());
        onSuccess(res.message);
      } else {
        onError(res.message);
      }
    });
  },

  loginUser: ({ email, password }, onSuccess, onError) => {
    httpRequest(`/api/user/auth/login`, HTTP_METHODS.POST, {
      email,
      password,
    }).then((res) => {
      if (res.success) {
        dispatch(login());
        onSuccess(res.message);
      } else {
        onError(res.message);
      }
    });
  },

  getProfileDetails: (onSuccess, onError) => {
    httpRequest(`/api/user/profile`, HTTP_METHODS.GET).then((res) => {
      if (res.success) {
        onSuccess(res.data);
      } else {
        onError(res.message);
      }
    });
  },

  updateProfileDetails: (details, onSuccess, onError) => {
    let form = new FormData();
    Object.keys(details).forEach((key) =>
      form.append(
        key,
        key === "links" ? JSON.stringify(details[key]) : details[key]
      )
    );

    httpRequest(`/api/user/profile`, HTTP_METHODS.PUT, form, true).then(
      (res) => {
        if (res.success) {
          onSuccess(res.message);
        } else {
          onError(res.message);
        }
      }
    );
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

  assignMembership: async (userId) => {
    const res = await httpRequest(
      `/api/user/${userId}/membership`,
      HTTP_METHODS.PUT
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
