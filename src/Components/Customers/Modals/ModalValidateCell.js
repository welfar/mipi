import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import { FaSave } from "react-icons/fa";

import { SERVER_URL } from "../../../util/TabNav/Access/Access";

import "../../../Styles/Customers/Modals/ModalValidateCell.css";

export const ModalValidateCell = ({ changeStatus, customerInf }) => {
  const [validateCell] = useState(customerInf.DataClient[0].NumberPhone);
  console.log(validateCell);

  const handleSubmit = (e) => {
    e.preventDefault();

    const cookies = new Cookies();

    axios
      .post(
        `${SERVER_URL}/api/v1/customers/checkCellphone/${validateCell}`,
        {
          celNumber: validateCell,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          Swal.fire({
            title: "Éxito",
            icon: "success",
            text: `El número de celular ${validateCell} ha sido validado.`,
            button: "OK",
          });
        }
        changeStatus(false);
      })
      .catch((err) => {
        console.log("error", err);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: err.response.data.header.errorMessage,
          button: "OK",
        });
      });
  };

  return (
    <div className="modal_validateCell_container">
      <p className="form_config_p">Se validará el número de celular</p>

      <div className="cellphone_container">
        <strong>
          <label>Celular</label>
        </strong>

        <input
          className="modalCellphone_inputConfig"
          value={validateCell}
          disabled
        />
      </div>

      <div className="bttn__container">
        <button
          title="Guardar"
          className="button_save_edit"
          onClick={(e) => handleSubmit(e)}
          disabled={validateCell === ""}
        >
          <FaSave />
        </button>
      </div>
    </div>
  );
};
