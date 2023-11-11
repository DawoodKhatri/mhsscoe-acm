import {
  login,
  logout,
  profileComplete,
  profileIncomplete,
} from "@/redux/reducers/authReducer";
import { dispatch } from "@/redux/store";

const { HTTP_METHODS } = require("@/constants/httpMethods");
const { default: httpRequest } = require("@/utils/httpRequest");

const CommonServices = {
  checkAuth: (onSuccess, onError) => {
    httpRequest(`/api/auth`, HTTP_METHODS.GET).then((res) => {
      if (res.success) {
        if (res.data.isLoggedIn) {
          dispatch(login({ isAdmin: res.data?.isAdmin }));
          CommonServices.getProfileStatus(
            (message) => {},
            (message) => {}
          );
        } else {
          dispatch(logout());
        }
      } else {
        dispatch(logout());
      }
    });
  },

  getProfileStatus: (onSuccess, onError) => {
    httpRequest(`/api/user/profile/status`, HTTP_METHODS.GET).then((res) => {
      if (res.success) {
        if (res.data.isProfileIncomplete) {
          dispatch(profileIncomplete());
          onSuccess(res.message);
        } else {
          dispatch(profileComplete());
          onSuccess(res.message);
        }
      } else {
        onError(res.message);
      }
    });
  },

  logout: (onSuccess, onError) => {
    httpRequest(`/api/auth`, HTTP_METHODS.DELETE).then((res) => {
      console.log(res);
      if (res.success) {
        onSuccess(res.message);
        dispatch(logout());
      } else {
        onError(res.message);
      }
    });
  },
};

export default CommonServices;
