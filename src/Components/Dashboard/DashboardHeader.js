import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import Swal from "sweetalert2";

import { FaEye } from "react-icons/fa";
import Modal from "../Principal/Modal/Modal";
import ModalGoals from "./Modals/ModalGoals";
import { SERVER_URL } from "../../util/TabNav/Access/Access";

import "../../Styles/Dashboard/DashboardHeader.css";

export const DashboardHeader = () => {
  const [modalGoals, setModalGoals] = useState(false);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const cookies = new Cookies();

    axios
      .get(`${SERVER_URL}/api/v1/dashboard/goalsbyMonth`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        setGoals(res.data.body[0]);
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
  }, [setGoals]);

  return (
    <>
      <div className="dashboard__container--head">
        <img
          src="https://mi.com.co/img/mrweb.png"
          className="img-fluid img__mrWeb"
          alt=""
        />

        <div className="container__goals">
          <div className="goals__left">
            <p className="goals__left--title">Vamos Camino a: </p>
            <p className="goals__left--content"> 40K Cuentas Activas</p>
            <p className="goals__left--content"> 75k Dominios</p>
          </div>

          <div className="goals__line"></div>

          <div className="goals__right">
            <div>
              <p className="goals__right--subtitle">Activas:</p>
              <p className="goals__right--subtitle"> Contratadas: </p>
              <p className="goals__right--subtitle"> Dominios: </p>
            </div>

            <div>
              <p className="goals__right--subtitle"> 34.200 </p>
              <p className="goals__right--subtitle"> 45.200 </p>
              <p className="goals__right--subtitle"> 55.000</p>
            </div>

            <div className="modaleditgoals_bttn__container">
              <button
                className="modaleditgoals_button"
                onClick={() => setModalGoals(!modalGoals)}
              >
                <FaEye />
              </button>
              <Modal
                status={modalGoals}
                changeStatus={setModalGoals}
                modalTitle="Editar Metas"
              >
                <ModalGoals goals={goals} changeStatus={setModalGoals} />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
