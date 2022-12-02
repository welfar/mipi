import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

import { SERVER_URL } from "../../../util/TabNav/Access/Access";
import { FaPlus } from "react-icons/fa";

import "../../../Styles/UserManager/ModalCreateNewUser.css";

const CreateNewUser = ({ changeStatus }) => {
  const cookies = new Cookies();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    cel: "",
    area: "",
    isLeader: false,
  });

  const initialFormState = {
    name: "",
    email: "",
    cel: "",
    area: "",
    isLeader: false,
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoles = () => {
    if (userData.isLeader) {
      return [
        userData.area.toUpperCase(),
        userData.isLeader === true ? "LIDER" : "",
      ];
    } else {
      return [userData.area.toUpperCase()];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `${SERVER_URL}/api/v1/auth/register`,
        {
          ...userData,
          cel: parseInt(userData.cel),
          status: "ACTIVE",
          roles: handleRoles(),
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
            text: `El ususario ${userData.name} ha sido creado.`,
            button: "OK",
          }).then((res) => {
            if (res.value) {
              setUserData(initialFormState);
              window.location.reload();
            }
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
        if (err.response.status === 409) {
          Swal.fire({
            title: "Alerta",
            icon: "error",
            text: `El usuario ya existe, No puede ser creado!!`,
            button: "OK",
          });
        }
      });
  };

  return (
    <div className="container__create_user_form">
      <div className="cu_container__image">
        <img
          className="cu_container__image-img"
          src="https://placeimg.com/400/400/animals"
          alt="Imagen perfil"
        />
        <div id="div__file" className="btn__img_prof">
          <p id="text">CAMBIAR</p>
          <input type="file" id="btn__enviar" accept="image/*" />
        </div>
      </div>

      <div className="cu_container__form">
        <form
          className="cu_form"
          id="editForm"
          onSubmit={(e) => {
            handleSubmit(e);
            changeStatus(false);
          }}
        >
          <div className="cu_form__container-label-input">
            <strong>
              <label
                className="cu_form__container-label-input cu_form__container-label-input--label-config"
                htmlFor="name"
              >
                Nombre
              </label>
            </strong>
            <input
              className="cu_form__container-label-input cu_form__container-label-input--input-config"
              id="name"
              type="text"
              name="name"
              placeholder="Escribe tu nombre"
              onChange={(e) => handleChange(e)}
              value={userData.name}
              required
            />
          </div>

          <div className="cu_form__container-label-input">
            <strong>
              <label
                className="cu_form__container-label-input cu_form__container-label-input--label-config"
                htmlFor="email"
              >
                Correo
              </label>
            </strong>
            <input
              className="cu_form__container-label-input cu_form__container-label-input--input-config"
              id="email"
              type="email"
              name="email"
              placeholder="correo@email.com"
              onChange={(e) => handleChange(e)}
              value={userData.email}
              required
            />
          </div>

          <div className="cu_form__container-label-input">
            <strong>
              <label
                className="cu_form__container-label-input cu_form__container-label-input--label-config"
                htmlFor="cel"
              >
                Celular
              </label>
            </strong>
            <input
              className="cu_form__container-label-input cu_form__container-label-input--input-config"
              id="cel"
              type="text"
              name="cel"
              placeholder="Escribe tu celular"
              onChange={(e) => handleChange(e)}
              value={userData.cel}
              required
            />
          </div>

          <div className="cu_form__container-label-input">
            <strong>
              <label
                className="cu_form__container-label-input cu_form__container-label-input--label-config"
                htmlFor="area"
              >
                Área
              </label>
            </strong>
            <select
              className="cu_form__container-label-input cu_form__container-label-input--input-config"
              id="area"
              type="text"
              name="area"
              onChange={(e) => handleChange(e)}
              value={userData.area}
              required
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

          {userData.area !== "Superuser" ? (
            <div className="cu_form__container-label-check">
              <strong>
                <label
                  htmlFor="isLeader"
                  className="cu_form__container-label-input cu_form__container-label-input--label-config"
                >
                  Líder
                </label>
              </strong>
              <input
                className="cu"
                type="checkbox"
                name="isLeader"
                id="isLeader"
                onChange={() => {
                  userData.isLeader
                    ? setUserData({ ...userData, isLeader: false })
                    : setUserData({ ...userData, isLeader: true });
                }}
                checked={userData.isLeader}
              />
            </div>
          ) : null}

          <div className="cu_form__container-buttons">
            <div className="modalnewuser_button__container">
              <FaPlus />
              <input
                className="form__container-inputs--save"
                type="submit"
                id="new"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewUser;
