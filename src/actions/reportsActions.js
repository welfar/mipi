import Cookies from "universal-cookie";
import axios from "axios";
import Swal from "sweetalert2";

import {
  finishLoading,
  setError,
  setSearchFinish,
  startLoading,
  UnSetError,
} from "./ui";
import { SERVER_URL } from "../util/TabNav/Access/Access";
import { types } from "../Types/types";

export const StartSearchByActMailRegDate = (dateSearch) => {
  const cookies = new Cookies();

  return (dispatch) => {
    dispatch(setSearchFinish());
    dispatch(startLoading());

    axios
      .post(
        `${SERVER_URL}/api/v1/reports/activeMailByRegisterDate`,
        {
          dateFrom: dateSearch.datefrom,
          dateTo: dateSearch.dateto,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          dispatch({
            type: types.setInfoReports,
            payload: {
              Reports: res.data.body,
            },
          });
        }
        dispatch(finishLoading());
      })
      .catch((err) => {
        console.log("error", err);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: err.response.data.header.errorMessage,
          button: "OK",
        });
        dispatch(setError(err.response.data.header.errorMessage));
        dispatch(finishLoading());
        dispatch(setSearchFinish());
      });
  };
};

export const StartSearchByActMailDueDate = (dateSearch) => {
  const cookies = new Cookies();

  return (dispatch) => {
    dispatch(setSearchFinish());
    dispatch(startLoading());

    axios
      .post(
        `${SERVER_URL}/api/v1/reports/activeMailByDueDate`,
        {
          dateFrom: dateSearch.datefrom,
          dateTo: dateSearch.dateto,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          dispatch({
            type: types.setInfoReports,
            payload: {
              Reports: res.data.body,
            },
          });
        }
        dispatch(finishLoading());
      })
      .catch((err) => {
        console.log("error", err);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: err.response.data.header.errorMessage,
          button: "OK",
        });
        dispatch(setError(err.response.data.header.errorMessage));
        dispatch(finishLoading());
        dispatch(setSearchFinish());
      });
  };
};

export const StartSearchByActHostingRegDate = (dateSearch) => {
  const cookies = new Cookies();

  return (dispatch) => {
    dispatch(setSearchFinish());
    dispatch(startLoading());

    axios
      .post(
        `${SERVER_URL}/api/v1/reports/activeHostingByRegisterDate`,
        {
          dateFrom: dateSearch.datefrom,
          dateTo: dateSearch.dateto,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          dispatch({
            type: types.setInfoReports,
            payload: {
              Reports: res.data.body,
            },
          });
        }
        dispatch(finishLoading());
      })
      .catch((err) => {
        console.log("error", err);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: err.response.data.header.errorMessage,
          button: "OK",
        });
        dispatch(setError(err.response.data.header.errorMessage));
        dispatch(finishLoading());
        dispatch(setSearchFinish());
      });
  };
};

export const StartSearchByActHostingDueDate = (dateSearch) => {
  const cookies = new Cookies();

  return (dispatch) => {
    dispatch(setSearchFinish());
    dispatch(startLoading());

    axios
      .post(
        `${SERVER_URL}/api/v1/reports/activeHostingByDueDate`,
        {
          dateFrom: dateSearch.datefrom,
          dateTo: dateSearch.dateto,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          dispatch({
            type: types.setInfoReports,
            payload: {
              Reports: res.data.body,
            },
          });
        }
        dispatch(finishLoading());
      })
      .catch((err) => {
        console.log("error", err);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: err.response.data.header.errorMessage,
          button: "OK",
        });
        dispatch(setError(err.response.data.header.errorMessage));
        dispatch(finishLoading());
        dispatch(setSearchFinish());
      });
  };
};

export const ClearReports = () => {
  return {
    type: types.clearInfoReports,
  };
};

export const ClearDataReports = () => {
  return (dispatch) => {
    dispatch(UnSetError());
    dispatch(ClearReports());
  };
};
