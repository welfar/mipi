import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

import { SERVER_URL } from "../../../util/TabNav/Access/Access";
import { GoAlert } from "react-icons/go";

import "../../../Styles/UserManager/ModalUserManager/ModalDeleteUser.css";

const ModalDeleteUser = ({ user, changeStatus }) => {
  const cookies = new Cookies();

  const handleDelete = (user) => {
    axios
      .delete(`${SERVER_URL}/api/v1/auth/delete`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
        data: {
          email: user.email,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: "Eliminado!",
            icon: "success",
            text: "El usuario ha sido eliminado exitosamente.",
            button: "OK",
          }).then((res) => {
            if (res.value) {
              window.location.reload();
            }
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
        Swal.fire({
          title: "Alerta",
          icon: "error",
          text: `Algo salio mal`,
          button: "OK",
        });
      });
  };

  return (
    <div className="container__userpermits">
      <div className="container_modalDelete">
        <GoAlert size={100} className="icon_deletemod" />
        <p>
          Se va a eliminar el ususario {user.name} , está segur@ de realizar
          esta acción?
        </p>
      </div>
      <div className="container__button">
        <input
          className="container__button container__button--cancel"
          type="button"
          value="Cancelar"
          onClick={(e) => {
            e.preventDefault();
            changeStatus(false);
          }}
        />
        <input
          className="container__button container__button--save"
          type="submit"
          value="Confirmar"
          onClick={(e) => {
            e.preventDefault();
            handleDelete(user);
            changeStatus(false);
          }}
        />
      </div>
    </div>
  );
};

export default ModalDeleteUser;
