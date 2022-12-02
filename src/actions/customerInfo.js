import Cookies from "universal-cookie";
import axios from "axios";
import Swal from "sweetalert2";

import { types } from "../Types/types";
import {
  startLoading,
  finishLoading,
  setError,
  UnSetError,
  setSearchFinish,
} from "./ui";
import { SERVER_URL } from "../util/TabNav/Access/Access";

export const UpdateFunds = (newData) => {
  return {
    type: types.updateFunds,
    payload: newData,
  };
};

export const UpdateCustomerData = (newData) => {
  return {
    type: types.updateCustomerData,
    payload: newData,
  };
};

export const StartSearchIdLogicCustomer = (IdLogic, id) => {
  const cookies = new Cookies();

  return (dispatch) => {
    dispatch(setSearchFinish());
    dispatch(startLoading());
    axios
      .get(`${SERVER_URL}/api/v1/customers/dataClientebyId/${IdLogic || id}`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        dispatch({
          type: types.setInfoCustomer,
          payload: {
            DataClient: res.data.body[0].DataClient,
            SecondfaStatus: res.data.body[0].SecondfaStatus,
            PaymentwithBalanceStatus: res.data.body[0].PaymentwithBalanceStatus,
            BalanceAvailable: res.data.body[0].BalanceAvailable,
          },
        });
        dispatch(finishLoading());
      })
      .catch((err) => {
        console.log("error", err);
        if (err.response.status !== 200) {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: err.response.data.header.errorMessage,
            button: "OK",
          });
          dispatch(setError(err.response.data.header.errorMessage));
          dispatch(finishLoading());
          dispatch(setSearchFinish());
        }
      });
  };
};

export const StartSearchEmailCustomer = (customId) => {
  const cookies = new Cookies();

  const email = customId;

  return (dispatch) => {
    dispatch(setSearchFinish());
    dispatch(startLoading());
    axios
      .get(`${SERVER_URL}/api/v1/customers/dataClientebyEmail/${email}`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        dispatch({
          type: types.setInfoCustomer,
          payload: {
            DataClient: res.data.body[0].DataClient,
            SecondfaStatus: res.data.body[0].SecondfaStatus,
            PaymentwithBalanceStatus: res.data.body[0].PaymentwithBalanceStatus,
            BalanceAvailable: res.data.body[0].BalanceAvailable,
          },
        });
        dispatch(finishLoading());
      })
      .catch((err) => {
        console.log("error".err);
        if (err.response.status !== 200) {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: err.response.data.header.errorMessage,
            button: "OK",
          });
          dispatch(setError(err.response.data.header.errorMessage));
          dispatch(finishLoading());
          dispatch(setSearchFinish());
        }
      });
  };
};

export const ClearInfoCustomer = () => {
  return {
    type: types.clearInfoCustomer,
  };
};

export const ClearDataCustomer = () => {
  return (dispatch) => {
    dispatch(UnSetError());
    dispatch(ClearInfoCustomer());
  };
};
