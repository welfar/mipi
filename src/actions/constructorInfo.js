import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";

import { types } from "../Types/types";
import { SERVER_URL } from "../util/TabNav/Access/Access";
import {
  startLoading,
  finishLoading,
  setError,
  UnSetError,
  setSearchFinish,
} from "./ui";

export const StartSearchConstructor = (domain) => {
  const cookies = new Cookies();

  const Domain = domain.toLowerCase();

  return (dispatch) => {
    dispatch(setSearchFinish());
    dispatch(startLoading());

    axios
      .get(`${SERVER_URL}/api/v1/constructor/${Domain}`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        dispatch({
          type: types.setInfoContructor,
          payload: {
            NameClient: res.data.body[0].DataInfo[0].NameClient,
            LastName: res.data.body[0].DataInfo[0].LastName,
            CompanyName: res.data.body[0].DataInfo[0].CompanyName,
            Identification: res.data.body[0].DataInfo[0].Identification,
            Email: res.data.body[0].DataInfo[0].Email,
            status: res.data.body[0].DataInfo[0].status,
            BuilderDomain: res.data.body[0].BuilderDomain,
            BuilderType: res.data.body[0].BuilderType,
            BuilderState: res.data.body[0].BuilderState,
            BuilderDateRegister: res.data.body[0].BuilderDateRegister,
            BuilderDateExpiret: res.data.body[0].BuilderDateExpiret,
            BuilderID: res.data.body[0].BuilderID,
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

export const ClearInfoConstructor = () => {
  return {
    type: types.clearInfoConstructor,
  };
};

export const clearDataConstructor = () => {
  return (dispatch) => {
    dispatch(UnSetError());
    dispatch(ClearInfoConstructor());
  };
};
