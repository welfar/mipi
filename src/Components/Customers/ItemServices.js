import React from "react";
import moment from "moment";
import "moment/locale/es";

import { BsCircleFill } from "react-icons/bs";

import "../../Styles/Customers/ItemServices.css";

export const ItemServices = ({ item }) => {
  return (
    <>
      <div className="itemServicesContainer">
        <div className="itemServicesContainer__header">
          <div className="itemServicesContainer__header--left">
            <p>{item.domainName}</p>
            <div className="iconStatus">
              <BsCircleFill />
            </div>
          </div>
          <p className="idDomain"> {item.server} </p>
        </div>

        <div className="itemServicesContainer__content">
          <div className="nameDomain">{item.nameService}</div>
          <p className="dueDate">
          <strong> Fecha de Vencimiento : </strong>{" "}
          {moment(item.expirationDate).locale("es").format("LL")}
          </p>
        </div>
      </div>
    </>
  );
};
