import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import axios from "axios";
import Swal from "sweetalert2";

import { FaSave } from "react-icons/fa";
import { SERVER_URL } from "../../../util/TabNav/Access/Access";
import { UpdateCustomerData } from "../../../actions/customerInfo";

import Loader from "../../Principal/Loader";
import "../../../Styles/Customers/Modals/ModalEdit.css";

export const ModalEdit = ({ customerInf, changeStatus }) => {
  const dispatch = useDispatch();

  const initialState = useState({});

  const [updateData] = useState(customerInf);
  const [editData, setEditData] = useState({ newEmail: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const cookies = new Cookies();

    const newCustomerData = {
      ...editData,
      oldEmail: updateData.DataClient[0].Email,
    };

    axios
      .patch(`${SERVER_URL}/api/v1/customers/email`, newCustomerData, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          Swal.fire({
            title: "Éxito",
            icon: "success",
            text: `El cliente con el IdLogic ${updateData.DataClient[0].CustomerId} ha sido actualizado.`,
            button: "OK",
          }).then((res) => {
            if (res.value) {
              setEditData(initialState);
              changeStatus(false);
              dispatch(UpdateCustomerData(newCustomerData));
            }
          });
        }
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
    <div className="modal_edit_container">
      <p className="form_config_p">Se editarán los siguientes datos</p>

      <div className="newEmail_container">
        <strong>
          <label htmlFor="newEmail">Correo</label>
        </strong>

        <input
          className="modalNewEmail_inputConfig"
          id="newEmail"
          name="newEmail"
          onChange={(e) => handleChange(e)}
          value={editData.newEmail}
        />
      </div>

      <div className="bttn__container">
        {!loading ? (
          <button
            title="Guardar"
            className="button_save_edit"
            onClick={(e) => handleSubmit(e)}
            disabled={editData.newEmail === ""}
          >
            <FaSave />
          </button>
        ) : (
          <div className="loader_content">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};
