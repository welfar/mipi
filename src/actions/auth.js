import axios from "axios";
import Cookies from "universal-cookie";

import { types } from "../Types/types";
import { SERVER_URL } from "../util/TabNav/Access/Access";

export const startLogin = (email, password) => {
  const cookies = new Cookies();

  return (dispatch) => {
    axios
      .post(`${SERVER_URL}/api/v1/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        const rta = res.status;
        if (rta === 201) {
          const user = {
            isAuthenticated: true,
            data: res.data.data,
          };
          sessionStorage.setItem("PIUSER", JSON.stringify(user));
          cookies.set("token", res.data.access_token, {
            path: "/",
            maxAge: 7200000,
          });
          dispatch({
            type: types.loginSuccess,
            payload: res.data.data,
          });
        } else {
          dispatch({
            type: types.loginFail,
            payload: res.header.errorMessage,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: types.loginFail,
          payload: err.message,
        });
        alert(err.response.data.header.errorMessage);
      });
  };
};

export const logoutAction = () => {
  const cookies = new Cookies();
  cookies.remove("token", { path: "/" });
  sessionStorage.setItem("PIUSER", JSON.stringify({ isAuthenticated: false }));
  return {
    type: types.logout,
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutAction());
  };
};
