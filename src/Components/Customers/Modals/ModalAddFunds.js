import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

import { UpdateFunds } from "../../../actions/customerInfo";
import { SERVER_URL } from "../../../util/TabNav/Access/Access";

import "../../../Styles/Customers/Modals/ModalAddFunds.css";

const ModalAddFunds = ({ changeStatus, customerInf }) => {
  const dispatch = useDispatch();

  const cookies = new Cookies();

  const initialState = useState({});

  const [fundsData, setFundsData] = useState({
    addBalance: "",
    reference: "",
    description: "",
  });

  const handleChange = (e) => {
    setFundsData({
      ...fundsData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFunds = {
      idLogic: parseInt(customerInf.DataClient[0].CustomerId),
      amount: parseInt(fundsData.addBalance),
      trasactionid: parseInt(fundsData.reference),
      description: fundsData.description,
    };

    axios
      .post(`${SERVER_URL}/api/v1/customers/AddFunds`, newFunds, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          Swal.fire({
            title: "Éxito",
            icon: "success",
            text: `Fondos añadidos exitosamente.`,
            button: "OK",
          }).then((res) => {
            if (res.value) {
              setFundsData(initialState);
              changeStatus(false);
              dispatch(UpdateFunds(newFunds));
            }
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
        if (err.response.status === 500) {
          Swal.fire({
            title: "Error",
            html: "<strong>Ha ocurrido un error con el proceso que intentas realizar.</strong> <br> <small> Tip: Intenta cambiando el número de  referencia que ingresaste.</small>",
            icon: "error",
            button: "OK",
          });
        }
        if (err.response.status !== 500) {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: err.response.data.header.errorMessage,
            button: "OK",
          });
        }
      });
  };

  return (
    <div className="modalAddFunds_container">
      <p className="modalAddFunds_p">
        Se agregará saldo al cliente{" "}
        <span style={{ fontWeight: "bolder" }}>
          {customerInf.DataClient[0].NameClient}
        </span>
      </p>

      <div className="addBalance_container">
        <strong>
          <label className="addBalance_title_config" htmlFor="addBalance">
            Saldo a Agregar:
          </label>
        </strong>
        <input
          className="modalAddFunds_inputConfig"
          name="addBalance"
          id="addBalance"
          type="text"
          placeholder="Inserte saldo a agregar"
          value={fundsData.addBalance}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="reference_container">
        <strong>
          <label className="reference_title_config" htmlFor="reference">
            Referencia Occi ó MP:
          </label>
        </strong>
        <input
          className="modalAddFunds_inputConfig"
          name="reference"
          id="reference"
          type="text"
          placeholder="Inserte la referencia"
          value={fundsData.reference}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="description_container">
        <strong>
          <label className="description_title_config" htmlFor="description">
            Descripción:
          </label>
        </strong>
        <input
          className="modalAddFunds_inputConfig"
          name="description"
          id="description"
          type="text"
          placeholder="Ingrese una descripción"
          value={fundsData.description}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="modalAddFunds_btn_container">
        <button
          className="btn_confirm"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default ModalAddFunds;
