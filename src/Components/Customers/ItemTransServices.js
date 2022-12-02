import React from "react";

import "../../Styles/Customers/ItemTransServices.css";

export const ItemTransServices = ({
  idTransaction,
  amount,
  typeTransaction,
  transactionDate,
}) => {
  return (
    <>
      <div className="itemTransServContainer">
        <div className="itemTransServContainer__header">
          <p className="idTransaction"> 15961 </p>
          <p className="amountTransaction"> $ 75.000 </p>
        </div>

        <div className="itemTransServContainer__footer">
          <p className="transationType"> Invoice Payment </p>
          <p className="transationDate">
            <strong> Fecha de Transacción: </strong> 21 de Mayo de 2014
          </p>
        </div>
      </div>
    </>
  );
};
