import { login, logout } from "@/redux/reducers/authReducer";
import { dispatch } from "@/redux/store";

const { HTTP_METHODS } = require("@/constants/httpMethods");
const { default: httpRequest } = require("@/utils/httpRequest");

const CommonServices = {
  checkAuth: (onSuccess, onError) => {
    httpRequest(`/api/auth`, HTTP_METHODS.POST).then((res) => {
      if (res.success) {
        if (res.data.isLoggedIn) {
          dispatch(login());
        } else {
          dispatch(logout());
        }
      } else {
        dispatch(logout());
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
