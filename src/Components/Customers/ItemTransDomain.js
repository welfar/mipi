import React from "react";

import { BsCircleFill } from "react-icons/bs";

import "../../Styles/Customers/ItemTransDomain.css";

export const ItemTransDomain = ({ domain, status, idService, dueDate }) => {
  return (
    <>
      <div className="itemTransDomContainer">
        <div className="itemTransDomContainer__header">
          <div className="itemTransDomContainer__header--left">
            <p>107601561</p>
          </div>

          <p className="amount"> $ 75.000</p>
        </div>

        <p className="description">
          Renewal of epyca.co for 1 year invoice Renewal of epyca.co for 1 year
          invoice Renewal of epyca.co for 1 year invoice Renewal of epyca.co for
          1 year invoice Renewal of epyca.co for 1 year invoice Renewal of
          epyca.co for 1 year invoice
        </p>

        <div className="itemTransDomContainer__footer">
          <div className="transationType">Invoice</div>
          <div className="transationDate">
            <p>
              <strong> Fecha de Transacción : </strong> 21 de Mayo de 2014
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
