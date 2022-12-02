import React, { useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/es";
import { Link } from "react-router-dom";

import Modal from "../Principal/Modal/Modal";
import { ModificationModal } from "./ModificationModal";

import "../../Styles/Colors.css";
import "../../Styles/Orders/TableOrders.css";

export const TableOrders = () => {
  const orderInfo = useSelector((state) => state.orderInfo.data);

  const [modificationModal, setModificationModal] = useState(false);
  const [sendObject, setSendObject] = useState({});

  const openModal = (item) => {
    setSendObject(item);
    setModificationModal(!modificationModal);
  };

  const authData = JSON.parse(sessionStorage.getItem("PIUSER"));

  const superuser = authData.data.roles.split(",")[0];
  const admin = authData.data.roles;

  return (
    <>
      <div className="table__containter_orders">
        <div className="first_row-th">
          {(superuser === "SUPERUSER" || admin === "ADMINISTRATIVO") && (
            <div className="th_row " style={{ width: "85px" }}>
              Acción
            </div>
          )}
          <div className="th_row  " style={{ width: "100px" }}>
            Estado
          </div>
          <div className="th_row  " style={{ width: "90px" }}>
            ID.
          </div>
          <div className="th_row  " style={{ width: "100px" }}>
            ID. Compra
          </div>
          <div className="th_row " style={{ width: "20%" }}>
            Dominio
          </div>
          <div className="th_row  " style={{ width: "126px" }}>
            Operación
          </div>
          <div className="th_row  " style={{ width: "126px" }}>
            Tipo de Servicio
          </div>
          <div className="th_row  " style={{ width: "90px" }}>
            Capacidad
          </div>
          <div className="th_row  " style={{ width: "70px" }}>
            Cant.
          </div>
          <div className="th_row  " style={{ width: "126px" }}>
            Fecha Activación
          </div>
          <div className="th_row  " style={{ width: "110px" }}>
            Extra 1
          </div>
          <div className="th_row  " style={{ width: "60px" }}>
            Pago
          </div>
          <div className="th_row  " style={{ width: "70px" }}>
            Valor
          </div>
          <div className="th_row  " style={{ width: "100px" }}>
            ID. Cliente
          </div>
          {
            <div
              className="th_row "
              style={
                superuser === "SUPERUSER" || admin === "ADMINISTRATIVO"
                  ? { width: "155px" }
                  : { width: "240px" }
              }
            >
              Ref. Pago
            </div>
          }
        </div>

        {orderInfo &&
          orderInfo.length > 0 &&
          orderInfo.map((item, index) => {
            const status = item.estado;

            return (
              <div className="table_rows_content" key={index}>
                {(superuser === "SUPERUSER" || admin === "ADMINISTRATIVO") && (
                  <div className="table_td" style={{ width: "85px" }}>
                    <button
                      className="Modification__btn"
                      onClick={() => openModal(item)}
                    >
                      Modificar
                    </button>
                  </div>
                )}

                <div
                  className={`table_td ${
                    status === "completed"
                      ? "completado"
                      : item.estado === "canceled"
                      ? "cancelado"
                      : item.estado === "pending execution"
                      ? "pendiente"
                      : item.estado === "return"
                      ? "retomado"
                      : item.estado === "rejected"
                      ? "rechazado"
                      : item.estado === "create"
                      ? "creado"
                      : item.estado === "devuelto"
                      ? "devuelto"
                      : null
                  }_color_status`}
                  style={{ width: "100px" }}
                >
                  <b>
                    {item
                      ? item.estado === "completed"
                        ? "Completado"
                        : item.estado === "canceled"
                        ? "Cancelado"
                        : item.estado === "pending execution"
                        ? "Pendiente"
                        : item.estado === "return"
                        ? "Retomado"
                        : item.estado === "rejected"
                        ? "Rechazado"
                        : item.estado === "create"
                        ? "Creado"
                        : item.estado === "devuelto"
                        ? "Devuelto"
                        : null
                      : null}
                  </b>
                </div>
                <div className="table_td" style={{ width: "90px" }}>
                  {item ? item.id : null}
                </div>
                <div className="table_td" style={{ width: "100px" }}>
                  {item ? item.idcompra : null}
                </div>
                <div
                  className="table_td dif"
                  style={{ width: "20%" }}
                  title={item ? item.dominio : null}
                >
                  <Link to={`/DomainSGI?search=${item.dominio}`}>
                    {item
                      ? item.dominio.length > 40
                        ? item.dominio.substring(0, 40) + "..."
                        : item.dominio
                      : null}
                  </Link>
                </div>
                <div className="table_td" style={{ width: "126px" }}>
                  {item ? item.operacion : null}
                </div>
                <div className="table_td" style={{ width: "126px" }}>
                  {item ? item.tiposervicio : null}
                </div>
                <div className="table_td" style={{ width: "90px" }}>
                  {item ? item.capacidad : null}
                </div>
                <div className="table_td" style={{ width: "70px" }}>
                  {item ? item.cantidad : null}
                </div>
                <div className="table_td" style={{ width: "126px" }}>
                  {moment(item ? item.fechaActivacion : null)
                    .add(-5, "hours")
                    .locale("es")
                    .format("LLL")}
                </div>
                <div
                  className="table_td"
                  style={{ width: "110px" }}
                  title={item ? item.extra1 : null}
                >
                  {item
                    ? item.extra1.length > 15
                      ? item.extra1.substring(0, 10) + "..."
                      : item.extra1
                    : null}
                </div>
                <div className="table_td" style={{ width: "60px" }}>
                  {item ? item.pago : null}
                </div>
                <div className="table_td" style={{ width: "70px" }}>
                  {item ? item.valor : null}
                </div>
                <div className="table_td" style={{ width: "100px" }}>
                  <Link to={`/Customers?search=${item.idlogic}`}>
                    {item ? item.idlogic : null}
                  </Link>
                </div>
                <div
                  className="table_td"
                  style={
                    superuser === "SUPERUSER" || admin === "ADMINISTRATIVO"
                      ? { width: "155px" }
                      : { width: "240px" }
                  }
                >
                  {item ? item.ref_mp : null}
                </div>
              </div>
            );
          })}

        <Modal
          status={modificationModal}
          changeStatus={setModificationModal}
          modalTitle="Cambio de Datos a Servicio"
        >
          <ModificationModal
            changeStatus={setModificationModal}
            item={sendObject}
          />
        </Modal>
      </div>

      <br />
    </>
  );
};
