import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

import { startLoading, finishLoading, setError, UnSetError } from "./ui";

import { types } from "../Types/types";
import { SERVER_URL } from "../util/TabNav/Access/Access";

export const getRecords = (domain, record) => {
  const cookies = new Cookies();

  return (dispatch) => {
    dispatch(UnSetError());
    dispatch(startLoading());
    axios
      .get(`${SERVER_URL}/api/v1/records/allByDomain/${domain}/${record}`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        dispatch({
          type: types.setInfoRecords,
          payload: {
            records: res.data.body,
          },
        });
        dispatch(finishLoading());
      })
      .catch((err) => {
        dispatch(setError(err.response.data.header.errorMessage));
        dispatch(finishLoading());
      });
  };
};

export const insertRecords = (type, rrsets, domainName) => {
  const cookies = new Cookies();
  return (dispatch) => {
    dispatch(UnSetError());
    dispatch(startLoading());
    axios
      .post(
        `${SERVER_URL}/api/v1/records/insert/${domainName}/${type}`,
        rrsets,
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("res", res);
        dispatch(getRecords(domainName, type));
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
        }
      });
  };
};

export const deleteRecord = (domainName, rrsets) => {
  const cookies = new Cookies();
  return (dispatch) => {
    dispatch(startLoading());
    axios
      .post(`${SERVER_URL}/api/v1/records/delete/${domainName}`, rrsets, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        dispatch(getRecords(domainName, rrsets.type));
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
        }
      });
  };
};

export const editRecord = (domainName, rrsets) => {
  const cookies = new Cookies();
  return (dispatch) => {
    dispatch(startLoading());
    axios
      .post(`${SERVER_URL}/api/v1/records/edit/${domainName}`, rrsets, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        dispatch(getRecords(domainName, rrsets.type));
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
        }
      });
  };
};

export const clearInfoRecords = () => {
  return {
    type: types.clearInfoRecords,
  };
};
