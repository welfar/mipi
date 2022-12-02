import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import "moment/locale/es";
import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

import { setError } from "../../actions/ui";

import {
  FaUserAstronaut,
  FaKey,
  // FaTicketAlt,
  FaPlus,
  FaMobileAlt,
  FaEdit,
} from "react-icons/fa";
import { BsCircleFill } from "react-icons/bs";
import Modal from "../Principal/Modal/Modal";
import ModalTemporalPassword from "./Modals/ModalTemporalPassword";
import ModalAddFunds from "./Modals/ModalAddFunds";
import { types } from "../../Types/types";
import { SERVER_URL } from "../../util/TabNav/Access/Access";
import { ModalEdit } from "./Modals/ModalEdit";
import { ModalValidateCell } from "./Modals/ModalValidateCell";

import "../../Styles/Customers/CustomerData.css";

export const CustomerData = () => {
  const customerInf = useSelector((state) => state.customerInfo);
  const dispatch = useDispatch();

  const [modalTemporalPassword, setModalTemporalPassword] = useState(false);
  const [modalAddFunds, setModalAddFunds] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalValidateCell, setModalValidateCell] = useState(false);
  const [password, setPassword] = useState(new Array(8).fill("*"));

  const cookies = new Cookies();

  const authData = JSON.parse(sessionStorage.getItem("PIUSER"));

  const superuser = authData.data.roles;
  const admin = authData.data.roles;
  const comercial = authData.data.roles.split(",")[0];
  const hdr = authData.data.roles.split(",")[0];
  const dOperacional = authData.data.roles;
  const desarrollo = authData.data.roles;

  /* const btnCoupons = () => {
    alert("Cupones");
  }; */

  const handleChangeTwoFa = (e) => {
    e.preventDefault();

    axios
      .patch(
        `${SERVER_URL}/api/v1/customers/2FA`,
        {
          email: customerInf.DataClient[0].Email,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then(() => {
        dispatch({
          type: types.setInfoCustomer,
          payload: {
            ...customerInf,
            SecondfaStatus: false,
          },
        });
      });
  };

  const handleChangePaymentBalance = (e) => {
    e.preventDefault();

    axios
      .patch(
        `${SERVER_URL}/api/v1/customers/payWithBalance`,
        {
          idCliente: parseInt(customerInf.DataClient[0].CustomerId),
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then(() => {
        dispatch({
          type: types.setInfoCustomer,
          payload: {
            ...customerInf,
            PaymentwithBalanceStatus: !customerInf.PaymentwithBalanceStatus,
          },
        });
      })
      .catch((err) => {
        console.log("error", err);
        if (err.response.status !== 200) {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: err.response.data.header.errorMessage,
            button: "OK",
          });
          dispatch(setError(err.response.data.header.errorMessage));
        }
      });
  };

  const handleRefresh = () => {
    axios
      .get(
        `${SERVER_URL}/api/v1/customers/temporalPass/${customerInf.DataClient[0].CustomerId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        setPassword(res.data.body[0].TemporalPass.split(""));
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
    <>
      <div className="costumerData__container">
        <div className="costumerData__header">
          <div className="costumerData__header--left">
            <div className="costumerData__header--icon">
              <FaUserAstronaut />
            </div>
            <div>
              <p className="costumerData__header--name">
                {!customerInf.isLoaded
                  ? "*******"
                  : customerInf.DataClient[0].NameClient}
              </p>
              <p className="costumerData__header--email">
                {!customerInf.isLoaded
                  ? "*******"
                  : customerInf.DataClient[0].Email}
              </p>
            </div>
            <div className="costumerData__header--circle">
              <BsCircleFill />
            </div>
          </div>
          <p className="costumerData__header--id">
            IdLogic: #{" "}
            {!customerInf.isLoaded
              ? "*******"
              : customerInf.DataClient[0].CustomerId}
          </p>
        </div>

        <div className="costumerData__amounts_container">
          <div className="costumerData__amounts--2fa">
            <p>2do Factor:</p>
            <div className="switchBtn">
              <input
                type="checkbox"
                className="switchBtn__checkbox"
                id="twoFa"
                onChange={
                  superuser === "SUPERUSER" ||
                  admin === "ADMINISTRATIVO" ||
                  hdr === "SOPORTEHDR" ||
                  desarrollo === "DESARROLLO"
                    ? (e) => handleChangeTwoFa(e)
                    : undefined
                }
                checked={customerInf.SecondfaStatus}
                disabled={
                  !customerInf.isLoaded || customerInf.SecondfaStatus === false
                }
              />
              <label htmlFor="twoFa" className="slide"></label>
            </div>

            <p>Pago con saldo:</p>
            <div className="switchBtn">
              <input
                type="checkbox"
                className="switchBtn__checkbox"
                id="paymentBalance"
                onChange={
                  superuser === "SUPERUSER" ||
                  admin === "ADMINISTRATIVO" ||
                  comercial === "COMERCIAL" ||
                  hdr === "SOPORTEHDR"
                    ? (e) => handleChangePaymentBalance(e)
                    : undefined
                }
                checked={customerInf.PaymentwithBalanceStatus}
                disabled={!customerInf.isLoaded}
              />
              <label htmlFor="paymentBalance" className="slide"></label>
            </div>
          </div>

          <div className="costumerData__amount">
            {/* <p className="costumerData__amounts--spend"> $ 564651213 </p> */}
            <p className="costumerData__amounts--available">
              Saldo a favor{" "}
              {!customerInf.isLoaded ? "*******" : customerInf.BalanceAvailable}
            </p>
          </div>
        </div>

        <div className="costumerData__cont">
          <div className="costumerData__cont--left">
            <div className="costumerData__cont--titles">
              <p>Compañía: </p>
              <p>Celular: </p>
              <p>Ciudad: </p>
              <p>Dirección: </p>
              <p>Identificación / NIT: </p>
              <p>Fecha de Creación: </p>
              <p>Correo de Facturación:</p>
            </div>
            <div className="costumerData__cont--data">
              <p>
                {(!customerInf.isLoaded
                  ? "*******"
                  : customerInf.DataClient[0].CompanyName) === ""
                  ? "No Registrado"
                  : !customerInf.isLoaded
                  ? "*******"
                  : customerInf.DataClient[0].CompanyName}{" "}
                -{" "}
                {(!customerInf.isLoaded
                  ? "*******"
                  : customerInf.DataClient[0].Nit) === ""
                  ? "No Registrado"
                  : !customerInf.isLoaded
                  ? "*******"
                  : customerInf.DataClient[0].Nit}
              </p>

              <p>
                {(!customerInf.isLoaded
                  ? "*******"
                  : customerInf.DataClient[0].NumberPhone) === undefined
                  ? "No Registrado"
                  : !customerInf.isLoaded
                  ? "*******"
                  : customerInf.DataClient[0].NumberPhone}
              </p>

              <p>
                {(!customerInf.isLoaded
                  ? "*******"
                  : customerInf.DataClient[0].City) === ""
                  ? "No Registrado"
                  : !customerInf.isLoaded
                  ? "*******"
                  : customerInf.DataClient[0].City}
              </p>

              <p>
                {(!customerInf.isLoaded
                  ? "*******"
                  : customerInf.DataClient[0].Address) === ""
                  ? "No Registrado"
                  : !customerInf.isLoaded
                  ? "*******"
                  : customerInf.DataClient[0].Address}
              </p>

              <p>
                {(!customerInf.isLoaded
                  ? "*******"
                  : customerInf.DataClient[0].Nit) === ""
                  ? "No Registrado"
                  : !customerInf.isLoaded
                  ? "*******"
                  : customerInf.DataClient[0].Nit}
              </p>

              <p>
                {(!customerInf.isLoaded
                  ? "*******"
                  : moment(customerInf.DataClient[0].CreationDate)
                      .locale("es")
                      .format("LL")) === undefined
                  ? "No Registrado"
                  : !customerInf.isLoaded
                  ? "*******"
                  : moment(customerInf.DataClient[0].CreationDate)
                      .locale("es")
                      .format("LL")}
              </p>

              <p>
                {(!customerInf.isLoaded
                  ? "*******"
                  : customerInf.DataClient[0].BillingEmail) === ""
                  ? "No Registrado"
                  : !customerInf.isLoaded
                  ? "*******"
                  : customerInf.DataClient[0].BillingEmail}
              </p>
            </div>
          </div>

          <div className="costumerData__cont--right">
            <div className="costumerData__cont--buttons">
              <div className="bttn__container">
                <p className="textBtn textKey"> Contraseña Temporal </p>
                <button
                  onClick={() => {
                    handleRefresh();
                    setModalTemporalPassword(!modalTemporalPassword);
                  }}
                  className="button__key"
                >
                  <FaKey />
                </button>
                <Modal
                  status={modalTemporalPassword}
                  changeStatus={setModalTemporalPassword}
                  modalTitle="Contraseña Temporal"
                >
                  <ModalTemporalPassword
                    changeStatus={setModalTemporalPassword}
                    password={password}
                    setPassword={setPassword}
                  />
                </Modal>
              </div>

              {/* <div className="bttn__container">
                <p className="textBtn textCoupons">Cupones</p>
                <button onClick={btnCoupons} className="button__coupons">
                  <FaTicketAlt />
                </button>
              </div>  */}

              <div className="bttn__container">
                <p className="textBtn textValidateCell">Validar celular</p>
                <button
                  onClick={() => setModalValidateCell(!modalValidateCell)}
                  className="button__validateCell"
                >
                  <FaMobileAlt />
                </button>
                <Modal
                  status={modalValidateCell}
                  changeStatus={setModalValidateCell}
                  modalTitle="Validar Celular"
                >
                  <ModalValidateCell
                    changeStatus={setModalValidateCell}
                    customerInf={customerInf}
                  />
                </Modal>
              </div>

              <div className="bttn__container">
                {(superuser === "SUPERUSER" ||
                  admin === "ADMINISTRATIVO" ||
                  comercial === "COMERCIAL" ||
                  dOperacional === "DESARROLLO_OP") && (
                  <>
                    <p className="textBtn textAddFunds">Agregar Fondos</p>
                    <button
                      onClick={() => setModalAddFunds(!modalAddFunds)}
                      className="button_addFunds"
                    >
                      <FaPlus />
                    </button>
                    <Modal
                      status={modalAddFunds}
                      changeStatus={setModalAddFunds}
                      modalTitle="Adición de Fondos"
                    >
                      <ModalAddFunds
                        changeStatus={setModalAddFunds}
                        customerInf={customerInf}
                      />
                    </Modal>
                  </>
                )}
              </div>

              <div className="bttn__container">
                <p className="textBtn textEditCustomer">Editar</p>
                <button
                  className="button_edit"
                  onClick={() => setModalEdit(!modalEdit)}
                >
                  <FaEdit />
                </button>
                <Modal
                  status={modalEdit}
                  changeStatus={setModalEdit}
                  modalTitle="Editar Datos del Cliente"
                >
                  <ModalEdit
                    customerInf={customerInf}
                    changeStatus={setModalEdit}
                  />
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
