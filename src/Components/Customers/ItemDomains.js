import React from "react";
import moment from "moment";
import "moment/locale/es";

import { BsCircleFill } from "react-icons/bs";

import "../../Styles/Customers/ItemDomains.css";

export const ItemDomains = ({ item }) => {
  return (
    <>
      <div className="itemDomContainer">
        <div className="itemDomContainer__header">
          <div className="itemDomContainer__header--left">
            <p title={item.DomainName}>
              {item.DomainName.length > 25
                ? item.DomainName.substring(0, 25) + "..."
                : item.DomainName}
            </p>
            <div
              title={
                item.Status === "Active" || item.Status === "Registered"
                  ? "Activo"
                  : item.Status === "Pending Delete" ||
                    item.Status === "Pending_delete"
                  ? "Pendiente de Eliminación"
                  : item.Status === "Suspended"
                  ? "Suspendido"
                  : item.Status === "Expired"
                  ? "Expirado"
                  : null
              }
              className={
                item.Status === "Active" || item.Status === "Registered"
                  ? "iconStatus-active"
                  : item.Status === "Pending Delete" ||
                    item.Status === "Pending_delete"
                  ? "iconStatus-pending_delete"
                  : item.Status === "Suspended"
                  ? "iconStatus-suspended"
                  : item.Status === "Expired"
                  ? "iconStatus-expired"
                  : null
              }
            >
              {item.Status === "Create" ? null : item.Status ===
                "Canceled" ? null : item.Status === "Transfered" ? null : (
                <BsCircleFill />
              )}
            </div>
          </div>
          <p className="idDomain">{item.AdminBD}</p>
        </div>

        <p className="dueDate">
          <strong> Fecha de Vencimiento : </strong>{" "}
          {moment(item.ExpirationDate).locale("es").format("LL")}
        </p>
      </div>
    </>
  );
};
