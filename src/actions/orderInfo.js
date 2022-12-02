import Cookies from "universal-cookie";
import axios from "axios";
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

export const updateOrderData = (newData) => {
  return {
    type: types.updateOrder,
    payload: newData,
  };
};

export const StartSearchOrderByDomain = (Domain) => {
  const cookies = new Cookies();

  return (dispatch) => {
    dispatch(setSearchFinish());
    dispatch(startLoading());
    axios
      .get(`${SERVER_URL}/api/v1/orders/GetOrdersByDomain/${Domain}`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        dispatch({
          type: types.setInfoOrder,
          payload: {
            OrderInfo: res.data.body,
          },
        });
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

export const StartSearchOrderByIdClient = (idLogic) => {
  const cookies = new Cookies();

  return (dispatch) => {
    dispatch(setSearchFinish());
    dispatch(startLoading());
    axios
      .get(`${SERVER_URL}/api/v1/orders/GetOrdersByIdLogic/${idLogic}`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        dispatch({
          type: types.setInfoOrder,
          payload: {
            OrderInfo: res.data.body,
          },
        });
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

export const StartSearchOrderByIdPurchase = (idCompra) => {
  const cookies = new Cookies();

  return (dispatch) => {
    dispatch(setSearchFinish());
    dispatch(startLoading());
    axios
      .get(`${SERVER_URL}/api/v1/orders/GetOrdersByIdCompra/${idCompra}`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        dispatch({
          type: types.setInfoOrder,
          payload: {
            OrderInfo: res.data.body,
          },
        });
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

export const StartSearchOrderByIdService = (idService) => {
  const cookies = new Cookies();

  return (dispatch) => {
    dispatch(setSearchFinish());
    dispatch(startLoading());
    axios
      .get(`${SERVER_URL}/api/v1/orders/GetOrdersByIdService/${idService}`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        dispatch({
          type: types.setInfoOrder,
          payload: {
            OrderInfo: res.data.body,
          },
        });
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

export const StartSearchOrderByRefMp = (refMp) => {
  const cookies = new Cookies();

  return (dispatch) => {
    dispatch(setSearchFinish());
    dispatch(startLoading());
    axios
      .get(`${SERVER_URL}/api/v1/orders/GetOrdersByRefMp/${refMp}`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        dispatch({
          type: types.setInfoOrder,
          payload: {
            OrderInfo: res.data.body,
          },
        });
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

export const StartSearchOrdersByDate = (dateSearch) => {
  const cookies = new Cookies();

  return (dispatch) => {
    dispatch(setSearchFinish());
    dispatch(startLoading());

    axios
      .post(
        `${SERVER_URL}/api/v1/orders/GetOrdersByDate`,
        {
          datefrom: dateSearch.datefrom,
          dateto: dateSearch.dateto,
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
            type: types.setInfoOrder,
            payload: {
              OrderInfo: res.data.body,
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

export const ClearInfoOrder = () => {
  return {
    type: types.clearInfoOrder,
  };
};

export const ClearDataOrder = () => {
  return (dispatch) => {
    dispatch(UnSetError());
    dispatch(ClearInfoOrder());
  };
};
