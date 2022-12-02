import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

import { SERVER_URL } from "../../../util/TabNav/Access/Access";
import { FaEdit } from "react-icons/fa";

import "../../../Styles/UserManager/ModalUserManager/ModalFormEditData.css";

const ModalFormEditData = ({ user, changeStatus }) => {
  const [userConfig, setUserConfig] = useState(user);
  const [editUserInfo, setEditUserInfo] = useState({});

  const cookies = new Cookies();

  const handleChange = (e) => {
    setEditUserInfo({
      ...editUserInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeCel = (e) => {
    setEditUserInfo({
      ...editUserInfo,
      newPhone: JSON.parse(e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(
        `${SERVER_URL}/api/v1/auth/update`,
        {
          email: userConfig.email,
          ...editUserInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: "Éxito",
            icon: "success",
            text: `El usuario ${userConfig.name} ha sido actualizado.`,
            button: "OK",
          }).then((res) => {
            if (res.value) {
              changeStatus(false);
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
    <div className="container__dataeditform">
      <div className="container__image">
        <img
          className="container__image-img"
          src="https://placeimg.com/400/400/animals"
          alt="Imagen perfil"
        />
        <div id="div__file">
          <p id="text">CAMBIAR</p>
          <input type="file" id="btn__enviar" accept="image/*" />
        </div>
      </div>

      <div className="container__form">
        <form
          className="form"
          id="editForm"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="form__container-label-input">
            <strong>
              <label
                className="form__container-label-input form__container-label-input--label-config"
                htmlFor="name"
              >
                Nombre
              </label>
            </strong>
            <input
              className="form__container-label-input form__container-label-input--input-config"
              id="name"
              type="text"
              name="newName"
              placeholder="Escribe tu nombre"
              onChange={(e) => handleChange(e)}
              value={editUserInfo.newName}
            />
          </div>

          <div className="form__container-label-input">
            <strong>
              <label
                className="form__container-label-input form__container-label-input--label-config"
                htmlFor="email"
              >
                Correo
              </label>
            </strong>
            <input
              className="form__container-label-input form__container-label-input--input-config"
              id="email"
              type="email"
              name="newEmail"
              placeholder="correo@email.com"
              onChange={(e) => handleChange(e)}
              value={editUserInfo.newEmail}
            />
          </div>

          <div className="form__container-label-input">
            <strong>
              <label
                className="form__container-label-input form__container-label-input--label-config"
                htmlFor="newPhone"
              >
                Celular
              </label>
            </strong>
            <input
              className="form__container-label-input form__container-label-input--input-config"
              id="newPhone"
              type="text"
              name="newPhone"
              placeholder="Escribe tu celular"
              onChange={(e) => handleChangeCel(e)}
              value={editUserInfo.newPhone}
            />
          </div>

          <div className="form__container-label-input">
            <strong>
              <label
                className="form__container-label-input form__container-label-input--label-config"
                htmlFor="area"
              >
                Área
              </label>
            </strong>
            <select
              className="form__container-label-input form__container-label-input--input-config"
              id="area"
              name="newArea"
              onChange={(e) => handleChange(e)}
              value={editUserInfo.newArea}
            >
              <option value="">Selecciona un Rol</option>
              <option value="Superuser">Super User</option>
              <option value="Comercial">Comercial</option>
              <option value="Administrativo">Administrativo</option>
              <option value="Desarrollo">Desarrollo</option>
              <option value="Desarrollo_op">Desarrollo Operacional</option>
              <option value="Maia">MAIA</option>
              <option value="Marketing">Marketing</option>
              <option value="Soportehdr">HDR</option>
              <option value="Multimedia">Multimedia</option>
            </select>
          </div>

          <div className="form__container-label-input">
            <strong>
              <label
                htmlFor="status"
                className="form__container-label-input form__container-label-input--label-config"
              >
                Estado
              </label>
            </strong>
            <select
              className="form__container-label-input last form__container-label-input--input-config"
              id="status"
              name="newStatus"
              onChange={(e) => handleChange(e)}
              value={editUserInfo.newStatus}
            >
              <option value="">Selecciona un Estado</option>
              <option value="ACTIVE">Activo</option>
              <option value="INACTIVE">Inactivo</option>
            </select>
          </div>

          <div className="modaleditdata_button__container">
            <FaEdit />
            <input
              className="form__container-inputs--save"
              type="submit"
              id="save"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalFormEditData;
