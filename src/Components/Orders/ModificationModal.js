import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

import { updateOrderData } from "../../actions/orderInfo";
import { SERVER_URL } from "../../util/TabNav/Access/Access";

import "../../Styles/Colors.css";
import "../../Styles/Orders/ModificationModal.css";

export const ModificationModal = ({ item, changeStatus }) => {
  const dispatch = useDispatch();
  const [editOrder, setEditOrder] = useState(item);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cookies = new Cookies();

    const newOrder = {
      id: item.id,
      ...editOrder,
      cantidad: parseInt(editOrder.cantidad),
      extra1: parseInt(editOrder.extra1),
      valor: parseInt(editOrder.valor),
    };

    axios
      .patch(`${SERVER_URL}/api/v1/orders/UpdateOrder`, newOrder, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: "Éxito",
            icon: "success",
            text: `El servicio ${item.id} ha sido actualizado.`,
            button: "OK",
          }).then((res) => {
            if (res.value) {
              changeStatus(false);
              dispatch(updateOrderData(newOrder));
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

  const handleChange = (e) => {
    e.preventDefault();
    setEditOrder({
      ...editOrder,
      [e.target.name]: e.target.value,
    });
  };

  const authData = JSON.parse(sessionStorage.getItem("PIUSER"));

  const superuser = authData.data.roles.split(",");
  const desarrollo = authData.data.roles.split(",");

  return (
    <>
      <p className="form_config_p">
        Se cambiaran los datos del servicio <b>{item.id} </b>
      </p>

      <form
        className="form_modification_modal"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="form_container_label_input">
          <strong>
            <label className="form_config_label" htmlFor="dominio">
              Dominio:
            </label>
          </strong>
          <input
            className="form_config_input"
            id="dominio"
            name="dominio"
            value={editOrder.dominio}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="form_container_label_input">
          <strong>
            <label className="form_config_label">Tipo Servicio:</label>
          </strong>
          <select
            className="form_config_input"
            name="tiposervicio"
            value={editOrder.tiposervicio}
            onChange={(e) => handleChange(e)}
          >
            <option value="">Tipo</option>
            <option value="capacidad">Capacidad</option>
            <option value="cuenta">Cuenta</option>
            <option value="correo">Correo</option>
            <option value="dominio">Dominio</option>
            <option value="hosting">Hosting</option>
            <option value="soporte">Soporte</option>
            <option value="weebly">Weebly</option>
            <option value="miconstructor">Mi Constructor</option>
          </select>
        </div>

        <div className="form_container_label_input">
          <strong>
            <label className="form_config_label">Operación:</label>
          </strong>
          <select
            className="form_config_input"
            name="operacion"
            value={editOrder.operacion}
            onChange={(e) => handleChange(e)}
          >
            <option value="">Tipo</option>
            {editOrder.tiposervicio === "cuenta" ||
              editOrder.tiposervicio === "capacidad" ? null : (
              <option value="activation">Activación</option>
            )}
            {editOrder.tiposervicio === "soporte" ||
              editOrder.tiposervicio === "cuenta" ? null : (
              <option value="renew">Renovación</option>
            )}
            {editOrder.tiposervicio === "dominio" ? (
              <option value="transfer">Transferencia</option>
            ) : null}
            {editOrder.tiposervicio === "cuenta" ? (
              <option value="addfunds">Añadir Fondos</option>
            ) : null}
            {editOrder.tiposervicio === "correo" ? (
              <option value="migration">Migración</option>
            ) : null}
            {editOrder.tiposervicio !== "cuenta" ||
              editOrder.tiposervicio !== "dominio" ||
              editOrder.tiposervicio !== "soporte" ? (
              <option value="upgrade">Ampliación</option>
            ) : null}
          </select>
        </div>

        <div className="form_container_label_input">
          <strong>
            <label className="form_config_label">Capacidad:</label>
          </strong>
          <select
            className="form_config_input"
            name="capacidad"
            value={editOrder.capacidad}
            onChange={(e) => handleChange(e)}
          >
            {(editOrder.tiposervicio === "hosting" ||
              editOrder.tiposervicio === "weebly") &&
              editOrder.operacion === "activation" ? (
              <>
                <option
                  value="500MB"
                  disabled={editOrder.capacidad === "500MB"}
                >
                  500 MB
                </option>
                <option value="1GB" disabled={editOrder.capacidad === "1GB"}>
                  1 GB
                </option>
                <option value="5GB" disabled={editOrder.capacidad === "5GB"}>
                  5 GB
                </option>
              </>
            ) : null}
            {(editOrder.tiposervicio === "hosting" ||
              editOrder.tiposervicio === "weebly") &&
              editOrder.operacion === "upgrade" ? (
              <>
                <option
                  value="1000MB"
                  disabled={editOrder.capacidad === "1000MB"}
                >
                  1 GB
                </option>
                <option
                  value="5000MB"
                  disabled={editOrder.capacidad === "5000MB"}
                >
                  5 GB
                </option>
                <option
                  value="10000MB"
                  disabled={editOrder.capacidad === "10000MB"}
                >
                  10 GB
                </option>
                <option
                  value="15000MB"
                  disabled={editOrder.capacidad === "15000MB"}
                >
                  15 GB
                </option>
              </>
            ) : null}
            {editOrder.tiposervicio === "miconstructor" &&
              editOrder.operacion === "activation" ? (
              <>
                <option
                  value="100MB"
                  disabled={editOrder.capacidad === "100MB"}
                >
                  100 MB
                </option>
                <option value="1GB" disabled={editOrder.capacidad === "1GB"}>
                  1 GB
                </option>
                <option value="5GB" disabled={editOrder.capacidad === "5GB"}>
                  5 GB
                </option>
              </>
            ) : null}
            {editOrder.tiposervicio === "miconstructor" &&
              editOrder.operacion === "upgrade" ? (
              <>
                <option
                  value="100MB"
                  disabled={editOrder.capacidad === "100MB"}
                >
                  100 MB
                </option>
                <option value="1GB" disabled={editOrder.capacidad === "1GB"}>
                  1 GB
                </option>
                <option value="5GB" disabled={editOrder.capacidad === "5GB"}>
                  5 GB
                </option>
              </>
            ) : null}
            {editOrder.tiposervicio === "capacidad" ? (
              <option value="25GB">25 GB</option>
            ) : null}
          </select>
        </div>

        <div className="form_container_label_input">
          <strong>
            <label className="form_config_label" htmlFor="amount">
              Cantidad:
            </label>
          </strong>
          <input
            className="form_config_input"
            id="amount"
            name="cantidad"
            title="Este campo solo se habilita si el tipo de servicio es Correo, Dominio o Hosting."
            onChange={(e) => {
              handleChange(e);
            }}
            value={editOrder.cantidad}
            disabled={
              editOrder.tiposervicio === "capacidad" ||
              editOrder.tiposervicio === "cuenta" ||
              editOrder.tiposervicio === "soporte" ||
              editOrder.tiposervicio === "weebly" ||
              editOrder.tiposervicio === "miconstructor"
            }
          />
        </div>

        <div className="form_container_label_input">
          <strong>
            <label className="form_config_label">Estado:</label>
          </strong>
          <select
            className="form_config_input"
            name="estado"
            value={editOrder.estado}
            onChange={(e) => handleChange(e)}
          >
            <option value="">Tipo</option>
            <option value="completed">Completado</option>
            <option value="create">Creado</option>
            <option value="canceled">Cancelado</option>
            <option value="devuelto">Devuelto</option>
            <option value="pending execution">Pendiente</option>
            <option value="rejected">Rechazado</option>
            <option value="return">Retomado</option>
          </select>
        </div>

        {superuser === "SUPERUSER" || desarrollo === "DESARROLLO" ? null : (
          <div className="form_container_label_input">
            <strong>
              <label className="form_config_label" htmlFor="extra1">
                Extra 1:
              </label>
            </strong>
            <input
              className="form_config_input"
              id="extra1"
              name="extra1"
              title="Solo puedes ingresar valores númericos"
              value={editOrder.extra1}
              onChange={(e) => handleChange(e)}
            />
          </div>
        )}

        <div className="form_container_label_input">
          <strong>
            <label className="form_config_label" htmlFor="totalPay">
              Total Pagado:
            </label>
          </strong>
          <input
            className="form_config_input"
            id="totalPay"
            name="valor"
            title="Solo puedes ingresar valores númericos"
            value={editOrder.valor}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <input className="form_btn" type="submit" value="Confirmar" />
      </form>
    </>
  );
};