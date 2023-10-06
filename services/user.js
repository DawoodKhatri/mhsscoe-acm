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
        dispatch(login({ isLoggedIn: true }));
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
        dispatch(login({ isLoggedIn: true }));
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
};

export default UserService;
