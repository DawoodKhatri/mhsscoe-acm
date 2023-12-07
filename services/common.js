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
  checkAuth: async () => {
    const res = await httpRequest(`/api/auth`, HTTP_METHODS.GET);
    if (res.success) {
      if (res.data.isLoggedIn) {
        dispatch(login(res.data));
        CommonServices.getProfileStatus();
      } else {
        dispatch(logout());
      }
    } else {
      dispatch(logout());
    }
  },

  getProfileStatus: async () => {
    const res = await httpRequest(`/api/user/profile/status`, HTTP_METHODS.GET);
    if (res.success) {
      if (res.data.isProfileIncomplete) {
        dispatch(profileIncomplete());
        return res.message;
      } else {
        dispatch(profileComplete());
        return res.message;
      }
    } else {
      throw res.message;
    }
  },

  logout: async () => {
    const res = await httpRequest(`/api/auth`, HTTP_METHODS.DELETE);
    if (res.success) {
      dispatch(logout());
      return res.message;
    } else {
      throw res.message;
    }
  },
};

export default CommonServices;
