import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import Swal from "sweetalert2";

import { SERVER_URL } from "../../../util/TabNav/Access/Access";

import { FaSave } from "react-icons/fa";
import "../../../Styles/Dashboard/Modals/ModalGoals.css";

const ModalGoals = ({ goals, changeStatus }) => {
  const [editGoals, setEditGoals] = useState(goals);

  const authData = JSON.parse(sessionStorage.getItem("PIUSER"));

  const superuser = authData.data.roles;
  const admin = authData.data.roles;

  const handleChange = (e) => {
    setEditGoals({
      ...editGoals,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const onSetGoals = (e) => {
    e.preventDefault();

    const cookies = new Cookies();

    axios
      .post(
        `${SERVER_URL}/api/v1/dashboard/goalsbyMonth`,
        {
          ...editGoals,
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
            text: `Las metas han sido actualizadas.`,
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
          title: "Error",
          icon: "error",
          text: err.response.data.header.errorMessage,
          button: "OK",
        });
      });
  };

  return (
    <div className="modalGoal_cont">
      <div className="modalGoal_cont_table">
        <div className="modalGoals_cont--service">
          <p className="modalGoals_title">Servicio</p>
          <p className="typeService pEmail">Correo</p>
          <div className="hr">
            <hr style={{ width: "100%", background: "#b0b0b0" }} />
          </div>
          <p className="typeService">Dominio</p>
          <div className="hr">
            <hr style={{ width: "100%", background: "#b0b0b0" }} />
          </div>
          <p className="typeService pHosting">Hosting</p>
        </div>

        <div className="modalGoals__line"></div>

        <div className="modalGoals_cont--record">
          <p style={{ marginBottom: "0" }}>Registro</p>
          <div className="typeGoals">
            <div className="typeGoals_cont_down">
              <p className="typeGoals_title">Baja</p>
              <div className="typeGoals_content">
                <input
                  type="text"
                  className="modalGoals_input"
                  pattern="[0-9]{4}"
                  max="4"
                  onChange={(e) => handleChange(e)}
                  name="emailRegisterLow"
                  value={editGoals.emailRegisterLow}
                  disabled={
                    superuser !== "SUPERUSER" && admin !== "ADMINISTRATIVO"
                  }
                />
                <input
                  type="text"
                  className="modalGoals_input"
                  pattern="[0-9]{4}"
                  max="4"
                  onChange={(e) => handleChange(e)}
                  name="domainRegisterLow"
                  value={editGoals.domainRegisterLow}
                  disabled={
                    superuser !== "SUPERUSER" && admin !== "ADMINISTRATIVO"
                  }
                />
                <input
                  type="text"
                  className="modalGoals_input"
                  pattern="[0-9]{4}"
                  max="4"
                  onChange={(e) => handleChange(e)}
                  name="hostingRegisterLow"
                  value={editGoals.hostingRegisterLow}
                  disabled={
                    superuser !== "SUPERUSER" && admin !== "ADMINISTRATIVO"
                  }
                />
              </div>
            </div>

            <div className="modalGoals__line"></div>

            <div className="typeGoals_cont_up">
              <p className="typeGoals_title">Alta</p>
              <div className="typeGoals_content">
                <input
                  type="text"
                  className="modalGoals_input"
                  pattern="[0-9]{4}"
                  max="4"
                  onChange={(e) => handleChange(e)}
                  name="emailRegisterHigh"
                  value={editGoals.emailRegisterHigh}
                  disabled={
                    superuser !== "SUPERUSER" && admin !== "ADMINISTRATIVO"
                  }
                />
                <input
                  type="text"
                  className="modalGoals_input"
                  pattern="[0-9]{4}"
                  max="4"
                  onChange={(e) => handleChange(e)}
                  name="domainRegisterHigh"
                  value={editGoals.domainRegisterHigh}
                  disabled={
                    superuser !== "SUPERUSER" && admin !== "ADMINISTRATIVO"
                  }
                />
                <input
                  type="text"
                  className="modalGoals_input"
                  pattern="[0-9]{4}"
                  max="4"
                  onChange={(e) => handleChange(e)}
                  name="hostingRegisterHigh"
                  value={editGoals.hostingRegisterHigh}
                  disabled={
                    superuser !== "SUPERUSER" && admin !== "ADMINISTRATIVO"
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="modalGoals__line"></div>

        <div className="modalGoals_cont--renew">
          <p style={{ marginBottom: "0" }}>Renovación</p>
          <div className="typeGoals">
            <div className="typeGoals_cont_down">
              <p className="typeGoals_title">Baja</p>
              <div className="typeGoals_content">
                <input
                  type="text"
                  className="modalGoals_input"
                  pattern="[0-9]{4}"
                  max="4"
                  onChange={(e) => handleChange(e)}
                  name="emailRenewLow"
                  value={editGoals.emailRenewLow}
                  disabled={
                    superuser !== "SUPERUSER" && admin !== "ADMINISTRATIVO"
                  }
                />
                <input
                  type="text"
                  className="modalGoals_input"
                  pattern="[0-9]{4}"
                  max="4"
                  onChange={(e) => handleChange(e)}
                  name="domainRenewLow"
                  value={editGoals.domainRenewLow}
                  disabled={
                    superuser !== "SUPERUSER" && admin !== "ADMINISTRATIVO"
                  }
                />
                <input
                  type="text"
                  className="modalGoals_input"
                  pattern="[0-9]{4}"
                  max="4"
                  onChange={(e) => handleChange(e)}
                  name="hostingRenewLow"
                  value={editGoals.hostingRenewLow}
                  disabled={
                    superuser !== "SUPERUSER" && admin !== "ADMINISTRATIVO"
                  }
                />
              </div>
            </div>

            <div className="modalGoals__line"></div>

            <div className="typeGoals_cont_up">
              <p className="typeGoals_title">Alta</p>
              <div className="typeGoals_content">
                <input
                  type="text"
                  className="modalGoals_input"
                  pattern="[0-9]{4}"
                  max="4"
                  onChange={(e) => handleChange(e)}
                  name="emailRenewHigh"
                  value={editGoals.emailRenewHigh}
                  disabled={
                    superuser !== "SUPERUSER" && admin !== "ADMINISTRATIVO"
                  }
                />
                <input
                  type="text"
                  className="modalGoals_input"
                  pattern="[0-9]{4}"
                  max="4"
                  onChange={(e) => handleChange(e)}
                  name="domainRenewHigh"
                  value={editGoals.domainRenewHigh}
                  disabled={
                    superuser !== "SUPERUSER" && admin !== "ADMINISTRATIVO"
                  }
                />
                <input
                  type="text"
                  className="modalGoals_input"
                  pattern="[0-9]{4}"
                  max="4"
                  onChange={(e) => handleChange(e)}
                  name="hostingRenewHigh"
                  value={editGoals.hostingRenewHigh}
                  disabled={
                    superuser !== "SUPERUSER" && admin !== "ADMINISTRATIVO"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {superuser === "SUPERUSER" || admin === "ADMINISTRATIVO" ? (
        <div className="modalGoals_cont--button">
          <div className="butn__container">
            <p className="txtBtn textSave">Guardar</p>
            <button onClick={(e) => onSetGoals(e)} className="button__save">
              <FaSave />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ModalGoals;
