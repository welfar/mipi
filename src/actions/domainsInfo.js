import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

import {
  startLoading,
  finishLoading,
  setError,
  UnSetError,
  setSearchFinish,
} from "./ui";

import { types } from "../Types/types";
import { SERVER_URL } from "../util/TabNav/Access/Access";

export const StartSearchDomain = (domain) => {
  const cookies = new Cookies();

  const Domain = domain.toLowerCase().replace(/ /g, "");

  return (dispatch) => {
    dispatch(setSearchFinish());
    dispatch(startLoading());
    axios
      .get(`${SERVER_URL}/api/v1/domains/${Domain}`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        dispatch({
          type: types.setInfoDomain,
          payload: {
            Contacts: res.data.body[0].Contacts,
            CreationDate: res.data.body[0].CreationDate,
            DataContact: res.data.body[0].DataContact,
            Dns: res.data.body[0].Dns,
            ExpirationDate: res.data.body[0].ExpirationDate,
            NameDomain: res.data.body[0].NameDomain,
            Status: res.data.body[0].Status,
            TransferLock: res.data.body[0].TransferLock,
            WhoisPrivacy: res.data.body[0].WhoisPrivacy,
            AuthorizationCode: res.data.body[0].AuthorizationCode,
          },
        });
        dispatch(finishLoading());
      })
      .catch((err) => {
        console.log("error", err);
        if (err.response.status === 404) {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: `El dominio ${Domain} no existe en SGI!`,
            button: "OK",
          });
          dispatch(setError(err.response.data.header.errorMessage));
          dispatch(finishLoading());
          dispatch(setSearchFinish());
        } else if (err.response.status !== 200) {
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

export const ClearInfoDomain = () => {
  return {
    type: types.clearInfoDomain,
  };
};

export const ClearDataDomain = () => {
  return (dispatch) => {
    dispatch(UnSetError());
    dispatch(ClearInfoDomain());
  };
};
